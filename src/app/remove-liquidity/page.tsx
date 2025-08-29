"use client";

import { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

import TokenInputs from "@/components/TokenInputs";
import PoolStatus from "@/components/PoolStatus";
import RemoveLiquidityForm from "@/components/RemoveLiquidityForm";
import { usePoolStatus } from "@/hooks/usePoolStatus";
import { useUserTokenBalance } from "@/hooks/useUserTokenBalance";

export default function HomePage() {
  const wallet = useAnchorWallet();
  const connected = !!wallet?.publicKey;

  const [tokenA, setTokenA] = useState("H68y5nKjyc8ESB6dn7syQ1FWn1axU7DYDB5VE9MTAU2c");
  const [tokenB, setTokenB] = useState("6v1CkZ2w3uybFfkGf5pNE7SWV2QDL6ok5Z8U6Tpa311o");

  //hooks
  const poolStatus = usePoolStatus(tokenA, tokenB);
  const userTokenBalance = useUserTokenBalance(tokenA, tokenB, wallet?.publicKey ?? null)

  return (
    <div className="flex flex-col items-center  min-h-[70vh] p-7">
      <h1 className="text-3xl font-bold">⚡️ MiniSwap</h1>
      
      {/* Token inputs */}
      <TokenInputs tokenA={tokenA} setTokenA={setTokenA} tokenB={tokenB} setTokenB={setTokenB} userTokenBalance={userTokenBalance} />

      {/* Status */}
      <PoolStatus poolStatus={poolStatus} />

      {/* Wallet not connected notice */}
      {!connected && (
        <p className="text-orange-400 mt-2">⚠️ Please connect your wallet to perform actions</p>
      )} 
      
      <div className="mt-6 w-full max-w-md">
        <RemoveLiquidityForm 
          poolStatus={poolStatus}
          tokenA={tokenA}
          tokenB={tokenB}
          walletConnected={connected}
        />
      </div>
    </div>
  );
}