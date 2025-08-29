"use client";

import { useEffect, useState } from "react";
import { getPoolReservesAndSupply } from "@/lib/pool";
import { estimateSwappedTokenOut } from "@/lib/estimate";

type PoolStatusType = -1 | 0 | 1 | null;

/* ----------------------------------------------
   Swap Liquidity Form Component (with labels)
------------------------------------------------ */
export default function SwapForm(
  {handleAction,  poolStatus,  tokenA,  tokenB,  walletConnected,}: 
  {
  handleAction: (action: 'add') => void;
  poolStatus: PoolStatusType;
  tokenA: string;  tokenB: string;
  walletConnected: boolean;
  }) {
    const [amountSwapIn, setAmountSwapIn] = useState('');
    const [tokenSwapIn, setTokenSwapIn] = useState(tokenA);
    const [amountMinSwapOut, setAmountMinSwapOut] = useState('');

    const [estimatedTokensOut, setEstimatedTokensOut] = useState< bigint | null>(null);
    const [reserves, setReserves] = useState<{
        vaultA: bigint;  vaultB: bigint;  supplyLP: bigint;
        tokenADecimals: number; tokenBDecimals: number;
    } | null>(null);

    useEffect(() => {
        (async () => {
            try{
                if (poolStatus === 1) {
                    const r = await getPoolReservesAndSupply(tokenA, tokenB);
                    setReserves(r);
                }
            } catch (e) {
                console.error("Failed to fetch reserves:", e);
            }
        })();
    }, [tokenA, tokenB, poolStatus]);

    // Estimate Swap Tokens Out
    useEffect(() => {
      if (!reserves || !amountSwapIn) {
        setEstimatedTokensOut(null);
        return;
      }
      try {
        if (tokenSwapIn === tokenA){
            const estAmtOut = estimateSwappedTokenOut(
              reserves.vaultA, reserves.vaultB, BigInt(amountSwapIn)
            );
            if (estAmtOut > 0){
              setEstimatedTokensOut(estAmtOut);
            }
        }
        if (tokenSwapIn === tokenB){
            const estAmtOut = estimateSwappedTokenOut(
              reserves.vaultB,
              reserves.vaultA,
              BigInt(amountSwapIn)
            );
            if (estAmtOut > 0){
              setEstimatedTokensOut(estAmtOut);
            }
        }
      } catch (err) {
        console.error("Failed to estimate LP:", err);
        setEstimatedTokensOut(null);
      }
    }, [amountSwapIn, reserves, tokenSwapIn]);


  // Validate that input is a positive number
  const isValidAmount = (val: string) => !isNaN(Number(val)) && Number(val) > 0;
  const canSubmit =
    isValidAmount(amountSwapIn) && isValidAmount(amountMinSwapOut) &&
    poolStatus === 1 && estimatedTokensOut;


  return (
    <div className="mt-2 p-6 rounded-2xl bg-black/10 backdrop-blur-md border border-white/20 shadow-2xl space-y-4">
      <h2 className="text-2xl font-bold text-yellow-400 drop-shadow-xl">Swap Tokens</h2>

      {/* Amount In */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1 text-yellow-100">Amount In <strong>({tokenSwapIn === tokenA ? 'Token A' : 'Token B'})</strong></label>
        <input
          type="number"
          placeholder="e.g. 100"
          className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 w-full"
          value={amountSwapIn}
          onChange={(e) => setAmountSwapIn(e.target.value)}
        />
      </div>

      {/* Swap Direction */}
      <p className="text-center -mt-3 mb-3 text-lg ">↓</p>

      {/* Estimated Output */}
      <div className="flex flex-col">
        <label className="text-sm font-medium -mt-3 mb-1 text-yellow-100">Amount Out <strong>({tokenSwapIn === tokenA ? 'Token B' : 'Token A'})</strong></label>
        <input 
          type="number"
          placeholder="e.g. 100"
          className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 w-full disabled:opacity-70"
          value={estimatedTokensOut?.toString() || ''}
          disabled
        />
      </div>
      
      {/* Min Amount Out */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1 text-yellow-100">Min Amount Out</label>
        <input
          type="number"
          placeholder="e.g. 95"
          className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 w-full"
          value={amountMinSwapOut}
          onChange={(e) => setAmountMinSwapOut(e.target.value)}
        />
      </div>

      {/* Button */}
      <div className="flex flex-row gap-2">
        <button
          onClick={() => {}}
          className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-green-600 to-teal-500 hover:scale-105 transition text-white shadow-lg disabled:opacity-65"
          disabled={!canSubmit || !walletConnected}
        >
          Swap
        </button>

        <button
          onClick={() => setTokenSwapIn(tokenSwapIn === tokenA ? tokenB : tokenA)}
          className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 hover:scale-105 transition text-white shadow-lg disabled:opacity-50"
          // disabled={disabled}
        >
          Toggle Tokens
        </button>
      </div>
    </div>
  );
}