import { executeQuery } from "../db"

export interface WalletBalance {
  id: number
  user_id: number
  balance: number
  updated_at: Date
}

export interface Transaction {
  id: number
  user_id: number
  session_id?: number
  amount: number
  payment_type: "deposit" | "withdrawal" | "session_payment" | "refund"
  status: "pending" | "completed" | "failed"
  transaction_id?: string
  created_at: Date
}

export async function getWalletBalance(userId: number): Promise<number> {
  try {
    const result = await executeQuery("SELECT balance FROM wallet_balances WHERE user_id = $1", [userId])

    if (result.length === 0) {
      // Create a new wallet with zero balance if it doesn't exist
      await executeQuery("INSERT INTO wallet_balances (user_id, balance) VALUES ($1, 0)", [userId])
      return 0
    }

    return result[0].balance
  } catch (error) {
    console.error("Error getting wallet balance:", error)
    return 0
  }
}

export async function addFunds(
  userId: number,
  amount: number,
  transactionId: string,
): Promise<{ success: boolean; newBalance?: number; error?: string }> {
  try {
    if (amount <= 0) {
      return { success: false, error: "Amount must be greater than zero" }
    }

    // Start a transaction
    await executeQuery("BEGIN")

    // Add payment record
    await executeQuery(
      `INSERT INTO payments 
       (user_id, amount, payment_type, status, transaction_id) 
       VALUES ($1, $2, 'deposit', 'completed', $3)`,
      [userId, amount, transactionId],
    )

    // Update wallet balance
    const result = await executeQuery(
      `INSERT INTO wallet_balances (user_id, balance) 
       VALUES ($1, $2) 
       ON CONFLICT (user_id) 
       DO UPDATE SET balance = wallet_balances.balance + $2, updated_at = CURRENT_TIMESTAMP 
       RETURNING balance`,
      [userId, amount],
    )

    // Commit the transaction
    await executeQuery("COMMIT")

    return { success: true, newBalance: result[0].balance }
  } catch (error: any) {
    // Rollback on error
    await executeQuery("ROLLBACK")
    console.error("Error adding funds:", error)
    return { success: false, error: error.message || "Failed to add funds" }
  }
}

export async function withdrawFunds(
  userId: number,
  amount: number,
): Promise<{ success: boolean; newBalance?: number; error?: string }> {
  try {
    if (amount <= 0) {
      return { success: false, error: "Amount must be greater than zero" }
    }

    // Check current balance
    const currentBalance = await getWalletBalance(userId)

    if (currentBalance < amount) {
      return { success: false, error: "Insufficient funds" }
    }

    // Start a transaction
    await executeQuery("BEGIN")

    // Add payment record
    await executeQuery(
      `INSERT INTO payments 
       (user_id, amount, payment_type, status) 
       VALUES ($1, $2, 'withdrawal', 'pending')`,
      [userId, -amount],
    )

    // Update wallet balance
    const result = await executeQuery(
      `UPDATE wallet_balances 
       SET balance = balance - $1, updated_at = CURRENT_TIMESTAMP 
       WHERE user_id = $2 
       RETURNING balance`,
      [amount, userId],
    )

    // Commit the transaction
    await executeQuery("COMMIT")

    return { success: true, newBalance: result[0].balance }
  } catch (error: any) {
    // Rollback on error
    await executeQuery("ROLLBACK")
    console.error("Error withdrawing funds:", error)
    return { success: false, error: error.message || "Failed to withdraw funds" }
  }
}

export async function getTransactionHistory(userId: number, limit = 20): Promise<Transaction[]> {
  try {
    const result = await executeQuery(
      `SELECT * FROM payments 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT $2`,
      [userId, limit],
    )

    return result
  } catch (error) {
    console.error("Error getting transaction history:", error)
    return []
  }
}
