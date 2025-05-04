import { PageContainer } from "@/components/page-container"
import { ChatInterface } from "@/components/reading/chat-interface"

interface ReadingPageProps {
  params: {
    id: string
  }
}

export default async function ReadingPage({ params }: ReadingPageProps) {
  // In a real app, you would fetch the session data from the database
  // For now, we'll use mock data
  const sessionId = Number.parseInt(params.id)

  // Mock data
  const session = {
    id: sessionId,
    readerId: 1,
    readerName: "Mystic Luna",
    readerAvatar: "/placeholder.svg?height=100&width=100",
    clientId: 2,
    clientName: "John Doe",
    clientAvatar: "/placeholder.svg?height=100&width=100",
    ratePerMinute: 399, // in cents
  }

  return (
    <PageContainer>
      <div className="py-4">
        <h1 className="text-2xl font-alex-brush heading-glow mb-6 text-center">Psychic Reading Session</h1>

        <ChatInterface
          readerId={session.readerId}
          readerName={session.readerName}
          readerAvatar={session.readerAvatar}
          clientId={session.clientId}
          clientName={session.clientName}
          clientAvatar={session.clientAvatar}
          sessionId={session.id}
          ratePerMinute={session.ratePerMinute}
        />
      </div>
    </PageContainer>
  )
}
