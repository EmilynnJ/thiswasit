"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Phone, Video } from "lucide-react"
import { useRouter } from "next/navigation"

interface ReadingOptionsProps {
  readerId: number
  readerName: string
  chatRate: number
  callRate: number
  videoRate: number
}

export function ReadingOptions({ readerId, readerName, chatRate, callRate, videoRate }: ReadingOptionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const startReading = (type: "chat" | "call" | "video") => {
    setIsLoading(true)
    router.push(`/reading/${readerId}/${type}`)
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-alex-brush heading-glow text-2xl">Connect with {readerName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Chat Reading</h3>
                <p className="text-gray-400 text-sm mb-4">Connect through text chat for personalized guidance</p>
                <div className="text-xl font-bold text-pink-400 mb-4">${(chatRate / 100).toFixed(2)}/min</div>
                <Button
                  className="w-full bg-pink-500 hover:bg-pink-600"
                  onClick={() => startReading("chat")}
                  disabled={isLoading}
                >
                  Start Chat
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Voice Reading</h3>
                <p className="text-gray-400 text-sm mb-4">Connect through voice call for deeper insights</p>
                <div className="text-xl font-bold text-pink-400 mb-4">${(callRate / 100).toFixed(2)}/min</div>
                <Button
                  className="w-full bg-pink-500 hover:bg-pink-600"
                  onClick={() => startReading("call")}
                  disabled={isLoading}
                >
                  Start Call
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Video Reading</h3>
                <p className="text-gray-400 text-sm mb-4">Connect through video for the most immersive experience</p>
                <div className="text-xl font-bold text-pink-400 mb-4">${(videoRate / 100).toFixed(2)}/min</div>
                <Button
                  className="w-full bg-pink-500 hover:bg-pink-600"
                  onClick={() => startReading("video")}
                  disabled={isLoading}
                >
                  Start Video
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
