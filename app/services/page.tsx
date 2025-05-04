import { PageContainer } from "@/components/page-container"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageSquare, Phone, Video, Star, Calendar, Sparkles, BookOpen, Compass } from "lucide-react"

export default function ServicesPage() {
  // Mock data for services
  const readingServices = [
    {
      id: 1,
      title: "Psychic Chat Reading",
      description: "Connect instantly with a psychic via text chat for immediate guidance and insights.",
      price: "From $3.99/min",
      icon: <MessageSquare className="h-6 w-6 text-pink-400" />,
      link: "/readings",
      popular: true,
    },
    {
      id: 2,
      title: "Psychic Phone Reading",
      description: "Speak directly with a psychic for a more personal and in-depth reading experience.",
      price: "From $4.50/min",
      icon: <Phone className="h-6 w-6 text-pink-400" />,
      link: "/readings",
      popular: false,
    },
    {
      id: 3,
      title: "Psychic Video Reading",
      description: "Face-to-face video sessions for the most immersive and connected reading experience.",
      price: "From $5.25/min",
      icon: <Video className="h-6 w-6 text-pink-400" />,
      link: "/readings",
      popular: false,
    },
    {
      id: 4,
      title: "Scheduled Reading",
      description: "Book a session in advance with your preferred reader at a time that works for you.",
      price: "From $25.00",
      icon: <Calendar className="h-6 w-6 text-pink-400" />,
      link: "/readings",
      popular: false,
    },
  ]

  const specialtyServices = [
    {
      id: 101,
      title: "Tarot Reading",
      description: "Gain insights into past, present, and future through the ancient wisdom of tarot cards.",
      link: "/tarot",
      icon: <BookOpen className="h-6 w-6 text-pink-400" />,
    },
    {
      id: 102,
      title: "Astrology Reading",
      description: "Discover how celestial bodies influence your life with personalized birth chart analysis.",
      link: "/horoscope",
      icon: <Star className="h-6 w-6 text-pink-400" />,
    },
    {
      id: 103,
      title: "Spiritual Healing",
      description: "Experience energy healing to restore balance and harmony to your mind, body, and spirit.",
      link: "/readings",
      icon: <Sparkles className="h-6 w-6 text-pink-400" />,
    },
    {
      id: 104,
      title: "Love & Relationship Guidance",
      description: "Navigate your romantic life with specialized insights into compatibility and relationship paths.",
      link: "/readings",
      icon: <Compass className="h-6 w-6 text-pink-400" />,
    },
  ]

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-alex-brush text-center mb-8 heading-glow">Our Services</h1>

        <Card className="glass-card mb-12">
          <CardContent className="p-6">
            <p className="text-center font-playfair">
              SoulSeer offers a variety of spiritual services to guide you on your journey. Whether you're seeking
              clarity, healing, or connection, our gifted readers are here to help.
            </p>
          </CardContent>
        </Card>

        {/* Reading Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-alex-brush text-center mb-8 heading-glow">Reading Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {readingServices.map((service) => (
              <Card
                key={service.id}
                className={`glass-card overflow-hidden ${service.popular ? "border-pink-400" : ""}`}
              >
                {service.popular && (
                  <div className="bg-pink-400 text-black text-xs font-medium px-3 py-1 text-center">Most Popular</div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {service.icon}
                    <CardTitle className="font-alex-brush heading-glow text-2xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 font-playfair">{service.description}</p>
                  <p className="text-pink-400 font-medium font-playfair">{service.price}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-pink-400 hover:bg-pink-500 text-black" asChild>
                    <Link href={service.link}>Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Specialty Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-alex-brush text-center mb-8 heading-glow">Specialty Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialtyServices.map((service) => (
              <Card key={service.id} className="glass-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {service.icon}
                    <CardTitle className="font-alex-brush heading-glow text-2xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 font-playfair">{service.description}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-pink-400 text-pink-400 hover:bg-pink-400/10"
                    asChild
                  >
                    <Link href={service.link}>Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Custom Packages Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-alex-brush text-center mb-8 heading-glow">Custom Packages</h2>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-alex-brush heading-glow text-2xl text-center">
                Personalized Spiritual Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 font-playfair">
              <p className="text-gray-300">
                Looking for a more comprehensive spiritual experience? Our custom packages combine multiple services
                tailored to your specific needs and goals.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-pink-400/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-pink-400 text-xs">✓</span>
                  </div>
                  <p className="text-gray-300">Initial consultation to understand your spiritual needs</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-pink-400/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-pink-400 text-xs">✓</span>
                  </div>
                  <p className="text-gray-300">Customized combination of readings and spiritual services</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-pink-400/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-pink-400 text-xs">✓</span>
                  </div>
                  <p className="text-gray-300">Follow-up sessions to track your spiritual progress</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-pink-400/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-pink-400 text-xs">✓</span>
                  </div>
                  <p className="text-gray-300">Personalized spiritual practices and exercises</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="bg-pink-400 hover:bg-pink-500 text-black" asChild>
                <Link href="/contact">Inquire About Custom Packages</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>

        {/* Testimonials Section */}
        <section>
          <h2 className="text-3xl font-alex-brush text-center mb-8 heading-glow">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card p-6">
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                  </div>
                </div>
                <p className="text-gray-300 italic mb-4 font-playfair">
                  "My reading with Mystic Luna was truly transformative. She connected with energies I didn't even
                  realize were affecting me and provided guidance that has already led to positive changes in my life."
                </p>
                <div className="mt-auto">
                  <p className="font-medium">Sarah M.</p>
                  <p className="text-sm text-gray-400">Tarot Reading</p>
                </div>
              </div>
            </Card>
            <Card className="glass-card p-6">
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                  </div>
                </div>
                <p className="text-gray-300 italic mb-4 font-playfair">
                  "I was skeptical at first, but my astrology reading with Celestial Sage was incredibly accurate. The
                  insights about my career path have given me the confidence to make a change I've been considering for
                  years."
                </p>
                <div className="mt-auto">
                  <p className="font-medium">Michael T.</p>
                  <p className="text-sm text-gray-400">Astrology Reading</p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </PageContainer>
  )
}
