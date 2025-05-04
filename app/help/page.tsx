import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Mail, Phone, MessageSquare } from "lucide-react"

export default function HelpPage() {
  // Mock data for FAQs
  const faqs = [
    {
      id: "faq-1",
      question: "How do I book a reading?",
      answer:
        "You can book a reading by visiting the Readings page, selecting a reader, and choosing your preferred communication method (chat, call, or video). Follow the prompts to complete your booking.",
    },
    {
      id: "faq-2",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and Apple Pay. Your payment information is securely processed through Stripe.",
    },
    {
      id: "faq-3",
      question: "How does the pay-per-minute system work?",
      answer:
        "Our pay-per-minute system charges your account based on the duration of your reading. You'll see a timer during your session, and you can add funds to your account at any time.",
    },
    {
      id: "faq-4",
      question: "Can I get a refund if I'm not satisfied?",
      answer:
        "If you're not satisfied with your reading, please contact our support team within 24 hours. We review all refund requests on a case-by-case basis.",
    },
    {
      id: "faq-5",
      question: "How do I become a reader on SoulSeer?",
      answer:
        "To become a reader, visit the Reader Application page in your dashboard. You'll need to complete an application form and demonstrate your abilities through a verification process.",
    },
    {
      id: "faq-6",
      question: "Is my personal information kept private?",
      answer:
        "Yes, we take your privacy seriously. Your personal information is encrypted and never shared with third parties. Readers only have access to the information you choose to share during your sessions.",
    },
  ]

  // Mock data for video tutorials
  const tutorials = [
    {
      id: 1,
      title: "Getting Started with SoulSeer",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "3:45",
    },
    {
      id: 2,
      title: "How to Book Your First Reading",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "5:12",
    },
    {
      id: 3,
      title: "Understanding the Pay-Per-Minute System",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "4:30",
    },
    {
      id: 4,
      title: "Joining and Interacting in Live Streams",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "6:18",
    },
  ]

  return (
    <PageContainer>
      <h1 className="text-3xl font-playfair mb-8">Help Center</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input placeholder="Search for help..." className="pl-10 py-6 bg-gray-800/50 border-gray-700/50 text-lg" />
          <Button className="absolute right-1 top-1 bg-pink-400 hover:bg-pink-500 text-black">Search</Button>
        </div>
      </div>

      <Tabs defaultValue="faqs" className="w-full">
        <TabsList className="bg-gray-800/70 backdrop-blur-sm border-gray-700/50 p-1 mb-6">
          <TabsTrigger value="faqs" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
            FAQs
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
            Video Tutorials
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
            Contact Support
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faqs" className="mt-0">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about SoulSeer.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-700/50">
                    <AccordionTrigger className="text-left hover:text-pink-400">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-300">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorials.map((tutorial) => (
              <Card key={tutorial.id} className="glass-card overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={tutorial.thumbnail || "/placeholder.svg"}
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                    {tutorial.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg">{tutorial.title}</h3>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-pink-400 hover:bg-pink-500 text-black">Watch Tutorial</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-pink-400" /> Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Send us an email and we'll get back to you within 24 hours.</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-pink-400 hover:bg-pink-500 text-black">Email Us</Button>
              </CardFooter>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-pink-400" /> Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Call our support team for immediate assistance.</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-pink-400 hover:bg-pink-500 text-black">Call Now</Button>
              </CardFooter>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-pink-400" /> Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Chat with our support team in real-time.</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-pink-400 hover:bg-pink-500 text-black">Start Chat</Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" className="bg-gray-800/50 border-gray-700/50" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-800/50 border-gray-700/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="Subject" className="bg-gray-800/50 border-gray-700/50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Your message"
                  className="w-full rounded-md bg-gray-800/50 border border-gray-700/50 p-3 text-white"
                ></textarea>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-pink-400 hover:bg-pink-500 text-black">Send Message</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  )
}
