import { LiveStreamCard } from "@/components/live-stream-card"

// Mock data for live streams
const liveStreams = [
  {
    id: 1,
    title: "Love & Relationships Q&A",
    readerName: "Mystic Luna",
    readerAvatar: "/placeholder.svg?height=100&width=100&query=mystic%20luna",
    viewers: 42,
    thumbnailUrl: "/placeholder.svg?height=200&width=350&query=tarot%20reading",
  },
  {
    id: 2,
    title: "Career Path Guidance",
    readerName: "Astral Seer",
    readerAvatar: "/placeholder.svg?height=100&width=100&query=astral%20seer",
    viewers: 28,
    thumbnailUrl: "/placeholder.svg?height=200&width=350&query=career%20guidance",
  },
  {
    id: 3,
    title: "Spiritual Awakening Journey",
    readerName: "Celestial Guide",
    readerAvatar: "/placeholder.svg?height=100&width=100&query=celestial%20guide",
    viewers: 35,
    thumbnailUrl: "/placeholder.svg?height=200&width=350&query=spiritual%20awakening",
  },
]

export function LiveStreams() {
  return (
    <div className="py-12">
      <h2 className="font-alex-brush text-3xl text-center mb-8 text-pink-400 heading-glow">Live Now</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {liveStreams.map((stream) => (
          <LiveStreamCard key={stream.id} stream={stream} />
        ))}
      </div>
    </div>
  )
}
