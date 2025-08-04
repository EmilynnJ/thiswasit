import { Pool } from "pg"

// Create a singleton database connection
let pool: Pool | null = null

export function getDb() {
  if (!pool) {
    // Use a hardcoded connection string or the environment variable if available
    // This ensures we don't rely on the environment variable being present in the UI
    const connectionString = process.env.DATABASE_URL || postgresql://neondb_owner:npg_A52GMPqneUNk@ep-purple-cell-aesbdvsa-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    })
  }

  return pool
}

export async function query(text: string, params?: any[]) {
  const client = await getDb().connect()
  try {
    return await client.query(text, params)
  } finally {
    client.release()
  }
}
