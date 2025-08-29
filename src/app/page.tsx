"use client";

import { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

import TokenInputs from "@/components/TokenInputs";
import PoolStatus from "@/components/PoolStatus";
import PoolInfoForm from "@/components/PoolInfoForm";
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
      <h1 className="text-3xl font-bold">🚀 MiniSwap</h1>
      
      {/* Token inputs */}
      <TokenInputs tokenA={tokenA} setTokenA={setTokenA} tokenB={tokenB} setTokenB={setTokenB} userTokenBalance={userTokenBalance} />
      
      {/* Status */}
      <PoolStatus poolStatus={poolStatus} />
      
      {/* Init Pool */}
      {poolStatus==0 && 
        <div className="flex flex-col sm:flex-row gap-4 mt-20 w-full max-w-xl">
      
          <button 
            onClick={() => {}}
            disabled={!connected}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500/80 via-purple-500/80 to-blue-500/80 
           hover:from-yellow-400 hover:via-pink-400 hover:to-purple-500
           text-black font-bold rounded-2xl shadow-2xl transition-all border border-yellow"
          >
            Create Pool
          </button>
        </div>
      }

      <div className="mt-6 w-full max-w-md">
        <PoolInfoForm poolStatus={poolStatus} tokenA={tokenA} tokenB={tokenB} />
      </div>

    </div>
  );
}
