import { type NextRequest, NextResponse } from "next/server"
import { getOnlineReaders, getFeaturedReaders, searchReaders } from "@/lib/repositories/reader-repository"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("query")
    const type = searchParams.get("type")
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10)

    let readers

    if (query) {
      readers = await searchReaders(query, limit)
    } else if (type === "featured") {
      readers = await getFeaturedReaders(limit)
    } else {
      readers = await getOnlineReaders(limit)
    }

    return NextResponse.json({ readers })
  } catch (error) {
    console.error("Error fetching readers:", error)
    return NextResponse.json({ error: "Failed to fetch readers" }, { status: 500 })
  }
}
