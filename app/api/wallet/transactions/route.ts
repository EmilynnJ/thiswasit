import { type NextRequest, NextResponse } from "next/server"
import { getTransactionHistory } from "@/lib/services/wallet-service"

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")
    const limit = request.nextUrl.searchParams.get("limit") || "20"

    if (!userId) {
      return NextResponse.json({ success: false, error: "Missing userId" }, { status: 400 })
    }

    const transactions = await getTransactionHistory(Number(userId), Number(limit))

    return NextResponse.json({ success: true, transactions })
  } catch (error: any) {
    console.error("Error getting transaction history:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to get transaction history",
      },
      { status: 500 },
    )
  }
}
