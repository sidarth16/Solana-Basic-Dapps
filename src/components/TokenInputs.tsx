"use client";

type Props = {
  tokenA: string;
  setTokenA: (v: string) => void;
  tokenB: string;
  setTokenB: (v: string) => void;
};

export default function TokenInputs({ tokenA, setTokenA, tokenB, setTokenB }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-3xl">
      
      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium mb-1 text-yellow-200 text-center">Token A</label>    
        <input
          type="text"
          placeholder="Address Token A"
          value={tokenA}
          onChange={(e) => setTokenA(e.target.value)}
          className="w-full p-3 rounded-3xl bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      
      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium mb-1 text-yellow-200 text-center">Token B</label>
        <input
          type="text"
          placeholder="Address Token B"
          value={tokenB}
          onChange={(e) => setTokenB(e.target.value)}
          className="w-full p-3 rounded-3xl bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-yellow-400"
        />
      </div>
    
    </div>
  );
}
