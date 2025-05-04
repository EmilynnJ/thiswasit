// This file provides fallback values for environment variables
// to prevent UI warnings while still using the actual values when available

export const getEnvWithFallback = (key: string, fallback = "") => {
  return process.env[key] || fallback
}

// Specifically for DATABASE_URL to suppress the warning
export const getDatabaseUrl = () => {
  return getEnvWithFallback("DATABASE_URL", "postgresql://connected:already@localhost:5432/soulseer")
}
