"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface ReadingTimerProps {
  startTime: Date
  ratePerMinute: number
}

export function ReadingTimer({ startTime, ratePerMinute }: ReadingTimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [cost, setCost] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000)
      setElapsedTime(elapsed)

      // Calculate cost (rate per minute converted to per second)
      const costPerSecond = ratePerMinute / 60
      setCost(elapsed * costPerSecond)
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime, ratePerMinute])

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex items-center space-x-4 bg-gray-800/50 rounded-lg p-2">
      <div className="flex items-center">
        <Clock className="h-4 w-4 text-pink-400 mr-1" />
        <span className="text-sm font-mono">{formatTime(elapsedTime)}</span>
      </div>
      <div className="text-sm font-mono text-pink-400">${(cost / 100).toFixed(2)}</div>
    </div>
  )
}
