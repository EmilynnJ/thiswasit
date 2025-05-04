import { type NextRequest, NextResponse } from "next/server"
import { addFunds } from "@/lib/services/wallet-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, amount, paymentMethodId } = body

    if (!userId || !amount) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would process the payment with Stripe here
    // For now, we'll simulate a successful payment
    const transactionId = `txn_${Date.now()}`

    const result = await addFunds(Number(userId), Number(amount), transactionId)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      newBalance: result.newBalance,
      transactionId,
    })
  } catch (error: any) {
    console.error("Error adding funds:", error)
    return NextResponse.json({ success: false, error: error.message || "Failed to add funds" }, { status: 500 })
  }
}
