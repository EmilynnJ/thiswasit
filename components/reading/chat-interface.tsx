"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Send, Paperclip, ImageIcon } from "lucide-react"
import { ReadingTimer } from "./reading-timer"

interface Message {
  id: string
  sender: "client" | "reader"
  text: string
  timestamp: Date
}

interface ChatInterfaceProps {
  readerId: number
  readerName: string
  readerAvatar: string
  clientId: number
  clientName: string
  clientAvatar: string
  sessionId?: number
  ratePerMinute: number
}

export function ChatInterface({
  readerId,
  readerName,
  readerAvatar,
  clientId,
  clientName,
  clientAvatar,
  sessionId,
  ratePerMinute,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [currentSessionId, setCurrentSessionId] = useState<number | undefined>(sessionId)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate receiving messages from the reader
  useEffect(() => {
    if (isSessionActive) {
      const timer = setTimeout(() => {
        const readerResponses = [
          "I'm sensing a strong energy around you right now.",
          "The cards are showing a significant change coming in your life.",
          "Your aura has a beautiful vibrant color today.",
          "I see a new opportunity on the horizon for you.",
          "There's someone from your past who is thinking about you.",
        ]

        const randomResponse = readerResponses[Math.floor(Math.random() * readerResponses.length)]

        addMessage("reader", randomResponse)
      }, 10000) // Reader responds after 10 seconds

      return () => clearTimeout(timer)
    }
  }, [messages, isSessionActive])

  const addMessage = (sender: "client" | "reader", text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    addMessage("client", inputValue)
    setInputValue("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

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
          type: "chat",
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSessionActive(true)
        setSessionStartTime(new Date())
        setCurrentSessionId(data.session.id)

        // Add welcome message
        addMessage("reader", `Hello ${clientName}, thank you for connecting with me. How can I help you today?`)
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

        // Add end message
        addMessage(
          "reader",
          `Thank you for your time today. Your session has ended. The total cost was $${(
            data.session.total_cost / 100
          ).toFixed(2)}.`,
        )
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
      {/* Header with reader info and timer */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <img src={readerAvatar || "/placeholder.svg"} alt={readerName} />
          </Avatar>
          <div>
            <h3 className="font-alex-brush heading-glow text-lg">{readerName}</h3>
            <p className="text-xs text-gray-400">${(ratePerMinute / 100).toFixed(2)}/min</p>
          </div>
        </div>

        <div className="flex items-center">
          {isSessionActive ? (
            <>
              <ReadingTimer startTime={sessionStartTime!} ratePerMinute={ratePerMinute} />
              <Button variant="destructive" size="sm" className="ml-3" onClick={endSession}>
                End Session
              </Button>
            </>
          ) : (
            <Button className="bg-pink-500 hover:bg-pink-600" onClick={startSession}>
              Start Session
            </Button>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && <div className="bg-red-500/20 text-red-300 p-3 text-sm">{error}</div>}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "client" ? "justify-end" : "justify-start"}`}>
            {message.sender === "reader" && (
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <img src={readerAvatar || "/placeholder.svg"} alt={readerName} />
              </Avatar>
            )}

            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === "client" ? "bg-pink-500 text-white" : "glass-card"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs text-gray-300 mt-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {message.sender === "client" && (
              <Avatar className="h-8 w-8 ml-2 mt-1">
                <img src={clientAvatar || "/placeholder.svg"} alt={clientName} />
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="text-gray-400">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={!isSessionActive}
            className="flex-1 mx-2 bg-gray-800 border-gray-700"
          />
          <Button
            size="icon"
            className="bg-pink-500 hover:bg-pink-600"
            onClick={handleSendMessage}
            disabled={!isSessionActive}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
