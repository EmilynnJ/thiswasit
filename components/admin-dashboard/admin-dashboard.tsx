"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, ChevronRight, ShieldAlert, AlertTriangle, CreditCard } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"

interface AdminDashboardProps {
  initialData?: any
}

export function AdminDashboard({ initialData }: AdminDashboardProps) {
  const [isLoading, setIsLoading] = useState(!initialData)
  const [dashboardData, setDashboardData] = useState(
    initialData || {
      userStats: {
        totalUsers: 0,
        clientCount: 0,
        readerCount: 0,
        adminCount: 0,
        newUsersLastWeek: 0,
      },
      transactionStats: {
        totalTransactions: 0,
        totalAmount: 0,
        depositCount: 0,
        depositAmount: 0,
        paymentCount: 0,
        paymentAmount: 0,
        transactionsLastWeek: 0,
        amountLastWeek: 0,
      },
      bookingStats: {
        totalBookings: 0,
        pendingCount: 0,
        confirmedCount: 0,
        completedCount: 0,
        cancelledCount: 0,
        bookingsLastWeek: 0,
      },
      earningStats: {
        totalEarnings: 0,
        totalAmount: 0,
        totalPlatformFee: 0,
        totalNetAmount: 0,
        pendingCount: 0,
        pendingAmount: 0,
        paidCount: 0,
        paidAmount: 0,
        earningsLastWeek: 0,
        amountLastWeek: 0,
      },
      moderationStats: {
        pendingReports: 0,
        openDisputes: 0,
      },
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
      const response = await fetch("/api/admin/stats")

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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
            <Users className="h-4 w-4 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.userStats.totalUsers}</div>
            <p className="text-xs text-gray-400 mt-1">+{dashboardData.userStats.newUsersLastWeek} this week</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.transactionStats.totalAmount.toFixed(2)}</div>
            <p className="text-xs text-gray-400 mt-1">
              ${dashboardData.transactionStats.amountLastWeek.toFixed(2)} this week
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Platform Fees</CardTitle>
            <CreditCard className="h-4 w-4 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.earningStats.totalPlatformFee.toFixed(2)}</div>
            <p className="text-xs text-gray-400 mt-1">From {dashboardData.bookingStats.totalBookings} bookings</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Pending Moderation</CardTitle>
            <ShieldAlert className="h-4 w-4 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.moderationStats.pendingReports}</div>
            <p className="text-xs text-gray-400 mt-1">{dashboardData.moderationStats.openDisputes} open disputes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>User Statistics</CardTitle>
              <Link href="/admin-dashboard/users">
                <Button variant="ghost" size="sm" className="text-pink-400 hover:text-pink-300 hover:bg-pink-400/10">
                  Manage Users <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-pink-400 mr-2"></div>
                  <span>Clients</span>
                </div>
                <span className="font-medium">{dashboardData.userStats.clientCount}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                  <span>Readers</span>
                </div>
                <span className="font-medium">{dashboardData.userStats.readerCount}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                  <span>Admins</span>
                </div>
                <span className="font-medium">{dashboardData.userStats.adminCount}</span>
              </div>

              <div className="pt-4 border-t border-gray-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">New users (last 7 days)</span>
                  <span className="font-medium">{dashboardData.userStats.newUsersLastWeek}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Booking Statistics</CardTitle>
              <Link href="/admin-dashboard/bookings">
                <Button variant="ghost" size="sm" className="text-pink-400 hover:text-pink-300 hover:bg-pink-400/10">
                  View Bookings <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <span>Pending</span>
                </div>
                <span className="font-medium">{dashboardData.bookingStats.pendingCount}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <span>Confirmed</span>
                </div>
                <span className="font-medium">{dashboardData.bookingStats.confirmedCount}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                  <span>Completed</span>
                </div>
                <span className="font-medium">{dashboardData.bookingStats.completedCount}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <span>Cancelled</span>
                </div>
                <span className="font-medium">{dashboardData.bookingStats.cancelledCount}</span>
              </div>

              <div className="pt-4 border-t border-gray-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">New bookings (last 7 days)</span>
                  <span className="font-medium">{dashboardData.bookingStats.bookingsLastWeek}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Transaction Statistics</CardTitle>
              <Link href="/admin-dashboard/transactions">
                <Button variant="ghost" size="sm" className="text-pink-400 hover:text-pink-300 hover:bg-pink-400/10">
                  View Transactions <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Deposits</p>
                  <p className="text-lg font-bold">${dashboardData.transactionStats.depositAmount.toFixed(2)}</p>
                </div>
                <span className="text-sm text-gray-400">
                  {dashboardData.transactionStats.depositCount} transactions
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Payments</p>
                  <p className="text-lg font-bold">${dashboardData.transactionStats.paymentAmount.toFixed(2)}</p>
                </div>
                <span className="text-sm text-gray-400">
                  {dashboardData.transactionStats.paymentCount} transactions
                </span>
              </div>

              <div className="pt-4 border-t border-gray-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Last 7 days</span>
                  <span className="font-medium">${dashboardData.transactionStats.amountLastWeek.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Reader Earnings</CardTitle>
              <Link href="/admin-dashboard/earnings">
                <Button variant="ghost" size="sm" className="text-pink-400 hover:text-pink-300 hover:bg-pink-400/10">
                  Manage Payouts <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Pending Payouts</p>
                  <p className="text-lg font-bold">${dashboardData.earningStats.pendingAmount.toFixed(2)}</p>
                </div>
                <span className="text-sm text-gray-400">{dashboardData.earningStats.pendingCount} readers</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Paid Out</p>
                  <p className="text-lg font-bold">${dashboardData.earningStats.paidAmount.toFixed(2)}</p>
                </div>
                <span className="text-sm text-gray-400">{dashboardData.earningStats.paidCount} payments</span>
              </div>

              <div className="pt-4 border-t border-gray-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Platform fees collected</span>
                  <span className="font-medium">${dashboardData.earningStats.totalPlatformFee.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Moderation Queue</CardTitle>
              <div className="flex space-x-2">
                <Link href="/admin-dashboard/moderation">
                  <Button variant="ghost" size="sm" className="text-pink-400 hover:text-pink-300 hover:bg-pink-400/10">
                    Content Reports <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/admin-dashboard/disputes">
                  <Button variant="ghost" size="sm" className="text-pink-400 hover:text-pink-300 hover:bg-pink-400/10">
                    Disputes <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center">
                  <ShieldAlert className="h-8 w-8 text-pink-400 mr-3" />
                  <div>
                    <h3 className="font-medium">Content Reports</h3>
                    <p className="text-sm text-gray-400">Pending moderation</p>
                  </div>
                </div>
                <div className="text-2xl font-bold">{dashboardData.moderationStats.pendingReports}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-pink-400 mr-3" />
                  <div>
                    <h3 className="font-medium">Open Disputes</h3>
                    <p className="text-sm text-gray-400">Requiring resolution</p>
                  </div>
                </div>
                <div className="text-2xl font-bold">{dashboardData.moderationStats.openDisputes}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
