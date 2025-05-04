"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, Clock, Star, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { ReadingRequestCard } from "./reading-request-card"
import { UpcomingSessionCard } from "./upcoming-session-card"
import { RevenueChart } from "./revenue-chart"

interface ReaderDashboardProps {
  initialData?: any
}

export function ReaderDashboard({ initialData }: ReaderDashboardProps) {
  const [isLoading, setIsLoading] = useState(!initialData)
  const [dashboardData, setDashboardData] = useState(
    initialData || {
      earnings: {
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        total: 0,
      },
      stats: {
        totalSessions: 0,
        totalClients: 0,
        totalHours: 0,
        rating: 0,
        reviewCount: 0,
      },
      pendingRequests: [],
      upcomingSessions: [],
      revenueData: [],
    },
  )
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    if (!initialData) {
      fetchDashboardData()
    }
  }, [initialData])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/reader/dashboard")

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

  const formatHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Today's Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.earnings.today.toFixed(2)}</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span className={dashboardData.earnings.todayChange >= 0 ? "text-green-400" : "text-red-400"}>
                {dashboardData.earnings.todayChange >= 0 ? "+" : ""}
                {dashboardData.earnings.todayChange}%
              </span>
              <span className="ml-1">vs. yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Sessions</CardTitle>
            <Users className="h-4 w-4 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.totalSessions}</div>
            <p className="text-xs text-gray-400 mt-1">{dashboardData.stats.totalClients} unique clients</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatHours(dashboardData.stats.totalHours)}</div>
            <p className="text-xs text-gray-400 mt-1">
              Avg. session: {dashboardData.stats.avgSessionTime || "0"} minutes
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Rating</CardTitle>
            <Star className="h-4 w-4 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.rating.toFixed(1)}</div>
            <p className="text-xs text-gray-400 mt-1">{dashboardData.stats.reviewCount} reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <RevenueChart data={dashboardData.revenueData} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle>Earnings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">This Week</p>
                  <p className="text-xl font-bold">${dashboardData.earnings.thisWeek.toFixed(2)}</p>
                </div>
                <div
                  className={`text-sm ${dashboardData.earnings.weekChange >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {dashboardData.earnings.weekChange >= 0 ? "+" : ""}
                  {dashboardData.earnings.weekChange}%
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">This Month</p>
                  <p className="text-xl font-bold">${dashboardData.earnings.thisMonth.toFixed(2)}</p>
                </div>
                <div
                  className={`text-sm ${dashboardData.earnings.monthChange >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {dashboardData.earnings.monthChange >= 0 ? "+" : ""}
                  {dashboardData.earnings.monthChange}%
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Total Earnings</p>
                  <p className="text-xl font-bold">${dashboardData.earnings.total.toFixed(2)}</p>
                </div>
                <Link href="/reader-dashboard/earnings">
                  <Button variant="ghost" size="sm" className="text-pink-400 hover:text-pink-300 hover:bg-pink-400/10">
                    Details <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Reading Requests</CardTitle>
              <Link href="/reader-dashboard/requests">
                <Button variant="ghost" size="sm" className="text-pink-400 hover:text-pink-300 hover:bg-pink-400/10">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {dashboardData.pendingRequests && dashboardData.pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.pendingRequests.slice(0, 3).map((request: any) => (
                  <ReadingRequestCard key={request.id} request={request} onStatusChange={fetchDashboardData} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-400">No pending reading requests</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Upcoming Sessions</CardTitle>
              <Link href="/reader-dashboard/schedule">
                <Button variant="ghost" size="sm" className="text-pink-400 hover:text-pink-300 hover:bg-pink-400/10">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {dashboardData.upcomingSessions && dashboardData.upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.upcomingSessions.slice(0, 3).map((session: any) => (
                  <UpcomingSessionCard key={session.id} session={session} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-400">No upcoming sessions</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
