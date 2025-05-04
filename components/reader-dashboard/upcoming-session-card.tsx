import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Video, MessageSquare, Phone } from "lucide-react"
import Link from "next/link"

interface UpcomingSessionCardProps {
  session: any
}

export function UpcomingSessionCard({ session }: UpcomingSessionCardProps) {
  const getSessionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return <Video className="h-4 w-4 text-pink-400" />
      case "chat":
        return <MessageSquare className="h-4 w-4 text-pink-400" />
      case "call":
        return <Phone className="h-4 w-4 text-pink-400" />
      default:
        return <MessageSquare className="h-4 w-4 text-pink-400" />
    }
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700/50">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={session.clientImage || "/placeholder.svg?height=40&width=40&query=person"}
              alt={session.clientName}
            />
            <AvatarFallback className="bg-pink-400/20 text-pink-400">{session.clientName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center">
              <h4 className="font-medium">{session.clientName}</h4>
              <div className="ml-2 flex items-center bg-gray-700/50 px-2 py-0.5 rounded text-xs">
                {getSessionIcon(session.type)}
                <span className="ml-1">{session.type}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {session.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {session.time}
              </div>
            </div>
          </div>
          <Link href={`/reading/${session.id}/${session.type.toLowerCase()}`}>
            <Button size="sm" className="bg-pink-400 hover:bg-pink-500 text-black">
              Start
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
