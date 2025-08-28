import { PublicKey } from "@solana/web3.js";
import { connection, PROGRAM_ID } from "./solana";
// import { Program, AnchorProvider } from "@coral-xyz/anchor";

const programId = new PublicKey(PROGRAM_ID);

export function getPoolPda(
  programId: PublicKey,
  tokenA: PublicKey,
  tokenB: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("pool"), tokenA.toBuffer(), tokenB.toBuffer()],
    programId
  );
}

export async function checkPoolExistsOnDevnet(
  tokenA: string,
  tokenB: string
): Promise<boolean> {
  const tokenAPub = new PublicKey(tokenA);
  const tokenBPub = new PublicKey(tokenB);
  const [poolPda] = getPoolPda(programId, tokenAPub, tokenBPub);
  const accountInfo = await connection.getAccountInfo(poolPda);
  return accountInfo !== null && accountInfo.lamports > 0;
}


// export async function getPoolReservesAndSupply(tokenA: string, tokenB: string) {
//   try {
//     const tokenAPub = new PublicKey(tokenA);
//     const tokenBPub = new PublicKey(tokenB);
//     const programId = new PublicKey(PROGRAM_ID);

//     const [poolPDA] = PublicKey.findProgramAddressSync(
//       [Buffer.from("pool"), tokenAPub.toBuffer(), tokenBPub.toBuffer()],
//       programId
//     );

//     const idl = await Program.fetchIdl(programId, { connection });
//     if (!idl) throw new Error("Failed to fetch IDL");

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const provider = new AnchorProvider(connection, {} as any, AnchorProvider.defaultOptions());
//     const program = new Program(idl, provider);

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const pool = await (program.account as any).pool.fetch(poolPDA);

//     const tokenADecimals = pool.tokenADecimals;
//     const tokenBDecimals = pool.tokenBDecimals;

//     const vaultA = BigInt((await connection.getTokenAccountBalance(pool.tokenAVault)).value.amount);
//     const vaultB = BigInt((await connection.getTokenAccountBalance(pool.tokenBVault)).value.amount);
//     const supplyLP = BigInt((await connection.getTokenSupply(pool.lpMint)).value.amount);

//     return { vaultA, vaultB, supplyLP, tokenADecimals, tokenBDecimals };
//   } catch (err) {
//     console.error("Fetch Reserves error:", err);
//     return null;
//   }
// }
