import { executeQuery } from "@/lib/db"

export interface WalletTransaction {
  id: number
  userId: number
  amount: number // in cents, positive for deposits, negative for withdrawals
  transactionType: "deposit" | "withdrawal" | "session_payment" | "refund"
  sessionId?: number
  status: "pending" | "completed" | "failed"
  transactionId?: string
  createdAt: Date
}

export async function getUserBalance(userId: number) {
  const query = `
    SELECT balance FROM wallet_balances WHERE user_id = $1
  `

  const result = await executeQuery(query, [userId])

  if (result.length === 0) {
    // Create a new wallet balance record if it doesn't exist
    const insertQuery = `
      INSERT INTO wallet_balances (user_id, balance)
      VALUES ($1, 0)
      RETURNING balance
    `

    const insertResult = await executeQuery(insertQuery, [userId])
    return insertResult[0].balance
  }

  return result[0].balance
}

export async function addFundsToWallet(userId: number, amount: number, transactionId: string) {
  // Start a transaction
  await executeQuery("BEGIN")

  try {
    // Add the transaction record
    const transactionQuery = `
      INSERT INTO payments (
        user_id, amount, payment_type, status, transaction_id
      ) VALUES (
        $1, $2, 'deposit', 'completed', $3
      ) RETURNING id
    `

    const transactionResult = await executeQuery(transactionQuery, [userId, amount, transactionId])

    // Update the wallet balance
    const balanceQuery = `
      INSERT INTO wallet_balances (user_id, balance)
      VALUES ($1, $2)
      ON CONFLICT (user_id) 
      DO UPDATE SET balance = wallet_balances.balance + $2
      RETURNING balance
    `

    const balanceResult = await executeQuery(balanceQuery, [userId, amount])

    // Commit the transaction
    await executeQuery("COMMIT")

    return {
      transactionId: transactionResult[0].id,
      newBalance: balanceResult[0].balance,
    }
  } catch (error) {
    // Rollback in case of error
    await executeQuery("ROLLBACK")
    throw error
  }
}

export async function processReadingPayment(clientId: number, readerId: number, sessionId: number, amount: number) {
  // Start a transaction
  await executeQuery("BEGIN")

  try {
    // Check if client has sufficient balance
    const clientBalance = await getUserBalance(clientId)

    if (clientBalance < amount) {
      throw new Error("Insufficient funds")
    }

    // Deduct from client's wallet
    const clientQuery = `
      UPDATE wallet_balances
      SET balance = balance - $2
      WHERE user_id = $1
      RETURNING balance
    `

    const clientResult = await executeQuery(clientQuery, [clientId, amount])

    // Add client payment record
    const clientPaymentQuery = `
      INSERT INTO payments (
        user_id, session_id, amount, payment_type, status
      ) VALUES (
        $1, $2, $3, 'session_payment', 'completed'
      )
    `

    await executeQuery(clientPaymentQuery, [clientId, sessionId, -amount])

    // Calculate reader's share (70%)
    const readerAmount = Math.floor(amount * 0.7)

    // Add to reader's wallet
    const readerQuery = `
      UPDATE wallet_balances
      SET balance = balance + $2
      WHERE user_id = $1
      RETURNING balance
    `

    const readerResult = await executeQuery(readerQuery, [readerId, readerAmount])

    // Add reader payment record
    const readerPaymentQuery = `
      INSERT INTO payments (
        user_id, session_id, amount, payment_type, status
      ) VALUES (
        $1, $2, $3, 'session_payment', 'completed'
      )
    `

    await executeQuery(readerPaymentQuery, [readerId, sessionId, readerAmount])

    // Commit the transaction
    await executeQuery("COMMIT")

    return {
      clientNewBalance: clientResult[0].balance,
      readerNewBalance: readerResult[0].balance,
      amountPaid: amount,
      readerShare: readerAmount,
    }
  } catch (error) {
    // Rollback in case of error
    await executeQuery("ROLLBACK")
    throw error
  }
}

export async function getTransactionHistory(userId: number) {
  const query = `
    SELECT p.*, rs.session_type, rp.display_name as reader_name
    FROM payments p
    LEFT JOIN reading_sessions rs ON p.session_id = rs.id
    LEFT JOIN reader_profiles rp ON rs.reader_id = rp.id
    WHERE p.user_id = $1
    ORDER BY p.created_at DESC
  `

  return await executeQuery(query, [userId])
}
