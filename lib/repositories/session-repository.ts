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
  created_at: Date
  updated_at: Date
}

export interface CreateSessionInput {
  reader_id: number
  client_id: number
  session_type: "chat" | "call" | "video"
  status: "scheduled" | "active"
  start_time?: Date
  rate_per_minute: number
}

export async function getSessionById(id: number): Promise<ReadingSession | null> {
  const result = await executeQuery("SELECT * FROM reading_sessions WHERE id = $1", [id])

  return result.length > 0 ? result[0] : null
}

export async function getClientSessions(clientId: number, limit = 20): Promise<ReadingSession[]> {
  const result = await executeQuery(
    "SELECT * FROM reading_sessions WHERE client_id = $1 ORDER BY created_at DESC LIMIT $2",
    [clientId, limit],
  )

  return result
}

export async function getReaderSessions(readerId: number, limit = 20): Promise<ReadingSession[]> {
  const result = await executeQuery(
    "SELECT * FROM reading_sessions WHERE reader_id = $1 ORDER BY created_at DESC LIMIT $2",
    [readerId, limit],
  )

  return result
}

export async function createSession(input: CreateSessionInput): Promise<ReadingSession> {
  const { reader_id, client_id, session_type, status, start_time, rate_per_minute } = input

  const result = await executeQuery(
    `INSERT INTO reading_sessions 
     (reader_id, client_id, session_type, status, start_time, rate_per_minute) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [reader_id, client_id, session_type, status, start_time || new Date(), rate_per_minute],
  )

  return result[0]
}

export async function completeSession(
  id: number,
  endTime: Date,
  duration: number,
  totalCost: number,
): Promise<ReadingSession | null> {
  const result = await executeQuery(
    `UPDATE reading_sessions 
     SET status = 'completed', end_time = $1, duration = $2, total_cost = $3, updated_at = CURRENT_TIMESTAMP 
     WHERE id = $4 
     RETURNING *`,
    [endTime, duration, totalCost, id],
  )

  return result.length > 0 ? result[0] : null
}

export async function cancelSession(id: number): Promise<ReadingSession | null> {
  const result = await executeQuery(
    `UPDATE reading_sessions 
     SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP 
     WHERE id = $1 
     RETURNING *`,
    [id],
  )

  return result.length > 0 ? result[0] : null
}
