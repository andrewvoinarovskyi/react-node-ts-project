import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set in .env");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
