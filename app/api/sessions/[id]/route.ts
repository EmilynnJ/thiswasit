import { type NextRequest, NextResponse } from "next/server"
import { getSessionById, completeSession, cancelSession } from "@/lib/repositories/session-repository"
import { createPayment } from "@/lib/repositories/payment-repository"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id, 10)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid session ID" }, { status: 400 })
    }

    const session = await getSessionById(id)

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    return NextResponse.json({ session })
  } catch (error) {
    console.error("Error fetching session:", error)
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id, 10)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid session ID" }, { status: 400 })
    }

    const body = await request.json()
    const { action, end_time, duration, total_cost } = body

    let session

    if (action === "complete") {
      if (!end_time || !duration || total_cost === undefined) {
        return NextResponse.json({ error: "Missing required fields for completion" }, { status: 400 })
      }

      session = await completeSession(id, new Date(end_time), duration, total_cost)

      if (session) {
        // Create payment record
        await createPayment({
          user_id: session.client_id,
          session_id: session.id,
          amount: session.total_cost || 0,
          payment_type: "session_payment",
          status: "completed",
        })
      }
    } else if (action === "cancel") {
      session = await cancelSession(id)
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    return NextResponse.json({ session })
  } catch (error) {
    console.error("Error updating session:", error)
    return NextResponse.json({ error: "Failed to update session" }, { status: 500 })
  }
}
