import { useState, useEffect } from "react";
import { checkPoolExistsOnDevnet } from "@/lib/pool";
// import { isValidSolanaTokenAddress } from "@/lib/solana";


// Status meaning:
// -1 → invalid token address
// 0  → valid but pool does not exist
// 1  → pool exists
// null → not checked yet
export function usePoolStatus(tokenA: string, tokenB: string) {
  const [poolStatus, setPoolStatus] = useState<-1 | 0 | 1 | null>(null);

  useEffect(() => {
    const runCheck = async () => {
      try {
        if (!tokenA || !tokenB) {
          setPoolStatus(null);
          return;
        }

        // const validA = await isValidSolanaTokenAddress(tokenA);
        // const validB = await isValidSolanaTokenAddress(tokenB);
        // if (!validA || !validB) {
        //   setPoolStatus(-1);
        //   return;
        // }

        const exists = await checkPoolExistsOnDevnet(tokenA, tokenB);
        setPoolStatus(exists ? 1 : 0);
      } catch (err) {
        console.error("Pool check error:", err);
        setPoolStatus(0);
      }
    };

    runCheck();
  }, [tokenA, tokenB]);

  return poolStatus;
}
