import { type NextRequest, NextResponse } from "next/server"
import { endReading } from "@/lib/services/reading-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId } = body

    if (!sessionId) {
      return NextResponse.json({ success: false, error: "Missing sessionId" }, { status: 400 })
    }

    const result = await endReading(Number(sessionId))

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true, session: result.session })
  } catch (error: any) {
    console.error("Error ending reading:", error)
    return NextResponse.json({ success: false, error: error.message || "Failed to end reading" }, { status: 500 })
  }
}
