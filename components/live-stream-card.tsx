import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface LiveStream {
  id: number
  title: string
  readerName: string
  readerAvatar: string
  viewers: number
  thumbnailUrl: string
}

interface LiveStreamCardProps {
  stream: LiveStream
}

export function LiveStreamCard({ stream }: LiveStreamCardProps) {
  // Use default images if URLs are empty or undefined
  const thumbnailUrl =
    stream.thumbnailUrl && stream.thumbnailUrl.trim() !== "" ? stream.thumbnailUrl : "/ethereal-flow.png"

  const avatarUrl =
    stream.readerAvatar && stream.readerAvatar.trim() !== "" ? stream.readerAvatar : "/mystical-seer.png"

  return (
    <Card className="overflow-hidden border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="relative aspect-video">
        <Image src={thumbnailUrl || "/placeholder.svg"} alt={stream.title} fill className="object-cover" />
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
          <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
          LIVE
        </div>
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
          <Eye className="w-3 h-3 mr-1" />
          {stream.viewers}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <Image
              src={avatarUrl || "/placeholder.svg"}
              alt={stream.readerName}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-playfair text-white">{stream.readerName}</h3>
            <p className="text-xs text-gray-400">Psychic Reader</p>
          </div>
        </div>
        <h4 className="font-playfair text-lg mb-4">{stream.title}</h4>
        <Button className="w-full bg-pink-400 hover:bg-pink-500 text-black">Join Stream</Button>
      </CardContent>
    </Card>
  )
}
