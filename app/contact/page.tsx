import { PageContainer } from "@/components/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MessageSquare, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-alex-brush text-center mb-8 heading-glow">Contact Us</h1>

        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <p className="text-center font-playfair">
              Have questions, feedback, or need assistance? We're here to help. Reach out to our support team using any
              of the methods below.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-alex-brush heading-glow text-xl">
                <Mail className="h-5 w-5 text-pink-400" /> Email Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 font-playfair mb-4">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <a href="mailto:support@soulseer.com" className="text-pink-400 hover:underline font-playfair">
                support@soulseer.com
              </a>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-alex-brush heading-glow text-xl">
                <Phone className="h-5 w-5 text-pink-400" /> Phone Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 font-playfair mb-4">Call our support team for immediate assistance.</p>
              <a href="tel:+18005551234" className="text-pink-400 hover:underline font-playfair">
                +1 (800) 555-1234
              </a>
              <p className="text-sm text-gray-400 mt-2 font-playfair">Available Mon-Fri, 9am-9pm EST</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-alex-brush heading-glow text-xl">
                <MessageSquare className="h-5 w-5 text-pink-400" /> Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 font-playfair mb-4">Chat with our support team in real-time.</p>
              <Button className="w-full bg-pink-400 hover:bg-pink-500 text-black">Start Chat</Button>
              <p className="text-sm text-gray-400 mt-2 font-playfair">Available 24/7</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle className="font-alex-brush heading-glow text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-playfair">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="bg-gray-800/50 border-gray-700/50 font-playfair"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-playfair">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="bg-gray-800/50 border-gray-700/50 font-playfair"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-playfair">
                    Subject
                  </Label>
                  <Select>
                    <SelectTrigger id="subject" className="bg-gray-800/50 border-gray-700/50 font-playfair">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="reader">Reader Inquiry</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-playfair">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    className="bg-gray-800/50 border-gray-700/50 min-h-[150px] font-playfair"
                  />
                </div>

                <Button className="w-full bg-pink-400 hover:bg-pink-500 text-black">Send Message</Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-alex-brush heading-glow text-xl">
                  <MapPin className="h-5 w-5 text-pink-400" /> Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gray-800/50 rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-gray-400 text-sm font-playfair">Map Placeholder</p>
                </div>
                <div className="space-y-2 font-playfair">
                  <p className="font-medium">SoulSeer Headquarters</p>
                  <p className="text-gray-300">123 Mystic Avenue</p>
                  <p className="text-gray-300">Serenity Heights, CA 90210</p>
                  <p className="text-gray-300">United States</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-alex-brush heading-glow text-2xl text-center">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 font-playfair">
            <div>
              <h3 className="text-lg font-medium mb-2">What are your hours of operation?</h3>
              <p className="text-gray-300">
                Our platform is available 24/7, and you can book or receive readings at any time. Our customer support
                team is available Monday through Friday, 9am to 9pm EST.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">How do I know which reader is right for me?</h3>
              <p className="text-gray-300">
                Each reader has a detailed profile highlighting their specialties, experience, and reading style. You
                can also read reviews from other clients to help make your decision. If you're still unsure, our
                matching tool can recommend readers based on your specific needs.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">What if I'm not satisfied with my reading?</h3>
              <p className="text-gray-300">
                We stand behind the quality of our readers. If you're not completely satisfied with your reading, please
                contact our support team within 24 hours, and we'll work with you to resolve the issue, which may
                include a partial or full refund depending on the circumstances.
              </p>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-300 mb-4">Have more questions? Check out our comprehensive FAQ section.</p>
              <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10">
                View All FAQs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
