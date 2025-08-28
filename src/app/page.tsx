"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";

export default function Home() {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) return;
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const lamports = await connection.getBalance(publicKey);
      setBalance(lamports / 1e9);
    };
    fetchBalance();
  }, [publicKey]);

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">🚀 Solana Starter Pack</h1>

      <WalletMultiButton />

      {publicKey && (
        <p>
          Address: <span className="font-mono">{publicKey.toBase58()}</span>
        </p>
      )}

      {balance !== null && <p>Balance: {balance} SOL</p>}
    </main>
  );
}
