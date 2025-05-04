import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { Star, MessageCircle, Phone, Video } from "lucide-react"

interface ReaderProfile {
  id: number
  user_id: number
  display_name: string
  specialty?: string
  bio?: string
  avatar_url?: string
  years_experience?: number
  is_verified?: boolean
  is_featured?: boolean
  is_online?: boolean
  chat_rate: number
  call_rate: number
  video_rate: number
}

interface ReaderCardProps {
  reader?: ReaderProfile
}

export function ReaderCard({ reader }: ReaderCardProps) {
  // Handle case where reader is undefined
  if (!reader) {
    return (
      <Card className="overflow-hidden border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <CardContent className="p-4 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-800 animate-pulse mb-4" />
          <div className="h-6 w-3/4 bg-gray-800 animate-pulse mb-2" />
          <div className="h-4 w-1/2 bg-gray-800 animate-pulse mb-4" />
          <div className="h-4 w-full bg-gray-800 animate-pulse" />
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="h-10 w-full bg-gray-800 animate-pulse rounded" />
        </CardFooter>
      </Card>
    )
  }

  // Use a default avatar if avatar_url is not provided or empty
  const avatarUrl =
    reader.avatar_url && reader.avatar_url.trim() !== "" ? reader.avatar_url : "/mystical-seer.png"

  return (
    <Card className="overflow-hidden border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <CardContent className="p-4 flex flex-col items-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 relative">
            <Image
              src={avatarUrl || "/placeholder.svg"}
              alt={reader.display_name}
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          {reader.is_online && (
            <span className="absolute bottom-4 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></span>
          )}
        </div>
        <h3 className="font-alex-brush text-2xl text-pink-400 mb-1">{reader.display_name}</h3>
        <div className="flex items-center gap-1 mb-2">
          {reader.is_verified && (
            <Badge variant="outline" className="border-blue-400 text-blue-400 text-xs">
              Verified
            </Badge>
          )}
          <Badge variant="outline" className="border-pink-400 text-pink-400 text-xs">
            {reader.specialty || "Psychic"}
          </Badge>
        </div>
        <div className="flex items-center gap-1 mb-3 text-gold-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-current" />
          ))}
        </div>
        <p className="text-sm text-gray-300 text-center line-clamp-2 mb-4 font-playfair">
          {reader.bio || "Experienced psychic reader specializing in love and career guidance."}
        </p>
        <div className="flex justify-between w-full text-xs text-gray-400">
          <div className="flex items-center">
            <MessageCircle className="w-3 h-3 mr-1" />
            {formatCurrency(reader.chat_rate)}/min
          </div>
          <div className="flex items-center">
            <Phone className="w-3 h-3 mr-1" />
            {formatCurrency(reader.call_rate)}/min
          </div>
          <div className="flex items-center">
            <Video className="w-3 h-3 mr-1" />
            {formatCurrency(reader.video_rate)}/min
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-pink-400 hover:bg-pink-500 text-black">Start Reading</Button>
      </CardFooter>
    </Card>
  )
}
