import { type NextRequest, NextResponse } from "next/server"
import { startReading } from "@/lib/services/reading-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { readerId, clientId, type } = body

    if (!readerId || !clientId || !type) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const result = await startReading(Number(readerId), Number(clientId), type)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true, session: result.session })
  } catch (error: any) {
    console.error("Error starting reading:", error)
    return NextResponse.json({ success: false, error: error.message || "Failed to start reading" }, { status: 500 })
  }
}
