import { type NextRequest, NextResponse } from "next/server"
import { getReaderProfileById } from "@/lib/repositories/reader-repository"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id, 10)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid reader ID" }, { status: 400 })
    }

    const reader = await getReaderProfileById(id)

    if (!reader) {
      return NextResponse.json({ error: "Reader not found" }, { status: 404 })
    }

    return NextResponse.json({ reader })
  } catch (error) {
    console.error("Error fetching reader:", error)
    return NextResponse.json({ error: "Failed to fetch reader" }, { status: 500 })
  }
}
