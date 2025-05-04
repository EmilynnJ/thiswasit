import { ShopItemCard } from "@/components/shop-item-card"
import { executeQuery } from "@/lib/db"

interface Product {
  id: number
  name: string
  description: string
  price: number
  product_type: "physical" | "digital" | "service"
  image_url: string
  is_featured: boolean
  stock_quantity: number | null
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await executeQuery("SELECT * FROM products WHERE is_featured = true ORDER BY id LIMIT 4")
    return products as Product[]
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

export async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  // Handle case where no products are found
  if (products.length === 0) {
    // Return placeholder cards
    return (
      <div className="py-12">
        <h2 className="font-alex-brush text-3xl text-center mb-8 text-pink-400 heading-glow">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ShopItemCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <h2 className="font-alex-brush text-3xl text-center mb-8 text-pink-400 heading-glow">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ShopItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
