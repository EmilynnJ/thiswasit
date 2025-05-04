"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Phone, Video, ImageIcon, Smile, PaperclipIcon, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Message {
  id: number
  sender: "user" | "reader"
  text: string
  timestamp: Date
  isRead: boolean
}

export default function ChatPage({ params }: { params: { id: string } }) {
  // Mock reader data
  const reader = {
    id: params.id,
    name: "Mystic Luna",
    avatar: "/placeholder.svg?height=100&width=100",
    specialty: "Tarot & Astrology",
    isOnline: true,
    lastActive: "Just now",
  }

  // Mock chat history
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "reader",
      text: "Hello! I'm Mystic Luna. How can I help you with your spiritual journey today?",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: true,
    },
    {
      id: 2,
      sender: "user",
      text: "Hi Luna, I've been feeling a bit lost lately and would like some guidance about my career path.",
      timestamp: new Date(Date.now() - 3540000), // 59 minutes ago
      isRead: true,
    },
    {
      id: 3,
      sender: "reader",
      text: "I understand. Career transitions can be challenging. Would you like me to do a tarot spread specifically focused on your career energies?",
      timestamp: new Date(Date.now() - 3480000), // 58 minutes ago
      isRead: true,
    },
    {
      id: 4,
      sender: "user",
      text: "Yes, that would be great. I'm particularly concerned about whether I should stay in my current job or look for new opportunities.",
      timestamp: new Date(Date.now() - 3420000), // 57 minutes ago
      isRead: true,
    },
    {
      id: 5,
      sender: "reader",
      text: "I'll prepare a career crossroads spread for you. This will help illuminate your current situation, potential challenges, and possible outcomes of different paths. Give me a moment to connect with the cards.",
      timestamp: new Date(Date.now() - 3360000), // 56 minutes ago
      isRead: true,
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
      isRead: false,
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate reader response after a delay
    setTimeout(() => {
      const readerResponses = [
        "I'm sensing a strong energy of transformation around you. The cards suggest that while your current path has served its purpose, there may be new opportunities aligning with your true calling.",
        "The cards are showing me that you have untapped potential that isn't being fully utilized in your current position. There's a sense of creative stagnation.",
        "Interesting... I'm seeing the Tower card, which often indicates unexpected change. This doesn't necessarily mean you should leave your job, but it suggests that transformation is coming either way.",
        "I'm drawing the Six of Swords, which represents transition and moving away from turbulent waters toward calmer shores. This often appears when it's time for a change that will ultimately bring peace.",
        "The cards are revealing that your hesitation stems from fear rather than intuition. Sometimes the universe pushes us out of our comfort zone for our highest good.",
      ]

      const randomResponse = readerResponses[Math.floor(Math.random() * readerResponses.length)]

      const readerMessage: Message = {
        id: messages.length + 2,
        sender: "reader",
        text: randomResponse,
        timestamp: new Date(),
        isRead: true,
      }

      setMessages((prev) => [...prev, readerMessage])
    }, 3000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <PageContainer className="py-4">
      <div className="flex flex-col h-[calc(100vh-200px)] min-h-[500px] glass-card rounded-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={reader.avatar} alt={reader.name} />
                <AvatarFallback className="bg-pink-400/20 text-pink-400">{reader.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-alex-brush heading-glow text-xl">{reader.name}</h1>
                <div className="flex items-center text-xs">
                  {reader.isOnline ? (
                    <span className="text-green-400">● Online</span>
                  ) : (
                    <span className="text-gray-400">Last active: {reader.lastActive}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Video className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Book a Reading</DropdownMenuItem>
                  <DropdownMenuItem>Clear Chat History</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-400">Block Reader</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              {message.sender === "reader" && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarImage src={reader.avatar} alt={reader.name} />
                  <AvatarFallback className="bg-pink-400/20 text-pink-400">{reader.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.sender === "user" ? "bg-pink-400 text-black" : "bg-gray-800/70 border border-gray-700/50"
                }`}
              >
                <p className="font-playfair">{message.text}</p>
                <p className="text-xs mt-1 opacity-70 text-right">{formatTime(message.timestamp)}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <PaperclipIcon className="h-5 w-5" />
            </Button>
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-gray-800/50 border-gray-700/50 text-white font-playfair"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Smile className="h-5 w-5" />
            </Button>
            <Button type="submit" className="bg-pink-400 hover:bg-pink-500 text-black" disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </PageContainer>
  )
}
