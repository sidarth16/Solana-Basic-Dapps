"use client";

import { useEffect, useState } from "react";
// import { getPoolReservesAndSupply } from "@/lib/pool";

type PoolStatusType = -1 | 0 | 1 | null;

export default function PoolInfoForm({
  poolStatus,
  tokenA,
  tokenB,
}: {
  poolStatus: PoolStatusType;
  tokenA: string;
  tokenB: string;
}) {
  const [reserves, setReserves] = useState<{
    vaultA: bigint;
    vaultB: bigint;
    supplyLP: bigint;
    tokenADecimals: number;
    tokenBDecimals: number;
  } | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     if (poolStatus === 1) {
  //       const r = await getPoolReservesAndSupply(tokenA, tokenB);
  //       setReserves(r);
  //     }
  //   })();
  // }, [tokenA, tokenB, poolStatus]);

  if (poolStatus !== 1 || !reserves) return null;

  return (
    <div className="mt-4 p-6 rounded-3xl bg-black/25 backdrop-blur-lg border border-white/20 shadow-2xl space-y-6">
      <h2 className="text-2xl font-extrabold text-yellow-400 drop-shadow-lg">Pool Info</h2>
      <div className="flex flex-col gap-3">
        <InfoRow label="Vault A" value={`${reserves.vaultA} Tokens`} />
        <InfoRow label="Vault B" value={`${reserves.vaultB} Tokens`} />
        <InfoRow label="LP Supply" value={`${reserves.supplyLP} Tokens`} />
        <InfoRow
          label="Decimals"
          value={
            <>
              TokenA : 10<sup>{reserves.tokenADecimals}</sup> <br />
              TokenB : 10<sup>{reserves.tokenBDecimals}</sup>
            </>
          }
        />
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
      <span className="text-gray-300 font-medium uppercase tracking-wide">{label}</span>
      <span className="text-white font-semibold truncate">{value}</span>
    </div>
  );
}
