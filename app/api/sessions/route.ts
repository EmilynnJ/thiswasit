import { type NextRequest, NextResponse } from "next/server"
import { createSession, getClientSessions, getReaderSessions } from "@/lib/repositories/session-repository"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const clientId = searchParams.get("clientId")
    const readerId = searchParams.get("readerId")
    const limit = Number.parseInt(searchParams.get("limit") || "20", 10)

    let sessions

    if (clientId) {
      sessions = await getClientSessions(Number.parseInt(clientId, 10), limit)
    } else if (readerId) {
      sessions = await getReaderSessions(Number.parseInt(readerId, 10), limit)
    } else {
      return NextResponse.json({ error: "Missing clientId or readerId parameter" }, { status: 400 })
    }

    return NextResponse.json({ sessions })
  } catch (error) {
    console.error("Error fetching sessions:", error)
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reader_id, client_id, session_type, status, start_time, rate_per_minute } = body

    if (!reader_id || !client_id || !session_type || !rate_per_minute) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const session = await createSession({
      reader_id,
      client_id,
      session_type,
      status: status || "active",
      start_time: start_time ? new Date(start_time) : undefined,
      rate_per_minute,
    })

    return NextResponse.json({ session })
  } catch (error) {
    console.error("Error creating session:", error)
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
  }
}
