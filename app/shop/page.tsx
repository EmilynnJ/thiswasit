import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function ShopPage() {
  // Mock data for digital products
  const digitalProducts = [
    {
      id: 1,
      title: "Cosmic Alignment Meditation",
      description: "A guided meditation to help you align with cosmic energies.",
      price: 12.99,
      image: "/placeholder.svg?height=200&width=300",
      author: "Mystic Luna",
    },
    {
      id: 2,
      title: "Chakra Balancing Guide",
      description: "Comprehensive digital guide to balance your chakras.",
      price: 19.99,
      image: "/placeholder.svg?height=200&width=300",
      author: "Celestial Sage",
    },
    {
      id: 3,
      title: "Tarot Interpretation Handbook",
      description: "Learn to interpret tarot cards with this detailed handbook.",
      price: 24.99,
      image: "/placeholder.svg?height=200&width=300",
      author: "Aura Whisperer",
    },
  ]

  // Mock data for physical products
  const physicalProducts = [
    {
      id: 101,
      title: "Crystal Healing Set",
      description: "Set of 7 healing crystals for chakra alignment.",
      price: 49.99,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 102,
      title: "Celestial Tarot Deck",
      description: "Hand-illustrated tarot deck with cosmic imagery.",
      price: 34.99,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 103,
      title: "Aura Cleansing Incense Bundle",
      description: "Premium incense sticks for cleansing your space.",
      price: 18.99,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Mock data for services
  const services = [
    {
      id: 201,
      title: "Personalized Birth Chart Analysis",
      description: "Detailed analysis of your astrological birth chart.",
      price: 79.99,
      image: "/placeholder.svg?height=200&width=300",
      author: "Mystic Luna",
    },
    {
      id: 202,
      title: "Past Life Regression Session",
      description: "Guided session to explore your past lives.",
      price: 129.99,
      image: "/placeholder.svg?height=200&width=300",
      author: "Cosmic Guide",
    },
    {
      id: 203,
      title: "30-Day Spiritual Development Course",
      description: "Structured course to develop your spiritual abilities.",
      price: 199.99,
      image: "/placeholder.svg?height=200&width=300",
      author: "Celestial Sage",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-playfair mb-8">Spiritual Shop</h1>

        <Tabs defaultValue="digital" className="w-full">
          <TabsList className="bg-gray-800 border-gray-700 p-1 mb-6">
            <TabsTrigger value="digital" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              Digital Products
            </TabsTrigger>
            <TabsTrigger value="physical" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              Physical Products
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="digital" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {digitalProducts.map((product) => (
                <Card key={product.id} className="bg-gray-800 border-gray-700 overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-1">{product.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{product.description}</p>
                    <p className="text-sm text-gray-400">By {product.author}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-4 pt-0">
                    <span className="font-bold text-pink-400">${product.price}</span>
                    <Button className="bg-pink-400 hover:bg-pink-500 text-black">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="physical" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {physicalProducts.map((product) => (
                <Card key={product.id} className="bg-gray-800 border-gray-700 overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-1">{product.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{product.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-4 pt-0">
                    <span className="font-bold text-pink-400">${product.price}</span>
                    <Button className="bg-pink-400 hover:bg-pink-500 text-black">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="bg-gray-800 border-gray-700 overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-1">{service.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{service.description}</p>
                    <p className="text-sm text-gray-400">By {service.author}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-4 pt-0">
                    <span className="font-bold text-pink-400">${service.price}</span>
                    <Button className="bg-pink-400 hover:bg-pink-500 text-black">Book Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
