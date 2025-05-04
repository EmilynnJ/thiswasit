import { type NextRequest, NextResponse } from "next/server"
import { getWalletBalance } from "@/lib/services/wallet-service"

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ success: false, error: "Missing userId" }, { status: 400 })
    }

    const balance = await getWalletBalance(Number(userId))

    return NextResponse.json({ success: true, balance })
  } catch (error: any) {
    console.error("Error getting wallet balance:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to get wallet balance" },
      { status: 500 },
    )
  }
}
