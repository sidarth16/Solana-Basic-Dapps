import { useState, useEffect } from "react";
import { getTokenBalance } from "@/lib/solana";
import type{PublicKey } from "@solana/web3.js";


export function useUserTokenBalance(tokenA: string, tokenB: string, walletPubkey: PublicKey|null) {
  const [userTokenBalance, setUserTokenBalance] = useState<{
     balanceTokenA: bigint;  balanceTokenB: bigint;
  } | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (!tokenA || !tokenB || !walletPubkey) {
          setUserTokenBalance(null);
          return;
        }

        const userTokenBalance = await getTokenBalance(tokenA, tokenB, walletPubkey);
        if (userTokenBalance) {
          setUserTokenBalance(userTokenBalance);
          return;
        }
      } catch (err) {
        console.error("Retrive userbalance error:", err);
        setUserTokenBalance(null);
      }
    };

    fetchBalance();
  }, [tokenA, tokenB, walletPubkey]);

  return userTokenBalance;
}
