import { PageContainer } from "@/components/page-container"
import { ChatInterface } from "@/components/reading/chat-interface"
import { CallInterface } from "@/components/reading/call-interface"
import { VideoInterface } from "@/components/reading/video-interface"
import { executeQuery } from "@/lib/db"
import { notFound } from "next/navigation"

interface ReadingPageProps {
  params: {
    id: string
    type: string
  }
}

async function getReaderData(readerId: number) {
  try {
    const result = await executeQuery(
      `SELECT rp.*, u.first_name, u.last_name 
       FROM reader_profiles rp
       JOIN users u ON rp.user_id = u.id
       WHERE rp.id = $1`,
      [readerId],
    )

    if (result.length === 0) {
      return null
    }

    return {
      id: result[0].id,
      name: result[0].display_name,
      avatar: result[0].avatar_url || "/placeholder.svg?height=100&width=100",
      specialty: result[0].specialty,
      bio: result[0].bio,
      chatRate: result[0].chat_rate,
      callRate: result[0].call_rate,
      videoRate: result[0].video_rate,
    }
  } catch (error) {
    console.error("Error fetching reader data:", error)
    return null
  }
}

export default async function ReadingPage({ params }: ReadingPageProps) {
  const readerId = Number.parseInt(params.id)
  const type = params.type

  if (isNaN(readerId) || !["chat", "call", "video"].includes(type)) {
    notFound()
  }

  const reader = await getReaderData(readerId)

  if (!reader) {
    notFound()
  }

  // In a real app, you would get the client data from the authenticated user
  // For now, we'll use mock data
  const client = {
    id: 1,
    name: "John Doe",
    avatar: "/placeholder.svg?height=100&width=100",
  }

  // Determine which rate to use based on the session type
  let rate = 0
  switch (type) {
    case "chat":
      rate = reader.chatRate
      break
    case "call":
      rate = reader.callRate
      break
    case "video":
      rate = reader.videoRate
      break
  }

  return (
    <PageContainer>
      <div className="py-4">
        <h1 className="text-2xl font-alex-brush heading-glow mb-6 text-center">Psychic Reading Session</h1>

        {type === "chat" && (
          <ChatInterface
            readerId={reader.id}
            readerName={reader.name}
            readerAvatar={reader.avatar}
            clientId={client.id}
            clientName={client.name}
            clientAvatar={client.avatar}
            ratePerMinute={rate}
          />
        )}

        {type === "call" && (
          <CallInterface
            readerId={reader.id}
            readerName={reader.name}
            clientId={client.id}
            clientName={client.name}
            ratePerMinute={rate}
          />
        )}

        {type === "video" && (
          <VideoInterface
            readerId={reader.id}
            readerName={reader.name}
            clientId={client.id}
            clientName={client.name}
            ratePerMinute={rate}
          />
        )}
      </div>
    </PageContainer>
  )
}
