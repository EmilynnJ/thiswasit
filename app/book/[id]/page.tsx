import { PageContainer } from "@/components/page-container"
import { BookingSystem } from "@/components/booking/booking-system"

export default function BookReaderPage({ params }: { params: { id: string } }) {
  // Mock reader data based on ID
  const readers = {
    "1": {
      id: "1",
      name: "Mystic Luna",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Tarot & Astrology",
      rating: 4.9,
      price: 3.99,
    },
    "2": {
      id: "2",
      name: "Celestial Sage",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Spiritual Healing",
      rating: 4.8,
      price: 4.5,
    },
    "3": {
      id: "3",
      name: "Aura Whisperer",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Aura Reading",
      rating: 4.7,
      price: 3.75,
    },
  }

  // Get reader data or use default if not found
  const reader = readers[params.id as keyof typeof readers] || {
    id: params.id,
    name: "Unknown Reader",
    avatar: "/placeholder.svg?height=100&width=100",
    specialty: "Spiritual Reading",
    rating: 4.5,
    price: 3.99,
  }

  return (
    <PageContainer>
      <h1 className="text-3xl font-playfair mb-8">Book a Reading</h1>
      <BookingSystem
        readerId={reader.id}
        readerName={reader.name}
        readerAvatar={reader.avatar}
        readerSpecialty={reader.specialty}
        readerRating={reader.rating}
        readerPrice={reader.price}
      />
    </PageContainer>
  )
}
