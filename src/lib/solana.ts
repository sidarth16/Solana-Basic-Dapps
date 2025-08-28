// keeps constants in one place

import { Connection, PublicKey } from "@solana/web3.js";

export const connection = new Connection("https://api.devnet.solana.com");

// Replace with your program ID
export const PROGRAM_ID = new PublicKey(
  "FkFy7DjX1fJe4fUqxkeUnGtkd4rL46769HE3iSwVjoYJ"
);
