"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, DollarSign } from "lucide-react"

interface ReadingRequestCardProps {
  request: any
  onStatusChange: () => void
}

export function ReadingRequestCard({ request, onStatusChange }: ReadingRequestCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAccept = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/reader/requests/${request.id}/accept`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to accept request")
      }

      toast({
        title: "Request Accepted",
        description: "The reading request has been accepted successfully.",
      })

      onStatusChange()
    } catch (error) {
      console.error("Error accepting request:", error)
      toast({
        title: "Error",
        description: "Failed to accept the request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDecline = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/reader/requests/${request.id}/decline`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to decline request")
      }

      toast({
        title: "Request Declined",
        description: "The reading request has been declined.",
      })

      onStatusChange()
    } catch (error) {
      console.error("Error declining request:", error)
      toast({
        title: "Error",
        description: "Failed to decline the request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700/50">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={request.clientImage || "/placeholder.svg?height=40&width=40&query=person"}
              alt={request.clientName}
            />
            <AvatarFallback className="bg-pink-400/20 text-pink-400">{request.clientName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-medium">{request.clientName}</h4>
            <p className="text-sm text-gray-400">{request.serviceName}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {request.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {request.time}
              </div>
              <div className="flex items-center">
                <DollarSign className="h-3 w-3 mr-1" />${request.amount.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-pink-400 hover:bg-pink-500 text-black"
              onClick={handleAccept}
              disabled={isLoading}
            >
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-700"
              onClick={handleDecline}
              disabled={isLoading}
            >
              Decline
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
