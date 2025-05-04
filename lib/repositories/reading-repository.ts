import { executeQuery } from "@/lib/db"

export interface ReadingSession {
  id: number
  readerId: number
  clientId: number
  sessionType: "chat" | "call" | "video"
  status: "scheduled" | "active" | "completed" | "cancelled"
  startTime: Date | null
  endTime: Date | null
  duration: number | null // in minutes
  ratePerMinute: number // in cents
  totalCost: number | null // in cents
  createdAt: Date
  updatedAt: Date
}

export async function createReadingSession(session: Omit<ReadingSession, "id" | "createdAt" | "updatedAt">) {
  const query = `
    INSERT INTO reading_sessions (
      reader_id, client_id, session_type, status, 
      start_time, end_time, duration, rate_per_minute, total_cost
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9
    ) RETURNING *
  `

  const values = [
    session.readerId,
    session.clientId,
    session.sessionType,
    session.status,
    session.startTime,
    session.endTime,
    session.duration,
    session.ratePerMinute,
    session.totalCost,
  ]

  const result = await executeQuery(query, values)
  return result[0]
}

export async function getReadingSessionById(id: number) {
  const query = `
    SELECT * FROM reading_sessions WHERE id = $1
  `

  const result = await executeQuery(query, [id])
  return result[0]
}

export async function updateReadingSession(id: number, updates: Partial<ReadingSession>) {
  const updateFields = Object.entries(updates)
    .map(([key, _], index) => {
      // Convert camelCase to snake_case
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      return `${snakeKey} = $${index + 2}`
    })
    .join(", ")

  const query = `
    UPDATE reading_sessions
    SET ${updateFields}, updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `

  const values = [id, ...Object.values(updates)]
  const result = await executeQuery(query, values)
  return result[0]
}

export async function startReadingSession(id: number) {
  const query = `
    UPDATE reading_sessions
    SET status = 'active', start_time = NOW(), updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `

  const result = await executeQuery(query, [id])
  return result[0]
}

export async function endReadingSession(id: number) {
  // First get the session to calculate duration and cost
  const session = await getReadingSessionById(id)

  if (!session || !session.start_time) {
    throw new Error("Session not found or not started")
  }

  const endTime = new Date()
  const startTime = new Date(session.start_time)

  // Calculate duration in minutes
  const durationMs = endTime.getTime() - startTime.getTime()
  const durationMinutes = Math.ceil(durationMs / (1000 * 60))

  // Calculate total cost
  const totalCost = durationMinutes * session.rate_per_minute

  const query = `
    UPDATE reading_sessions
    SET status = 'completed', 
        end_time = $2, 
        duration = $3, 
        total_cost = $4,
        updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `

  const result = await executeQuery(query, [id, endTime, durationMinutes, totalCost])
  return result[0]
}

export async function getClientReadingSessions(clientId: number) {
  const query = `
    SELECT rs.*, rp.display_name as reader_name, rp.avatar_url as reader_avatar
    FROM reading_sessions rs
    JOIN reader_profiles rp ON rs.reader_id = rp.id
    WHERE rs.client_id = $1
    ORDER BY rs.created_at DESC
  `

  return await executeQuery(query, [clientId])
}

export async function getReaderReadingSessions(readerId: number) {
  const query = `
    SELECT rs.*, u.first_name, u.last_name
    FROM reading_sessions rs
    JOIN users u ON rs.client_id = u.id
    WHERE rs.reader_id = $1
    ORDER BY rs.created_at DESC
  `

  return await executeQuery(query, [readerId])
}
