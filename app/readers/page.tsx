import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ReaderCard } from "@/components/reader-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageContainer } from "@/components/page-container"

export default function ReadersPage() {
  // Mock data for readers
  const readers = [
    {
      id: 1,
      name: "Mystic Luna",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Tarot & Astrology",
      rating: 4.9,
      price: 3.99,
      isOnline: true,
    },
    {
      id: 2,
      name: "Celestial Sage",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Spiritual Healing",
      rating: 4.8,
      price: 4.5,
      isOnline: true,
    },
    {
      id: 3,
      name: "Aura Whisperer",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Aura Reading",
      rating: 4.7,
      price: 3.75,
      isOnline: true,
    },
    {
      id: 4,
      name: "Cosmic Guide",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Psychic Medium",
      rating: 4.9,
      price: 5.25,
      isOnline: false,
    },
    {
      id: 5,
      name: "Ethereal Empath",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Empathic Readings",
      rating: 4.6,
      price: 3.5,
      isOnline: false,
    },
    {
      id: 6,
      name: "Starlight Oracle",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Oracle Cards",
      rating: 4.8,
      price: 4.0,
      isOnline: true,
    },
  ]

  return (
    <PageContainer>
      <h1 className="text-3xl font-playfair mb-8">Find Your Reader</h1>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search by name or specialty..."
            className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-white"
          />
          <Button className="bg-pink-400 hover:bg-pink-500 text-black">Search</Button>
          <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10" asChild>
            <a href="/readers/advanced-search">Advanced Search</a>
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-gray-800/70 backdrop-blur-sm border-gray-700/50 p-1 mb-6">
            <TabsTrigger value="all" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              All Readers
            </TabsTrigger>
            <TabsTrigger value="online" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              Online Now
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              My Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readers.map((reader) => (
                <ReaderCard key={reader.id} reader={reader} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="online" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readers
                .filter((reader) => reader.isOnline)
                .map((reader) => (
                  <ReaderCard key={reader.id} reader={reader} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <div className="glass-card p-6 text-center">
              <p className="text-gray-300 mb-4">You haven't added any readers to your favorites yet.</p>
              <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10">
                Browse Readers
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  )
}
