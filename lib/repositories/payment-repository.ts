import { executeQuery } from "@/lib/db"

export async function getPaymentMethods(userId: number) {
  return executeQuery(`SELECT * FROM payment_methods WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC`, [
    userId,
  ])
}

export async function getDefaultPaymentMethod(userId: number) {
  const result = await executeQuery(`SELECT * FROM payment_methods WHERE user_id = $1 AND is_default = true`, [userId])
  return result.length > 0 ? result[0] : null
}

export async function addPaymentMethod(
  userId: number,
  provider: string,
  token: string,
  lastFour: string,
  expiryDate: string,
  isDefault = false,
) {
  // If this is the default payment method, unset any existing default
  if (isDefault) {
    await executeQuery(`UPDATE payment_methods SET is_default = false WHERE user_id = $1`, [userId])
  }

  const result = await executeQuery(
    `INSERT INTO payment_methods 
     (user_id, provider, token, last_four, expiry_date, is_default)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [userId, provider, token, lastFour, expiryDate, isDefault],
  )
  return result.length > 0 ? result[0] : null
}

export async function setDefaultPaymentMethod(userId: number, paymentMethodId: number) {
  // Unset any existing default
  await executeQuery(`UPDATE payment_methods SET is_default = false WHERE user_id = $1`, [userId])

  // Set the new default
  const result = await executeQuery(
    `UPDATE payment_methods
     SET is_default = true, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [paymentMethodId, userId],
  )
  return result.length > 0 ? result[0] : null
}

export async function removePaymentMethod(userId: number, paymentMethodId: number) {
  return executeQuery(`DELETE FROM payment_methods WHERE id = $1 AND user_id = $2`, [paymentMethodId, userId])
}

export async function createTransaction(
  userId: number,
  amount: number,
  type: string,
  paymentMethodId?: number,
  currency = "USD",
  referenceId?: string,
  description?: string,
) {
  const result = await executeQuery(
    `INSERT INTO transactions 
     (user_id, payment_method_id, amount, currency, type, status, reference_id, description)
     VALUES ($1, $2, $3, $4, $5, 'pending', $6, $7)
     RETURNING *`,
    [userId, paymentMethodId || null, amount, currency, type, referenceId || null, description || null],
  )
  return result.length > 0 ? result[0] : null
}

export async function updateTransactionStatus(transactionId: number, status: string) {
  const result = await executeQuery(
    `UPDATE transactions
     SET status = $2, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [transactionId, status],
  )
  return result.length > 0 ? result[0] : null
}

export async function getUserTransactions(userId: number) {
  return executeQuery(
    `SELECT * FROM transactions
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId],
  )
}

export async function getReaderEarnings(readerId: number) {
  return executeQuery(
    `SELECT * FROM reader_earnings
     WHERE reader_id = $1
     ORDER BY created_at DESC`,
    [readerId],
  )
}

export async function createReaderEarning(
  readerId: number,
  amount: number,
  platformFee: number,
  netAmount: number,
  bookingId?: number,
  giftTransactionId?: number,
) {
  const result = await executeQuery(
    `INSERT INTO reader_earnings 
     (reader_id, booking_id, gift_transaction_id, amount, platform_fee, net_amount, status)
     VALUES ($1, $2, $3, $4, $5, $6, 'pending')
     RETURNING *`,
    [readerId, bookingId || null, giftTransactionId || null, amount, platformFee, netAmount],
  )
  return result.length > 0 ? result[0] : null
}

export async function updateReaderEarningStatus(earningId: number, status: string, payoutDate?: string) {
  const result = await executeQuery(
    `UPDATE reader_earnings
     SET status = $2, payout_date = $3, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [earningId, status, payoutDate || null],
  )
  return result.length > 0 ? result[0] : null
}
