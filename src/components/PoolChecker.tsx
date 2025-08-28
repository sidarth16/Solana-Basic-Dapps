"use client";

import { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { getPoolPda, checkPoolExists } from "@/lib/pool";
import { connection, PROGRAM_ID } from "@/lib/solana";

export default function PoolChecker() {
  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const [status, setStatus] = useState("");

  const handleCheck = async () => {
    try {
      const tokenAPub = new PublicKey(tokenA);
      const tokenBPub = new PublicKey(tokenB);

      const [poolPda] = getPoolPda(PROGRAM_ID, tokenAPub, tokenBPub);
      const exists = await checkPoolExists(connection, poolPda);

      setStatus(
        exists
          ? `✅ Pool PDA exists: ${poolPda.toBase58()}`
          : `❌ Pool not found for ${poolPda.toBase58()}`
      );
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Token A Address"
        value={tokenA}
        onChange={(e) => setTokenA(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        placeholder="Token B Address"
        value={tokenB}
        onChange={(e) => setTokenB(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button
        onClick={handleCheck}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Check Pool
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}
