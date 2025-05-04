"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Video, VideoOff, Phone } from "lucide-react"
import { ReadingTimer } from "./reading-timer"

interface VideoInterfaceProps {
  readerId: number
  readerName: string
  clientId: number
  clientName: string
  sessionId?: number
  ratePerMinute: number
}

export function VideoInterface({
  readerId,
  readerName,
  clientId,
  clientName,
  sessionId,
  ratePerMinute,
}: VideoInterfaceProps) {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<number | undefined>(
    sessionId
  );
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // In a real app, you would use WebRTC for video calls
  // This is a simplified mock implementation
  const startSession = async () => {
    try {
      setError(null);
      
      const response = await fetch("/api/readings/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          readerId,
          clientId,
          type: "video",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSessionActive(true);
        setSessionStartTime(new Date());
        setCurrentSessionId(data.session.id);
      } else {
        setError(data.error || "Failed to start session");
        console.error("Failed to start session:", data.error);
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error("Error starting session:", error);  
      setError("An unexpected error occurred");
      console.error("Error starting session:", error);
  };

  const endSession = async () => {
    if (!currentSessionId) return;

    try {
      setError(null);
      
      const response = await fetch("/api/readings/end", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: currentSessionId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSessionActive(false);
      } else {
        setError(data.error || "Failed to end session");
        console.error("Failed to end session:", data.error);
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error("Error ending session:", error);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto glass-card">
      {/* Header with session info and timer */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <div>
          <h3 className="font-alex-brush heading-glow text-lg">Video Session with {readerName}</h3>
          <p className="text-xs text-gray-400">
            ${(ratePerMinute / 100).toFixed(2)}/min
          </p>
        </div>

        {isSessionActive && sessionStartTime && (
          <ReadingTimer
            startTime={sessionStartTime}
            ratePerMinute={ratePerMinute}
          />
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-500/20 text-red-300 p-3 text-sm">
          {error}
        </div>
      )}

      {/* Video area */}
      <div className="flex-1 p-4">
        <div className="relative h-full w-full bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
          {isSessionActive ? (
            <>
              {!isVideoOff ? (
                // Mock video feed - in a real app, this would be a WebRTC video stream
                <div className="w-full h-full bg-gradient-to-b from-purple-900 to-pink-900 flex items-center justify-center">
                  <p className="text-white text-xl">Live Video Feed</p>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <p className="text-gray-400">Video Paused</p>
                </div>
              )}

              {/* Small self-view */}
              <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
                <p className="text-xs text-gray-400">Your Camera</p>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-alex-brush heading-glow mb-4">Connect with {readerName}</h3>
              <p className="text-gray-400 mb-6">Start a video session to receive guidance</p>
              <Button
                className="bg-pink-500 hover:bg-pink-600"
                onClick={startSession}
              >
                Start Video Session
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      {isSessionActive && (
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className={isMuted ? "bg-red-500/20" : ""}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={isVideoOff ? "bg-red-500/20" : ""}
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              {isVideoOff ? (
                <VideoOff className="h-5 w-5" />
              ) : (
                <Video className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={endSession}
            >
              <Phone className="h-5 w-5 rotate-135" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
