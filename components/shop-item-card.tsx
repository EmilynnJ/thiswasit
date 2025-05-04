import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

interface Product {
  id: number
  name: string
  description?: string
  price: number
  product_type: "physical" | "digital" | "service"
  image_url?: string
  is_featured?: boolean
  stock_quantity?: number
}

interface ShopItemCardProps {
  product?: Product
}

export function ShopItemCard({ product }: ShopItemCardProps) {
  // Handle case where product is undefined
  if (!product) {
    return (
      <Card className="overflow-hidden border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="aspect-square w-full bg-gray-800 animate-pulse" />
        </CardContent>
        <CardContent className="p-4">
          <div className="h-5 w-3/4 bg-gray-800 animate-pulse mb-2" />
          <div className="h-4 w-1/2 bg-gray-800 animate-pulse" />
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="h-4 w-1/4 bg-gray-800 animate-pulse" />
          <Button disabled className="bg-pink-400 hover:bg-pink-500 text-black">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // Use a default image if image_url is not provided or empty
  const imageUrl =
    product.image_url && product.image_url.trim() !== "" ? product.image_url : "/enchanted-elixir.png"

  return (
    <Card className="overflow-hidden border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="aspect-square relative w-full overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </CardContent>
      <CardContent className="p-4">
        <h3 className="font-playfair text-lg font-medium text-white">{product.name}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">
          {product.description || "Mystical product for spiritual growth."}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="font-medium text-pink-400">{formatCurrency(product.price)}</div>
        <Button className="bg-pink-400 hover:bg-pink-500 text-black">Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}
