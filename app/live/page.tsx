import { Button } from "@/components/ui/button"
import { LiveStreamCard } from "@/components/live-stream-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageContainer } from "@/components/page-container"

export default function LivePage() {
  // Mock data for live streams
  const liveStreams = [
    {
      id: 1,
      title: "Monthly Tarot Forecast",
      readerName: "Mystic Luna",
      readerAvatar: "/placeholder.svg?height=100&width=100",
      viewers: 128,
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 2,
      title: "Healing Meditation Circle",
      readerName: "Celestial Sage",
      readerAvatar: "/placeholder.svg?height=100&width=100",
      viewers: 95,
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 3,
      title: "Spiritual Q&A Session",
      readerName: "Aura Whisperer",
      readerAvatar: "/placeholder.svg?height=100&width=100",
      viewers: 67,
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 4,
      title: "Crystal Energy Workshop",
      readerName: "Starlight Oracle",
      readerAvatar: "/placeholder.svg?height=100&width=100",
      viewers: 42,
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
  ]

  // Mock data for upcoming streams
  const upcomingStreams = [
    {
      id: 101,
      title: "New Moon Ritual & Intentions",
      readerName: "Mystic Luna",
      readerAvatar: "/placeholder.svg?height=100&width=100",
      scheduledTime: "Tomorrow, 8:00 PM",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 102,
      title: "Past Life Regression Journey",
      readerName: "Cosmic Guide",
      readerAvatar: "/placeholder.svg?height=100&width=100",
      scheduledTime: "Mar 18, 7:30 PM",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
  ]

  return (
    <PageContainer>
      <h1 className="text-3xl font-playfair mb-8">Live Streams</h1>

      <Tabs defaultValue="live" className="w-full">
        <TabsList className="bg-gray-800/70 backdrop-blur-sm border-gray-700/50 p-1 mb-6">
          <TabsTrigger value="live" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
            Live Now
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="following" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
            Following
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveStreams.map((stream) => (
              <LiveStreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingStreams.map((stream) => (
              <div key={stream.id} className="glass-card rounded-lg overflow-hidden">
                <div className="relative">
                  <div className="aspect-video relative">
                    <img
                      src={stream.thumbnail || "/placeholder.svg"}
                      alt={stream.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {stream.scheduledTime}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={stream.readerAvatar || "/placeholder.svg"}
                        alt={stream.readerName}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{stream.title}</h3>
                      <p className="text-gray-300 text-sm">{stream.readerName}</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-pink-400 hover:bg-pink-500 text-black">Set Reminder</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="following" className="mt-0">
          <div className="glass-card p-6 text-center">
            <p className="text-gray-300 mb-4">You aren't following any readers yet.</p>
            <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10">
              Discover Readers
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  )
}
