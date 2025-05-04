import { ReaderCard } from "@/components/reader-card"
import { executeQuery } from "@/lib/db"

interface ReaderProfile {
  id: number
  user_id: number
  display_name: string
  specialty: string
  bio: string
  avatar_url: string
  years_experience: number
  is_verified: boolean
  is_featured: boolean
  is_online: boolean
  chat_rate: number
  call_rate: number
  video_rate: number
}

async function getOnlineReaders(): Promise<ReaderProfile[]> {
  try {
    const readers = await executeQuery(
      "SELECT * FROM reader_profiles WHERE is_online = true ORDER BY is_featured DESC, id LIMIT 4",
    )
    return readers as ReaderProfile[]
  } catch (error) {
    console.error("Error fetching online readers:", error)
    return []
  }
}

export async function OnlineReaders() {
  const readers = await getOnlineReaders()

  // Handle case where no readers are found
  if (readers.length === 0) {
    // Return placeholder cards
    return (
      <div className="py-12">
        <h2 className="font-alex-brush text-3xl text-center mb-8 text-pink-400 heading-glow">Online Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ReaderCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <h2 className="font-alex-brush text-3xl text-center mb-8 text-pink-400 heading-glow">Online Now</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {readers.map((reader) => (
          <ReaderCard key={reader.id} reader={reader} />
        ))}
      </div>
    </div>
  )
}
