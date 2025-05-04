import { executeQuery } from "../db"

export interface ReadingSession {
  id: number
  reader_id: number
  client_id: number
  session_type: "chat" | "call" | "video"
  status: "scheduled" | "active" | "completed" | "cancelled"
  start_time?: Date
  end_time?: Date
  duration?: number
  rate_per_minute: number
  total_cost?: number
}

export interface ReaderRates {
  chat_rate: number
  call_rate: number
  video_rate: number
}

export async function getReaderRates(readerId: number): Promise<ReaderRates> {
  const result = await executeQuery("SELECT chat_rate, call_rate, video_rate FROM reader_profiles WHERE id = $1", [
    readerId,
  ])

  if (result.length === 0) {
    throw new Error(`Reader with ID ${readerId} not found`)
  }

  return {
    chat_rate: result[0].chat_rate,
    call_rate: result[0].call_rate,
    video_rate: result[0].video_rate,
  }
}

export async function startReading(
  readerId: number,
  clientId: number,
  type: "chat" | "call" | "video",
): Promise<{ success: boolean; session?: ReadingSession; error?: string }> {
  try {
    // Get reader rates
    const rates = await getReaderRates(readerId)

    // Determine rate based on session type
    let rate = 0
    switch (type) {
      case "chat":
        rate = rates.chat_rate
        break
      case "call":
        rate = rates.call_rate
        break
      case "video":
        rate = rates.video_rate
        break
    }

    // Check if client has sufficient funds
    const walletResult = await executeQuery("SELECT balance FROM wallet_balances WHERE user_id = $1", [clientId])

    if (walletResult.length === 0) {
      return { success: false, error: "Client wallet not found" }
    }

    const balance = walletResult[0].balance

    // Require at least 5 minutes worth of funds
    const minimumRequired = rate * 5

    if (balance < minimumRequired) {
      return {
        success: false,
        error: `Insufficient funds. Minimum balance required: $${(minimumRequired / 100).toFixed(2)}`,
      }
    }

    // Create a new reading session
    const sessionResult = await executeQuery(
      `INSERT INTO reading_sessions 
       (reader_id, client_id, session_type, status, start_time, rate_per_minute) 
       VALUES ($1, $2, $3, 'active', CURRENT_TIMESTAMP, $4) 
       RETURNING *`,
      [readerId, clientId, type, rate],
    )

    return { success: true, session: sessionResult[0] }
  } catch (error: any) {
    console.error("Error starting reading:", error)
    return { success: false, error: error.message || "Failed to start reading" }
  }
}

export async function endReading(
  sessionId: number,
): Promise<{ success: boolean; session?: ReadingSession; error?: string }> {
  try {
    // Get the session
    const sessionResult = await executeQuery("SELECT * FROM reading_sessions WHERE id = $1", [sessionId])

    if (sessionResult.length === 0) {
      return { success: false, error: "Session not found" }
    }

    const session = sessionResult[0]

    if (session.status !== "active") {
      return { success: false, error: "Session is not active" }
    }

    // Calculate duration and cost
    const startTime = new Date(session.start_time)
    const endTime = new Date()
    const durationMs = endTime.getTime() - startTime.getTime()
    const durationMinutes = Math.ceil(durationMs / (1000 * 60)) // Round up to nearest minute
    const totalCost = durationMinutes * session.rate_per_minute

    // Update the session
    const updatedSessionResult = await executeQuery(
      `UPDATE reading_sessions 
       SET status = 'completed', end_time = CURRENT_TIMESTAMP, 
       duration = $1, total_cost = $2 
       WHERE id = $3 
       RETURNING *`,
      [durationMinutes, totalCost, sessionId],
    )

    // Process payment
    await executeQuery(
      `INSERT INTO payments 
       (user_id, session_id, amount, payment_type, status) 
       VALUES ($1, $2, $3, 'session_payment', 'completed')`,
      [session.client_id, sessionId, -totalCost],
    )

    // Update client wallet
    await executeQuery(
      `UPDATE wallet_balances 
       SET balance = balance - $1 
       WHERE user_id = $2`,
      [totalCost, session.client_id],
    )

    // Update reader wallet (90% of the payment)
    const readerPayment = Math.floor(totalCost * 0.9)

    await executeQuery(
      `UPDATE wallet_balances 
       SET balance = balance + $1 
       WHERE user_id = (SELECT user_id FROM reader_profiles WHERE id = $2)`,
      [readerPayment, session.reader_id],
    )

    return { success: true, session: updatedSessionResult[0] }
  } catch (error: any) {
    console.error("Error ending reading:", error)
    return { success: false, error: error.message || "Failed to end reading" }
  }
}

export async function getActiveSession(clientId: number): Promise<ReadingSession | null> {
  try {
    const result = await executeQuery("SELECT * FROM reading_sessions WHERE client_id = $1 AND status = 'active'", [
      clientId,
    ])

    return result.length > 0 ? result[0] : null
  } catch (error) {
    console.error("Error getting active session:", error)
    return null
  }
}

export async function getSessionHistory(
  userId: number,
  userType: "client" | "reader",
  limit = 10,
): Promise<ReadingSession[]> {
  try {
    const field = userType === "client" ? "client_id" : "reader_id"

    const result = await executeQuery(
      `SELECT * FROM reading_sessions 
       WHERE ${field} = $1 
       ORDER BY created_at DESC 
       LIMIT $2`,
      [userId, limit],
    )

    return result
  } catch (error) {
    console.error("Error getting session history:", error)
    return []
  }
}
