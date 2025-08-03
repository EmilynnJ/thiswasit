import { PageContainer } from "@/components/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    {
      name: "Emilynn",
      role: "Founder & Lead Psychic",
      bio: "Psychic medium and founder of SoulSeer, Emilynn created this platform to provide ethical, compassionate guidance while ensuring fair treatment for readers.",
      image: "https://i.postimg.cc/s2ds9RtC/FOUNDER.jpg",
    },
    {
      name: "Orion Starlight",
      role: "Head of Psychic Development",
      bio: "A renowned medium and energy healer, Orion oversees our rigorous psychic verification process and mentors new readers joining our platform.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Luna Crystalweaver",
      role: "Community Manager",
      bio: "Luna brings her expertise in crystal healing and astrology to foster a supportive community environment where members can share and grow together.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Phoenix Emberstone",
      role: "Spiritual Shop Curator",
      bio: "With a background in herbalism and ritual crafting, Phoenix carefully selects each item in our shop to ensure authentic energetic properties and ethical sourcing.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-alex-brush text-center mb-8 heading-glow">About SoulSeer</h1>

        {/* Our Story Section */}
        <section className="mb-16">
          <Card className="glass-card overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image
                  src="https://i.postimg.cc/s2ds9RtC/FOUNDER.jpg"
                  alt="Emilynn - Founder of SoulSeer"
                  fill
                  className="object-cover p-8"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <div className="space-y-4 font-playfair">
                  <p>
                    At SoulSeer, we are dedicated to providing ethical, compassionate, and judgment-free spiritual
                    guidance. Our mission is twofold: to offer clients genuine, heart-centered readings and to uphold
                    fair, ethical standards for our readers.
                  </p>
                  <p>
                    Founded by psychic medium Emilynn, SoulSeer was created as a response to the corporate greed that
                    dominates many psychic platforms. Unlike other apps, our readers keep the majority of what they earn
                    and play an active role in shaping the platform.
                  </p>
                  <p>
                    SoulSeer is more than just an app—it's a soul tribe. A community of gifted psychics united by our
                    life's calling: to guide, heal, and empower those who seek clarity on their journey.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Our Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-alex-brush text-center mb-8 heading-glow">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-pink-400/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-pink-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-alex-brush mb-2 heading-glow">Authenticity</h3>
              <p className="text-gray-300 font-playfair">
                We rigorously verify all our readers to ensure genuine psychic abilities and ethical practices. No
                scripts, no gimmicks—just authentic spiritual guidance.
              </p>
            </Card>

            <Card className="glass-card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-pink-400/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-pink-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-alex-brush mb-2 heading-glow">Community</h3>
              <p className="text-gray-300 font-playfair">
                We foster a supportive environment where both readers and clients can connect, share experiences, and
                grow spiritually together.
              </p>
            </Card>

            <Card className="glass-card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-pink-400/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-pink-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-alex-brush mb-2 heading-glow">Empowerment</h3>
              <p className="text-gray-300 font-playfair">
                We believe in providing guidance that empowers you to make your own choices, rather than creating
                dependency. Our readers illuminate paths but respect your free will.
              </p>
            </Card>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-alex-brush text-center mb-8 heading-glow">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="glass-card overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3 relative h-48 sm:h-auto">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="sm:w-2/3 p-6">
                    <h3 className="text-xl font-alex-brush mb-1 heading-glow">{member.name}</h3>
                    <p className="text-pink-400 text-sm mb-3 font-playfair">{member.role}</p>
                    <p className="text-gray-300 text-sm font-playfair">{member.bio}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Sections */}
        <section className="mb-16">
          <h2 className="text-3xl font-alex-brush text-center mb-8 heading-glow">Join Our Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Discord Community */}
            <Card className="glass-card p-6">
              <CardHeader>
                <CardTitle className="font-alex-brush heading-glow text-2xl flex items-center">
                  <svg className="h-6 w-6 mr-2 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                  Discord Community
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-playfair">Join our vibrant Discord community where you can:</p>
                <ul className="space-y-2 font-playfair list-disc pl-5">
                  <li>Connect with like-minded spiritual seekers</li>
                  <li>Participate in free community readings and events</li>
                  <li>Get exclusive announcements and updates</li>
                  <li>Share your spiritual journey and experiences</li>
                  <li>Access special Discord-only discounts</li>
                </ul>
                <div className="pt-4">
                  <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white" asChild>
                    <a href="https://discord.gg/Wbue7BGUe5" target="_blank" rel="noopener noreferrer">
                      Join Our Discord
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Patreon Community */}
            <Card className="glass-card p-6">
              <CardHeader>
                <CardTitle className="font-alex-brush heading-glow text-2xl flex items-center">
                  <svg className="h-6 w-6 mr-2 text-[#FF424D]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 .48v23.04h4.22V.48zm15.385 0c-4.764 0-8.641 3.88-8.641 8.65 0 4.755 3.877 8.623 8.641 8.623 4.75 0 8.615-3.868 8.615-8.623C24 4.36 20.136.48 15.385.48z" />
                  </svg>
                  Patreon Membership
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-playfair">Become a patron and enjoy these exclusive benefits:</p>
                <ul className="space-y-2 font-playfair list-disc pl-5">
                  <li>Monthly personal readings with our top psychics</li>
                  <li>Early access to new features and services</li>
                  <li>Exclusive spiritual development workshops</li>
                  <li>Behind-the-scenes content and insights</li>
                  <li>Special discounts on all readings and products</li>
                </ul>
                <div className="pt-4">
                  <Button className="w-full bg-[#FF424D] hover:bg-[#E5353F] text-white" asChild>
                    <a
                      href="https://patreon.com/SoulSeer?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Our Patreon
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="mb-8">
          <Card className="glass-card p-8 text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-alex-brush heading-glow">Join Our Spiritual Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 max-w-2xl mx-auto font-playfair">
                Whether you're seeking guidance, looking to share your gifts, or simply curious about the spiritual
                realm, SoulSeer welcomes you with open arms. Begin your journey with us today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-pink-400 hover:bg-pink-500 text-black" asChild>
                  <Link href="/readers">Get a Reading</Link>
                </Button>
                <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10" asChild>
                  <Link href="/become-reader">Become a Reader</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageContainer>
  )
}
