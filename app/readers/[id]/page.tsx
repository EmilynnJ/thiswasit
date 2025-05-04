import { PageContainer } from "@/components/page-container"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"
import { ReadingOptions } from "@/components/reading/reading-options"
import { executeQuery } from "@/lib/db"
import { notFound } from "next/navigation"

interface ReaderPageProps {
  params: {
    id: string
  }
}

async function getReaderData(readerId: number) {
  try {
    const result = await executeQuery(
      `SELECT rp.*, u.first_name, u.last_name,
       (SELECT COUNT(*) FROM reading_sessions WHERE reader_id = rp.id AND status = 'completed') as completed_readings
       FROM reader_profiles rp
       JOIN users u ON rp.user_id = u.id
       WHERE rp.id = $1`,
      [readerId],
    )

    if (result.length === 0) {
      return null
    }

    // Calculate average rating (in a real app, this would come from reviews)
    const rating = 4.7 + (Math.random() * 0.3 - 0.15) // Random between 4.55 and 4.85

    return {
      id: result[0].id,
      name: result[0].display_name,
      avatar: result[0].avatar_url || "/placeholder.svg?height=100&width=100",
      specialty: result[0].specialty,
      bio: result[0].bio,
      isOnline: result[0].is_online,
      yearsExperience: result[0].years_experience,
      completedReadings: result[0].completed_readings,
      rating,
      chatRate: result[0].chat_rate,
      callRate: result[0].call_rate,
      videoRate: result[0].video_rate,
    }
  } catch (error) {
    console.error("Error fetching reader data:", error)
    return null
  }
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const readerId = Number.parseInt(params.id)

  if (isNaN(readerId)) {
    notFound()
  }

  const reader = await getReaderData(readerId)

  if (!reader) {
    notFound()
  }

  return (
    <PageContainer>
      <div className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Reader Profile */}
          <div className="md:col-span-1">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <img src={reader.avatar || "/placeholder.svg"} alt={reader.name} />
                  </Avatar>

                  <h1 className="text-2xl font-alex-brush heading-glow mb-1">{reader.name}</h1>

                  <div className="flex items-center mb-2">
                    <Badge
                      variant="outline"
                      className={reader.isOnline ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}
                    >
                      {reader.isOnline ? "Online" : "Offline"}
                    </Badge>
                  </div>

                  <div className="flex items-center mb-4">
                    <span className="text-yellow-400 mr-1">
                      <StarIcon className="h-4 w-4 inline" />
                    </span>
                    <span>
                      {reader.rating.toFixed(1)} ({reader.completedReadings} readings)
                    </span>
                  </div>

                  <div className="mb-4">
                    <Badge className="bg-pink-400">{reader.specialty}</Badge>
                  </div>

                  <p className="text-gray-300 text-sm mb-4">{reader.bio}</p>

                  <div className="w-full border-t border-gray-700 pt-4 mt-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Experience</p>
                        <p className="font-medium">{reader.yearsExperience} years</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Completed</p>
                        <p className="font-medium">{reader.completedReadings} readings</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reading Options */}
          <div className="md:col-span-2">
            <ReadingOptions
              readerId={reader.id}
              readerName={reader.name}
              chatRate={reader.chatRate}
              callRate={reader.callRate}
              videoRate={reader.videoRate}
            />

            <div className="mt-8">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">About Pay-Per-Minute Readings</h3>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Our pay-per-minute system allows you to connect with {reader.name} through chat, voice call, or
                      video call. You'll only be charged for the time you spend in the session.
                    </p>
                    <p>
                      <strong>How it works:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Select your preferred communication method</li>
                      <li>The timer starts when the connection is established</li>
                      <li>You can end the session at any time</li>
                      <li>Your account will be charged based on the duration of the session</li>
                      <li>Rates are calculated per minute, with a minimum charge of one minute</li>
                    </ul>
                    <p className="text-sm">
                      By starting a session, you agree to our terms of service and payment policies.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
