// keeps constants in one place

import { Connection, PublicKey } from "@solana/web3.js";
// import { getMint } from "@solana/spl-token";

export const connection = new Connection("https://api.devnet.solana.com");

// Replace with your program ID
export const PROGRAM_ID = new PublicKey(
  "FkFy7DjX1fJe4fUqxkeUnGtkd4rL46769HE3iSwVjoYJ"
);

// export async function isValidSolanaTokenAddress(addr: string): Promise<boolean> {
//   try {
//     const pubkey = new PublicKey(addr); // throws if invalid
//     await getMint(connection, pubkey);  // throws if not a mint
//     return true;
//   } catch {
//     return false;
//   }
// }