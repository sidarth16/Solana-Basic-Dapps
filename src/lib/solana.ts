// keeps constants in one place

import { Connection, PublicKey } from "@solana/web3.js";
// import { getMint } from "@solana/spl-token";
import { getAssociatedTokenAddress } from "@solana/spl-token";

export const connection = new Connection("https://api.devnet.solana.com");

// Replace with your program ID
export const PROGRAM_ID = new PublicKey(
  "FkFy7DjX1fJe4fUqxkeUnGtkd4rL46769HE3iSwVjoYJ"
);

export async function isValidSolanaTokenAddress(addr: string): Promise<boolean> {
  try {
    const pubkey = new PublicKey(addr); // throws if invalid
    // await getMint(connection, pubkey);  // throws if not a mint
    return true;
  } catch {
    return false;
  }
}


export async function getTokenBalance(tokenA: string, tokenB: string, walletPubkey: PublicKey ) {
  try {
    // console.log("fetching balances", walletPubkey);
    // if (!walletPubkey) return null;
    const tokenAPub = new PublicKey(tokenA);
    const tokenBPub = new PublicKey(tokenB);

    const ataA = await getAssociatedTokenAddress(tokenAPub, walletPubkey);
    const ataB = await getAssociatedTokenAddress(tokenBPub, walletPubkey);

    const balanceTokenA = BigInt((await connection.getTokenAccountBalance(ataA)).value.amount);
    const balanceTokenB = BigInt((await connection.getTokenAccountBalance(ataB)).value.amount);

    // console.log("fetching balances : ", balanceTokenA);

    
    return { balanceTokenA, balanceTokenB};
  } catch (err) {
    // console.error("Fetch Token Balances error:", err);
    return null;
  }
}