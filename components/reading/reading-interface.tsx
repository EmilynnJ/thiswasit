"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Phone, Video, Clock, Star, Mic, ImageIcon, Smile, PauseCircle, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Message {
  id: number
  sender: "user" | "reader"
  text: string
  timestamp: Date
}

interface ReadingInterfaceProps {
  readerId: string
  readerName: string
  readerAvatar: string
  readerSpecialty: string
  readerRating: number
  readerPrice: number
}

export function ReadingInterface({
  readerId,
  readerName,
  readerAvatar,
  readerSpecialty,
  readerRating,
  readerPrice,
}: ReadingInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "reader",
      text: `Hello! I'm ${readerName}. How can I help you with your spiritual journey today?`,
      timestamp: new Date(Date.now() - 120000),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [elapsedTime, setElapsedTime] = useState(0)
  const [cost, setCost] = useState(0)
  const [isActive, setIsActive] = useState(true)
  const [showPauseDialog, setShowPauseDialog] = useState(false)
  const [showEndDialog, setShowEndDialog] = useState(false)
  const [remainingBalance, setRemainingBalance] = useState(45.0)
  const [showLowBalanceWarning, setShowLowBalanceWarning] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isActive) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
        const minuteCost = readerPrice / 60
        setCost((prev) => prev + minuteCost)
        setRemainingBalance((prev) => prev - minuteCost)

        // Check if balance is getting low
        if (remainingBalance < readerPrice && !showLowBalanceWarning) {
          setShowLowBalanceWarning(true)
        }

        // Auto-pause if balance is too low
        if (remainingBalance <= 0) {
          setIsActive(false)
          setShowPauseDialog(true)
        }
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isActive, readerPrice, remainingBalance, showLowBalanceWarning])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !isActive) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    }
    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate reader response after a delay
    setTimeout(() => {
      const readerResponses = [
        "I sense a strong energy around you. Let me explore this further...",
        "The cards are showing a significant transition in your life. Would you like me to elaborate?",
        "Your aura has a unique pattern. Have you been experiencing any unusual dreams lately?",
        "I'm seeing a connection to someone from your past. Does this resonate with you?",
        "The spiritual guides are very present in this reading. They have an important message.",
      ]

      const randomResponse = readerResponses[Math.floor(Math.random() * readerResponses.length)]

      const readerMessage: Message = {
        id: messages.length + 2,
        sender: "reader",
        text: randomResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, readerMessage])
    }, 3000)
  }

  const handlePauseReading = () => {
    setIsActive(false)
    setShowPauseDialog(true)
  }

  const handleResumeReading = () => {
    setIsActive(true)
    setShowPauseDialog(false)
  }

  const handleEndReading = () => {
    setShowEndDialog(true)
  }

  const confirmEndReading = () => {
    setIsActive(false)
    // Here you would typically redirect to a summary/rating page
    // For now, we'll just close the dialog
    setShowEndDialog(false)
  }

  const handleAddFunds = () => {
    // Simulate adding funds
    setRemainingBalance((prev) => prev + 20)
    setShowLowBalanceWarning(false)

    if (!isActive) {
      setIsActive(true)
      setShowPauseDialog(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] min-h-[500px] glass-card rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={readerAvatar} alt={readerName} />
              <AvatarFallback className="bg-pink-400/20 text-pink-400">{readerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-medium">{readerName}</h1>
              <div className="flex items-center text-sm text-gray-400">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                <span>{readerRating}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                    onClick={handlePauseReading}
                  >
                    <PauseCircle className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pause Reading</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                    <Phone className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Switch to Voice Call</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                    <Video className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Switch to Video Call</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Session Info */}
      <div className="bg-gray-800/70 backdrop-blur-sm p-2">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-pink-400" />
            <span>{formatTime(elapsedTime)}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-medium text-pink-400">${cost.toFixed(2)}</div>
            <div className={`font-medium ${remainingBalance < readerPrice ? "text-red-400" : "text-green-400"}`}>
              Balance: ${remainingBalance.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Low Balance Warning */}
      {showLowBalanceWarning && (
        <div className="bg-red-400/10 border-b border-red-400/30 p-2 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4" />
            <span>
              Your balance is running low.{" "}
              <button onClick={handleAddFunds} className="underline">
                Add funds
              </button>{" "}
              to continue the reading.
            </span>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 container mx-auto">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              {message.sender === "reader" && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarImage src={readerAvatar} alt={readerName} />
                  <AvatarFallback className="bg-pink-400/20 text-pink-400">{readerName.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] md:max-w-[60%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-pink-400 text-black"
                    : "bg-gray-800/70 backdrop-blur-sm border border-gray-700/50"
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs mt-1 opacity-70 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 p-4 sticky bottom-0">
        <div className="container mx-auto">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <div className="flex-1 flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white hover:bg-gray-800"
                      disabled={!isActive}
                    >
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send Image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Input
                type="text"
                placeholder={isActive ? "Type your message..." : "Reading paused..."}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="bg-gray-800/50 border-gray-700/50 text-white"
                disabled={!isActive}
              />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white hover:bg-gray-800"
                      disabled={!isActive}
                    >
                      <Mic className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Voice Message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white hover:bg-gray-800"
                      disabled={!isActive}
                    >
                      <Smile className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Emoji</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Button
              type="submit"
              className="bg-pink-400 hover:bg-pink-500 text-black"
              disabled={!isActive || !newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              className="border-red-400 text-red-400 hover:bg-red-400/10"
              onClick={handleEndReading}
            >
              End Reading
            </Button>
          </div>
        </div>
      </div>

      {/* Pause Dialog */}
      <Dialog open={showPauseDialog} onOpenChange={setShowPauseDialog}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle>Reading Paused</DialogTitle>
            <DialogDescription>
              {remainingBalance <= 0
                ? "Your balance has been depleted. Add funds to continue the reading."
                : "Your reading has been paused. You won't be charged while paused."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Time elapsed:</span>
              <span className="font-medium">{formatTime(elapsedTime)}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Current cost:</span>
              <span className="font-medium text-pink-400">${cost.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Remaining balance:</span>
              <span className={`font-medium ${remainingBalance <= 0 ? "text-red-400" : "text-green-400"}`}>
                ${remainingBalance.toFixed(2)}
              </span>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            {remainingBalance <= 0 ? (
              <Button className="w-full bg-pink-400 hover:bg-pink-500 text-black" onClick={handleAddFunds}>
                Add $20.00
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-700/50 text-gray-300 hover:bg-gray-800/50"
                  onClick={() => {
                    setShowPauseDialog(false)
                    setShowEndDialog(true)
                  }}
                >
                  End Reading
                </Button>
                <Button className="flex-1 bg-pink-400 hover:bg-pink-500 text-black" onClick={handleResumeReading}>
                  Resume Reading
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* End Reading Dialog */}
      <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle>End Reading</DialogTitle>
            <DialogDescription>
              Are you sure you want to end this reading? This will complete your session with {readerName}.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Time elapsed:</span>
              <span className="font-medium">{formatTime(elapsedTime)}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Total cost:</span>
              <span className="font-medium text-pink-400">${cost.toFixed(2)}</span>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1 border-gray-700/50 text-gray-300 hover:bg-gray-800/50"
              onClick={() => setShowEndDialog(false)}
            >
              Cancel
            </Button>
            <Button className="flex-1 bg-pink-400 hover:bg-pink-500 text-black" onClick={confirmEndReading}>
              End Reading
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
