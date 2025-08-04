"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, Clock, Calendar, Star } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/nextjs"

interface ClientDashboardProps {
  initialData?: any
}

export function ClientDashboard({ initialData }: ClientDashboardProps) {
  const [isLoading, setIsLoading] = useState(!initialData)
  const [dashboardData, setDashboardData] = useState(
    initialData || {
      balance: 0,
      totalReadings: 0,
      readingTime: 0,
      upcomingReadings: 0,
      recentReadings: [],
      favoriteReaders: [],
    },
  )
  const { toast } = useToast()
  const { user } = useUser()

  useEffect(() => {
    if (!initialData && user) {
      fetchDashboardData()
    }
  }, [initialData, user])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/client/dashboard")

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data")
      }

      const data = await response.json()
      setDashboardData(data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatReadingTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Account Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.balance.toFixed(2)}</div>
            <p className="text-xs text-gray-400 mt-1">Last added: {dashboardData.lastDepositDate || "N/A"}</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Readings</CardTitle>
            <Users className="h-4 w-4 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalReadings}</div>
            <p className="text-xs text-gray-400 mt-1">Last reading: {dashboardData.lastReadingDate || "N/A"}</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Reading Time</CardTitle>
            <Clock className="h-4 w-4 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatReadingTime(dashboardData.readingTime)}</div>
            <p className="text-xs text-gray-400 mt-1">Avg. session: {dashboardData.avgSessionTime || "0"} minutes</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.upcomingReadings}</div>
            <p className="text-xs text-gray-400 mt-1">
              Next: {dashboardData.nextReadingDate ? dashboardData.nextReadingDate : "None scheduled"}
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-playfair mb-4">Recent Readings</h2>
      <div className="glass-card rounded-lg overflow-hidden mb-8">
        {dashboardData.recentReadings && dashboardData.recentReadings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Reader</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Duration</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Amount</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentReadings.map((reading: any) => (
                  <tr key={reading.id} className="border-b border-gray-700/50">
                    <td className="px-4 py-3 text-sm">{reading.readerName}</td>
                    <td className="px-4 py-3 text-sm">{reading.date}</td>
                    <td className="px-4 py-3 text-sm">{reading.type}</td>
                    <td className="px-4 py-3 text-sm">{reading.duration} min</td>
                    <td className="px-4 py-3 text-sm">${reading.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/reading/${reading.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-pink-400 hover:text-pink-300 hover:bg-pink-400/10"
                        >
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-300 mb-4">You haven't had any readings yet.</p>
            <Link href="/readers">
              <Button className="bg-pink-400 hover:bg-pink-500 text-black">Find a Reader</Button>
            </Link>
          </div>
        )}
      </div>

      <h2 className="text-xl font-playfair mb-4">Favorite Readers</h2>
      {dashboardData.favoriteReaders && dashboardData.favoriteReaders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData.favoriteReaders.map((reader: any) => (
            <Card key={reader.id} className="glass-card overflow-hidden">
              <div className="flex items-center p-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                  <img
                    src={reader.profileImage || "/placeholder.svg?height=64&width=64&query=mystical+person"}
                    alt={reader.name}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{reader.name}</h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                    <span>
                      {reader.rating.toFixed(1)} ({reader.reviewCount} reviews)
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{reader.specialty}</p>
                </div>
                <Link href={`/readers/${reader.id}`}>
                  <Button size="sm" className="bg-pink-400 hover:bg-pink-500 text-black">
                    Book
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="glass-card p-6 text-center">
          <p className="text-gray-300 mb-4">You haven't added any readers to your favorites yet.</p>
          <Link href="/readers">
            <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10">
              Browse Readers
            </Button>
          </Link>
        </div>
      )}

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl font-playfair">My Reading Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-400 mb-4">
            A private space to jot down thoughts, questions, and insights from your readings.
          </p>
          <textarea
            className="w-full h-40 p-4 rounded-md bg-black/30 border border-gray-700 focus:ring-pink-400 focus:border-pink-400 font-playfair"
            placeholder="Start typing your notes here..."
          />
          <Button className="mt-4 bg-pink-500 hover:bg-pink-600 w-full sm:w-auto">Save Notes</Button>
        </CardContent>
      </Card>
    </div>
  )
}
