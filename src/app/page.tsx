"use client";

import { useState } from "react";
import TokenInputs from "@/components/TokenInputs";
import PoolStatus from "@/components/PoolStatus";
import PoolInfoForm from "@/components/PoolInfoForm";
import { usePoolStatus } from "@/hooks/usePoolStatus";

export default function HomePage() {
  const [tokenA, setTokenA] = useState("H68y5nKjyc8ESB6dn7syQ1FWn1axU7DYDB5VE9MTAU2c");
  const [tokenB, setTokenB] = useState("6v1CkZ2w3uybFfkGf5pNE7SWV2QDL6ok5Z8U6Tpa311o");
  
  const poolStatus = usePoolStatus(tokenA, tokenB);


  return (
    <div className="flex flex-col items-center gap-6 min-h-[70vh] p-7">
    {/* <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"></div> */}
      <h1 className="text-3xl font-bold">🚀 MiniSwap</h1>
      <TokenInputs tokenA={tokenA} setTokenA={setTokenA} tokenB={tokenB} setTokenB={setTokenB} />
      <PoolStatus poolStatus={poolStatus} />
      <PoolInfoForm poolStatus={poolStatus} tokenA={tokenA} tokenB={tokenB} />
    </div>
  );
}
