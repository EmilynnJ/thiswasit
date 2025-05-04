"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ReadingTimer } from "@/components/reading/reading-timer"
import type { ReadingType, ReadingRates } from "@/lib/reading-service"
import { Mic, Video, VideoOff, MessageCircle, PhoneOff } from "lucide-react"

interface ReadingControlsProps {
  readerId: string
  clientId: string
  readerName: string
  rates: ReadingRates
  onEndReading?: () => void
}

export function ReadingControls({ readerId, clientId, readerName, rates, onEndReading }: ReadingControlsProps) {
  const [activeType, setActiveType] = useState<ReadingType | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const startReading = async (type: ReadingType) => {
    try {
      setIsLoading(true)

      const response = await fetch("/api/readings/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          readerId,
          clientId,
          type,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setActiveType(type)
        setSessionId(data.session.id)
      } else {
        console.error("Failed to start reading:", data.error)
      }
    } catch (error) {
      console.error("Error starting reading:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const endReading = async () => {
    if (!sessionId) return

    try {
      setIsLoading(true)

      const response = await fetch("/api/readings/end", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setActiveType(null)
        setSessionId(null)
        if (onEndReading) onEndReading()
      } else {
        console.error("Failed to end reading:", data.error)
      }
    } catch (error) {
      console.error("Error ending reading:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="glass-card p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Connect with {readerName}</h3>

      {activeType ? (
        <div className="space-y-6">
          <div className="text-center">
            <div className="mb-2 text-lg font-medium">
              {activeType === "chat" && "Chat Reading in Progress"}
              {activeType === "call" && "Voice Call in Progress"}
              {activeType === "video" && "Video Call in Progress"}
            </div>
            <ReadingTimer ratePerMinute={rates[activeType]} isActive={!!activeType} />
          </div>

          <div className="flex justify-center">
            <Button variant="destructive" size="lg" onClick={endReading} disabled={isLoading} className="px-8">
              {activeType === "chat" && "End Chat"}
              {activeType === "call" && (
                <>
                  <PhoneOff className="mr-2 h-4 w-4" />
                  End Call
                </>
              )}
              {activeType === "video" && (
                <>
                  <VideoOff className="mr-2 h-4 w-4" />
                  End Video
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            size="lg"
            className="flex flex-col items-center justify-center h-24 border-pink-400/50 hover:bg-pink-400/10"
            onClick={() => startReading("chat")}
            disabled={isLoading}
          >
            <MessageCircle className="h-8 w-8 mb-2 text-pink-400" />
            <span>Chat</span>
            <span className="text-xs text-gray-400 mt-1">${(rates.chat / 100).toFixed(2)}/min</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="flex flex-col items-center justify-center h-24 border-pink-400/50 hover:bg-pink-400/10"
            onClick={() => startReading("call")}
            disabled={isLoading}
          >
            <Mic className="h-8 w-8 mb-2 text-pink-400" />
            <span>Voice Call</span>
            <span className="text-xs text-gray-400 mt-1">${(rates.call / 100).toFixed(2)}/min</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="flex flex-col items-center justify-center h-24 border-pink-400/50 hover:bg-pink-400/10"
            onClick={() => startReading("video")}
            disabled={isLoading}
          >
            <Video className="h-8 w-8 mb-2 text-pink-400" />
            <span>Video Call</span>
            <span className="text-xs text-gray-400 mt-1">${(rates.video / 100).toFixed(2)}/min</span>
          </Button>
        </div>
      )}
    </div>
  )
}
