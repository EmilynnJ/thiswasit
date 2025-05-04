import { type NextRequest, NextResponse } from "next/server"
import {
  getFeaturedProducts,
  getProductsByType,
  searchProducts,
  createProduct,
} from "@/lib/repositories/product-repository"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("query")
    const type = searchParams.get("type") as "digital" | "physical" | "service" | null
    const featured = searchParams.get("featured") === "true"
    const limit = Number.parseInt(searchParams.get("limit") || "20", 10)

    let products

    if (query) {
      products = await searchProducts(query, limit)
    } else if (featured) {
      products = await getFeaturedProducts(limit)
    } else if (type) {
      products = await getProductsByType(type, limit)
    } else {
      // Default to featured products
      products = await getFeaturedProducts(limit)
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, product_type, image_url, is_featured, stock_quantity } = body

    if (!name || !price || !product_type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const product = await createProduct({
      name,
      description,
      price,
      product_type,
      image_url,
      is_featured,
      stock_quantity,
    })

    return NextResponse.json({ product })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
