"use client"; // if using Next.js 13 App Router

import { useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

export default function Home() {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        // connect to Solana Devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        // Example Phantom devnet wallet (replace with your own)
        const pubkey = new PublicKey("YourPhantomWalletAddressHere");

        // fetch balance
        const lamports = await connection.getBalance(pubkey);
        setBalance(lamports / 1e9); // convert lamports → SOL
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    };

    fetchBalance();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Solana Balance Checker</h1>
      {balance !== null ? (
        <p>Balance: {balance} SOL</p>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
