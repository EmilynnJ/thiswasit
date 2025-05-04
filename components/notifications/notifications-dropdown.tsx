"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Notification {
  id: string
  type: "message" | "reading" | "system" | "promotion"
  title: string
  description: string
  time: string
  read: boolean
  avatar?: string
  link?: string
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [open, setOpen] = useState(false)

  // Mock data for notifications
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "notif_1",
        type: "message",
        title: "New message from Mystic Luna",
        description: "Hello! I'm available for your reading now if you're ready.",
        time: "5 minutes ago",
        read: false,
        avatar: "/placeholder.svg?height=100&width=100",
        link: "/messages",
      },
      {
        id: "notif_2",
        type: "reading",
        title: "Reading reminder",
        description: "Your scheduled reading with Celestial Sage starts in 30 minutes.",
        time: "30 minutes ago",
        read: false,
        avatar: "/placeholder.svg?height=100&width=100",
        link: "/dashboard",
      },
      {
        id: "notif_3",
        type: "system",
        title: "Account balance low",
        description: "Your account balance is below $10. Add funds to continue enjoying readings.",
        time: "2 hours ago",
        read: true,
        link: "/payment",
      },
      {
        id: "notif_4",
        type: "promotion",
        title: "Special Offer",
        description: "Get 20% off your next reading with code COSMIC20.",
        time: "1 day ago",
        read: true,
        link: "/readings",
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((notif) => !notif.read).length)
  }, [])

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
    setUnreadCount(0)
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification,
      ),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return (
          <div className="h-8 w-8 rounded-full bg-blue-400/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
        )
      case "reading":
        return (
          <div className="h-8 w-8 rounded-full bg-green-400/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )
      case "system":
        return (
          <div className="h-8 w-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        )
      case "promotion":
        return (
          <div className="h-8 w-8 rounded-full bg-pink-400/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-pink-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-pink-400 text-xs flex items-center justify-center text-black">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 glass-card" align="end">
        <div className="flex items-center justify-between p-4">
          <DropdownMenuLabel className="font-normal">
            <span className="font-medium">Notifications</span>
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-4 cursor-pointer ${!notification.read ? "bg-gray-800/50" : ""}`}
                onClick={() => {
                  if (!notification.read) {
                    markAsRead(notification.id)
                  }
                  setOpen(false)
                }}
              >
                <div className="flex gap-3">
                  {notification.avatar ? (
                    <Avatar>
                      <AvatarImage src={notification.avatar} alt="" />
                      <AvatarFallback className="bg-pink-400/20 text-pink-400">
                        {notification.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    getNotificationIcon(notification.type)
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <span className="text-xs text-gray-400">{notification.time}</span>
                    </div>
                    <p className="text-xs text-gray-300 mt-1">{notification.description}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-gray-400">
              <p>No notifications</p>
            </div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-2 justify-center cursor-pointer">
          <span className="text-sm text-pink-400">View all notifications</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
