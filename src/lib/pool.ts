import { Connection, PublicKey } from "@solana/web3.js";

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

export async function checkPoolExists(
  connection: Connection,
  poolPda: PublicKey
): Promise<boolean> {
  const accountInfo = await connection.getAccountInfo(poolPda);
  return accountInfo !== null && accountInfo.lamports > 0;
}
