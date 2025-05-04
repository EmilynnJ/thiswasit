import { PageContainer } from "@/components/page-container"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, MessageSquare, Calendar, DollarSign, Star, Gift, Settings } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  // Mock notification data
  const notifications = [
    {
      id: "notif_1",
      type: "message",
      title: "New message from Mystic Luna",
      description: "Hello! I'm available for your reading now if you're ready.",
      time: "5 minutes ago",
      read: false,
      avatar: "/placeholder.svg?height=100&width=100",
      link: "/messages/chat/1",
    },
    {
      id: "notif_2",
      type: "appointment",
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
    {
      id: "notif_5",
      type: "review",
      title: "Reader left you feedback",
      description: "Mystic Luna has left feedback on your recent reading session.",
      time: "2 days ago",
      read: true,
      avatar: "/placeholder.svg?height=100&width=100",
      link: "/dashboard",
    },
    {
      id: "notif_6",
      type: "message",
      title: "New message from Aura Whisperer",
      description: "Thank you for your session! I've sent some follow-up resources for your journey.",
      time: "3 days ago",
      read: true,
      avatar: "/placeholder.svg?height=100&width=100",
      link: "/messages/chat/3",
    },
    {
      id: "notif_7",
      type: "system",
      title: "Password changed",
      description: "Your account password was successfully updated.",
      time: "5 days ago",
      read: true,
      link: "/profile",
    },
    {
      id: "notif_8",
      type: "promotion",
      title: "New Blog Article",
      description: "Check out our latest article: 'Understanding Tarot: Beyond Fortune Telling'",
      time: "1 week ago",
      read: true,
      link: "/blog/understanding-tarot-beyond-fortune-telling",
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return (
          <div className="h-8 w-8 rounded-full bg-blue-400/20 flex items-center justify-center">
            <MessageSquare className="h-4 w-4 text-blue-400" />
          </div>
        )
      case "appointment":
        return (
          <div className="h-8 w-8 rounded-full bg-green-400/20 flex items-center justify-center">
            <Calendar className="h-4 w-4 text-green-400" />
          </div>
        )
      case "system":
        return (
          <div className="h-8 w-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
            <Bell className="h-4 w-4 text-yellow-400" />
          </div>
        )
      case "promotion":
        return (
          <div className="h-8 w-8 rounded-full bg-pink-400/20 flex items-center justify-center">
            <Gift className="h-4 w-4 text-pink-400" />
          </div>
        )
      case "review":
        return (
          <div className="h-8 w-8 rounded-full bg-purple-400/20 flex items-center justify-center">
            <Star className="h-4 w-4 text-purple-400" />
          </div>
        )
      case "payment":
        return (
          <div className="h-8 w-8 rounded-full bg-emerald-400/20 flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
        )
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-400/20 flex items-center justify-center">
            <Bell className="h-4 w-4 text-gray-400" />
          </div>
        )
    }
  }

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-alex-brush heading-glow">Notifications</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10">
              Mark All as Read
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white" asChild>
              <Link href="/profile">
                <Settings className="h-4 w-4 mr-2" />
                Notification Settings
              </Link>
            </Button>
          </div>
        </div>

        <Card className="glass-card">
          <Tabs defaultValue="all" className="w-full">
            <CardHeader className="pb-0">
              <TabsList className="bg-gray-800/70 w-full">
                <TabsTrigger
                  value="all"
                  className="flex-1 data-[state=active]:bg-pink-400 data-[state=active]:text-black"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="flex-1 data-[state=active]:bg-pink-400 data-[state=active]:text-black"
                >
                  Unread
                </TabsTrigger>
                <TabsTrigger
                  value="messages"
                  className="flex-1 data-[state=active]:bg-pink-400 data-[state=active]:text-black"
                >
                  Messages
                </TabsTrigger>
                <TabsTrigger
                  value="system"
                  className="flex-1 data-[state=active]:bg-pink-400 data-[state=active]:text-black"
                >
                  System
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="pt-6">
              <TabsContent value="all" className="mt-0">
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <Link
                      key={notification.id}
                      href={notification.link}
                      className={`block p-4 rounded-lg ${notification.read ? "bg-gray-800/30" : "bg-gray-800/50 border-l-4 border-pink-400"} hover:bg-gray-800/70 transition-colors`}
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
                            <h3 className="font-medium font-playfair">{notification.title}</h3>
                            <span className="text-xs text-gray-400 font-playfair">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-300 mt-1 font-playfair">{notification.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="unread" className="mt-0">
                <div className="space-y-4">
                  {notifications
                    .filter((n) => !n.read)
                    .map((notification) => (
                      <Link
                        key={notification.id}
                        href={notification.link}
                        className="block p-4 rounded-lg bg-gray-800/50 border-l-4 border-pink-400 hover:bg-gray-800/70 transition-colors"
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
                              <h3 className="font-medium font-playfair">{notification.title}</h3>
                              <span className="text-xs text-gray-400 font-playfair">{notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-300 mt-1 font-playfair">{notification.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}

                  {notifications.filter((n) => !n.read).length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-4">
                        <Bell className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-alex-brush mb-2 heading-glow">All Caught Up!</h3>
                      <p className="text-gray-400 font-playfair">You have no unread notifications.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="messages" className="mt-0">
                <div className="space-y-4">
                  {notifications
                    .filter((n) => n.type === "message")
                    .map((notification) => (
                      <Link
                        key={notification.id}
                        href={notification.link}
                        className={`block p-4 rounded-lg ${notification.read ? "bg-gray-800/30" : "bg-gray-800/50 border-l-4 border-pink-400"} hover:bg-gray-800/70 transition-colors`}
                      >
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarImage src={notification.avatar} alt="" />
                            <AvatarFallback className="bg-pink-400/20 text-pink-400">
                              {notification.title.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium font-playfair">{notification.title}</h3>
                              <span className="text-xs text-gray-400 font-playfair">{notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-300 mt-1 font-playfair">{notification.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}

                  {notifications.filter((n) => n.type === "message").length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-alex-brush mb-2 heading-glow">No Messages</h3>
                      <p className="text-gray-400 font-playfair">You have no message notifications.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="system" className="mt-0">
                <div className="space-y-4">
                  {notifications
                    .filter(
                      (n) =>
                        n.type === "system" ||
                        n.type === "promotion" ||
                        n.type === "appointment" ||
                        n.type === "review",
                    )
                    .map((notification) => (
                      <Link
                        key={notification.id}
                        href={notification.link}
                        className={`block p-4 rounded-lg ${notification.read ? "bg-gray-800/30" : "bg-gray-800/50 border-l-4 border-pink-400"} hover:bg-gray-800/70 transition-colors`}
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
                              <h3 className="font-medium font-playfair">{notification.title}</h3>
                              <span className="text-xs text-gray-400 font-playfair">{notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-300 mt-1 font-playfair">{notification.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}

                  {notifications.filter(
                    (n) =>
                      n.type === "system" || n.type === "promotion" || n.type === "appointment" || n.type === "review",
                  ).length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-4">
                        <Bell className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-alex-brush mb-2 heading-glow">No System Notifications</h3>
                      <p className="text-gray-400 font-playfair">You have no system notifications.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4 font-playfair">Want to customize which notifications you receive?</p>
          <Button className="bg-pink-400 hover:bg-pink-500 text-black" asChild>
            <Link href="/profile">Manage Notification Settings</Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}
