import type { Metadata } from "next"
import TopNavigation from "@/components/navigation/top-navigation"

export const metadata: Metadata = {
  title: "Readings - SoulSeer",
  description: "Find and book readings with our gifted psychics",
}

export default function ReadingsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-alex-brush text-pink-400 text-center mb-8">Spiritual Readings</h1>
        <div className="glass-card p-6">
          <p className="text-center text-lg mb-8">
            Discover our talented readers and find the perfect spiritual guide for your journey.
          </p>

          {/* Content will be added here */}
          <div className="text-center py-12">
            <p className="text-gray-400">Reader search and filtering options coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  )
}
