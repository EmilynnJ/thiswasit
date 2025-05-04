import { withAuth } from "@/lib/auth-service"
import {
  getUserStats,
  getTransactionStats,
  getBookingStats,
  getReaderEarningStats,
} from "@/lib/repositories/admin-repository"

export const GET = withAuth(
  async (req: Request, user: any) => {
    if (user.user_type !== "admin") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    }

    try {
      const [userStats, transactionStats, bookingStats, earningStats] = await Promise.all([
        getUserStats(),
        getTransactionStats(),
        getBookingStats(),
        getReaderEarningStats(),
      ])

      return new Response(
        JSON.stringify({
          userStats: userStats[0],
          transactionStats: transactionStats[0],
          bookingStats: bookingStats[0],
          earningStats: earningStats[0],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    } catch (error) {
      console.error("Error fetching admin stats:", error)
      return new Response(JSON.stringify({ error: "Failed to fetch stats" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }
  },
  ["admin"],
)
