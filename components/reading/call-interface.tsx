"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Phone, Volume2, VolumeX } from "lucide-react"
import { ReadingTimer } from "./reading-timer"

interface CallInterfaceProps {
  readerId: number
  readerName: string
  clientId: number
  clientName: string
  sessionId?: number
  ratePerMinute: number
}

export function CallInterface({
  readerId,
  readerName,
  clientId,
  clientName,
  sessionId,
  ratePerMinute,
}: CallInterfaceProps) {
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [currentSessionId, setCurrentSessionId] = useState<number | undefined>(sessionId)
  const [error, setError] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOff, setIsSpeakerOff] = useState(false)
  const [callDuration, setCallDuration] = useState(0)

  // Update call duration
  useEffect(() => {
    if (isSessionActive && sessionStartTime) {
      const interval = setInterval(() => {
        const now = new Date()
        const duration = Math.floor((now.getTime() - sessionStartTime.getTime()) / 1000)
        setCallDuration(duration)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isSessionActive, sessionStartTime])

  // Format duration as mm:ss
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // In a real app, you would use WebRTC for audio calls
  // This is a simplified mock implementation
  const startSession = async () => {
    try {
      setError(null)

      const response = await fetch("/api/readings/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          readerId,
          clientId,
          type: "call",
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSessionActive(true)
        setSessionStartTime(new Date())
        setCurrentSessionId(data.session.id)
      } else {
        setError(data.error || "Failed to start session")
        console.error("Failed to start session:", data.error)
      }
    } catch (error) {
      setError("An unexpected error occurred")
      console.error("Error starting session:", error)
    }
  }

  const endSession = async () => {
    if (!currentSessionId) return

    try {
      setError(null)

      const response = await fetch("/api/readings/end", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: currentSessionId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSessionActive(false)
      } else {
        setError(data.error || "Failed to end session")
        console.error("Failed to end session:", data.error)
      }
    } catch (error) {
      setError("An unexpected error occurred")
      console.error("Error ending session:", error)
    }
  }

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto glass-card">
      {/* Header with session info and timer */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <div>
          <h3 className="font-alex-brush heading-glow text-lg">Voice Call with {readerName}</h3>
          <p className="text-xs text-gray-400">${(ratePerMinute / 100).toFixed(2)}/min</p>
        </div>

        {isSessionActive && sessionStartTime && (
          <ReadingTimer startTime={sessionStartTime} ratePerMinute={ratePerMinute} />
        )}
      </div>

      {/* Error message */}
      {error && <div className="bg-red-500/20 text-red-300 p-3 text-sm">{error}</div>}

      {/* Call area */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="text-center">
          {isSessionActive ? (
            <>
              <div className="w-24 h-24 rounded-full bg-pink-500/20 mx-auto flex items-center justify-center mb-4">
                <span className="text-3xl font-alex-brush">{readerName.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-alex-brush heading-glow mb-2">{readerName}</h3>
              <p className="text-gray-400 mb-4">Call in progress</p>
              <div className="text-2xl font-mono mb-8">{formatDuration(callDuration)}</div>

              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className={isMuted ? "bg-red-500/20" : ""}
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={isSpeakerOff ? "bg-red-500/20" : ""}
                  onClick={() => setIsSpeakerOff(!isSpeakerOff)}
                >
                  {isSpeakerOff ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <Button variant="destructive" size="icon" onClick={endSession}>
                  <Phone className="h-5 w-5 rotate-135" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-alex-brush heading-glow mb-4">Connect with {readerName}</h3>
              <p className="text-gray-400 mb-6">Start a voice call to receive guidance</p>
              <Button className="bg-pink-500 hover:bg-pink-600" onClick={startSession}>
                Start Voice Call
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
