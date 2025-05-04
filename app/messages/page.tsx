import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, MessageCircle, Phone, Video } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function MessagesPage() {
  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: "Mystic Luna",
      avatar: "/placeholder.svg?height=100&width=100",
      lastMessage:
        "I'm sensing a strong energy of transformation around you. The cards suggest that while your current path has served its purpose, there may be new opportunities aligning with your true calling.",
      time: "2:34 PM",
      unread: 0,
      online: true,
      type: "chat",
    },
    {
      id: 2,
      name: "Celestial Sage",
      avatar: "/placeholder.svg?height=100&width=100",
      lastMessage: "I'll be available for your next session tomorrow at 3 PM.",
      time: "Yesterday",
      unread: 2,
      online: false,
      type: "call",
    },
    {
      id: 3,
      name: "Aura Whisperer",
      avatar: "/placeholder.svg?height=100&width=100",
      lastMessage: "Let me know if you have any questions about the reading.",
      time: "Mar 14",
      unread: 0,
      online: true,
      type: "video",
    },
    {
      id: 4,
      name: "Cosmic Guide",
      avatar: "/placeholder.svg?height=100&width=100",
      lastMessage: "The energy I'm sensing from your aura suggests a period of spiritual growth is approaching.",
      time: "Mar 10",
      unread: 0,
      online: false,
      type: "chat",
    },
    {
      id: 5,
      name: "Ethereal Empath",
      avatar: "/placeholder.svg?height=100&width=100",
      lastMessage: "I've prepared some crystal recommendations based on our session. Would you like me to send them?",
      time: "Mar 5",
      unread: 0,
      online: false,
      type: "chat",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "chat":
        return <MessageCircle className="h-4 w-4 text-pink-400" />
      case "call":
        return <Phone className="h-4 w-4 text-pink-400" />
      case "video":
        return <Video className="h-4 w-4 text-pink-400" />
      default:
        return <MessageCircle className="h-4 w-4 text-pink-400" />
    }
  }

  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-alex-brush heading-glow">Messages</h1>
        <Button className="bg-pink-400 hover:bg-pink-500 text-black">
          <Plus className="mr-2 h-4 w-4" /> New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] min-h-[500px]">
        {/* Conversations List */}
        <div className="glass-card rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700/50">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search messages..."
                className="pl-10 bg-gray-800/50 border-gray-700/50 font-playfair"
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="px-4 pt-4">
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
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="overflow-y-auto h-[calc(100vh-300px)]">
                {conversations.map((conversation) => (
                  <Link href={`/messages/chat/${conversation.id}`} key={conversation.id}>
                    <div
                      className={`flex items-start gap-3 p-4 hover:bg-gray-800/50 cursor-pointer ${
                        conversation.id === 1 ? "bg-gray-800/50" : ""
                      }`}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          <AvatarFallback className="bg-pink-400/20 text-pink-400">
                            {conversation.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-gray-800"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-alex-brush heading-glow text-lg truncate">{conversation.name}</h3>
                          <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{conversation.time}</span>
                        </div>
                        <div className="flex items-center gap-1 my-0.5">
                          {getTypeIcon(conversation.type)}
                          <span className="text-xs text-gray-400 capitalize">{conversation.type}</span>
                        </div>
                        <p className="text-sm text-gray-300 truncate font-playfair">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="flex-shrink-0 ml-2">
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-pink-400 text-xs font-medium text-black">
                            {conversation.unread}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="unread" className="mt-0">
              <div className="overflow-y-auto h-[calc(100vh-300px)]">
                {conversations
                  .filter((c) => c.unread > 0)
                  .map((conversation) => (
                    <Link href={`/messages/chat/${conversation.id}`} key={conversation.id}>
                      <div className="flex items-start gap-3 p-4 hover:bg-gray-800/50 cursor-pointer">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conversation.avatar} alt={conversation.name} />
                            <AvatarFallback className="bg-pink-400/20 text-pink-400">
                              {conversation.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-gray-800"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-alex-brush heading-glow text-lg truncate">{conversation.name}</h3>
                            <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{conversation.time}</span>
                          </div>
                          <div className="flex items-center gap-1 my-0.5">
                            {getTypeIcon(conversation.type)}
                            <span className="text-xs text-gray-400 capitalize">{conversation.type}</span>
                          </div>
                          <p className="text-sm text-gray-300 truncate font-playfair">{conversation.lastMessage}</p>
                        </div>
                        <div className="flex-shrink-0 ml-2">
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-pink-400 text-xs font-medium text-black">
                            {conversation.unread}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                {conversations.filter((c) => c.unread > 0).length === 0 && (
                  <div className="p-6 text-center">
                    <p className="text-gray-400 font-playfair">No unread messages</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Empty State / Select a conversation */}
        <div className="lg:col-span-2 glass-card rounded-lg overflow-hidden flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-pink-400/20 flex items-center justify-center mb-4">
            <MessageCircle className="h-8 w-8 text-pink-400" />
          </div>
          <h2 className="text-2xl font-alex-brush heading-glow mb-2">Your Messages</h2>
          <p className="text-gray-300 max-w-md mb-6 font-playfair">
            Select a conversation from the list to view your messages or start a new conversation with a reader.
          </p>
          <Button className="bg-pink-400 hover:bg-pink-500 text-black">
            <Plus className="mr-2 h-4 w-4" /> New Message
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}
