import { PageContainer } from "@/components/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function FAQPage() {
  // FAQ categories and questions
  const faqCategories = [
    {
      id: "general",
      name: "General",
      questions: [
        {
          id: "what-is-soulseer",
          question: "What is SoulSeer?",
          answer:
            "SoulSeer is an online platform connecting individuals with authentic psychic readers, spiritual advisors, and healers. We offer various reading formats including chat, phone, and video sessions, as well as spiritual products and a supportive community.",
        },
        {
          id: "how-does-it-work",
          question: "How does SoulSeer work?",
          answer:
            "SoulSeer works by connecting you with verified psychic readers who can provide guidance on various aspects of your life. You can browse reader profiles, check their specialties and reviews, and choose to connect with them via chat, phone, or video. You can either pay per minute or book a session for a fixed duration.",
        },
        {
          id: "reader-verification",
          question: "How are SoulSeer readers verified?",
          answer:
            "All SoulSeer readers undergo a rigorous verification process that includes demonstrating their abilities, background checks, and professional references. We also monitor reader ratings and feedback to ensure ongoing quality. Only about 2% of reader applicants are accepted to our platform.",
        },
        {
          id: "is-it-real",
          question: "Are psychic readings real?",
          answer:
            "Psychic readings involve connecting with energies and insights that go beyond conventional understanding. While individual experiences vary, many people find genuine value and guidance through readings. SoulSeer is committed to providing authentic readers who use their natural gifts ethically and responsibly.",
        },
      ],
    },
    {
      id: "account",
      name: "Account & Profile",
      questions: [
        {
          id: "create-account",
          question: "How do I create an account?",
          answer:
            "Creating an account is simple. Click the 'Sign Up' button in the top navigation, enter your email address and create a password. You'll receive a verification email to confirm your account. Once verified, you can complete your profile and start exploring our services.",
        },
        {
          id: "delete-account",
          question: "How do I delete my account?",
          answer:
            "To delete your account, go to your Profile Settings, scroll to the bottom of the page, and click on 'Delete Account' under Account Actions. Please note that this action is permanent and will remove all your data from our system.",
        },
        {
          id: "change-password",
          question: "How do I change my password?",
          answer:
            "To change your password, go to your Profile Settings, select the 'Password' tab, enter your current password, then your new password, and confirm it. Click 'Update Password' to save your changes.",
        },
        {
          id: "update-payment",
          question: "How do I update my payment information?",
          answer:
            "You can update your payment information by going to the Payment & Billing section in your dashboard. Click on 'Payment Methods' and then 'Add New' to add a new payment method or select an existing one to update its details.",
        },
      ],
    },
    {
      id: "readings",
      name: "Readings & Services",
      questions: [
        {
          id: "reading-types",
          question: "What types of readings are available?",
          answer:
            "SoulSeer offers a wide variety of readings including tarot, astrology, psychic mediumship, love and relationships, career guidance, spiritual healing, past life regression, dream interpretation, and many more. Each reader specifies their specialties in their profile.",
        },
        {
          id: "reading-cost",
          question: "How much do readings cost?",
          answer:
            "Reading costs vary depending on the reader's experience and the type of session. Chat readings typically start at $3.99 per minute, phone readings at $4.50 per minute, and video readings at $5.25 per minute. We also offer fixed-price packages for scheduled sessions.",
        },
        {
          id: "reading-length",
          question: "How long is a typical reading?",
          answer:
            "The length of a reading depends on your preference and the complexity of your questions. Pay-per-minute sessions can be as short as 5 minutes or extend to an hour or more. Scheduled sessions typically range from 15 to 60 minutes. Most meaningful readings require at least 10-15 minutes.",
        },
        {
          id: "prepare-for-reading",
          question: "How should I prepare for a reading?",
          answer:
            "To get the most from your reading, find a quiet, private space where you won't be interrupted. Consider writing down specific questions beforehand. Try to approach the reading with an open mind and heart. It's helpful to have a notebook to record insights, and remember that the most accurate readings come when you're honest with your reader.",
        },
      ],
    },
    {
      id: "billing",
      name: "Billing & Payments",
      questions: [
        {
          id: "payment-methods",
          question: "What payment methods do you accept?",
          answer:
            "SoulSeer accepts all major credit and debit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay. All payments are processed securely through our payment providers with industry-standard encryption.",
        },
        {
          id: "refund-policy",
          question: "What is your refund policy?",
          answer:
            "If you're not satisfied with your reading, you can request a refund within 24 hours by contacting our support team. Each case is reviewed individually. Refunds may be issued for technical issues, reader misconduct, or if the service wasn't delivered as described. Please see our full Refund Policy for details.",
        },
        {
          id: "auto-reload",
          question: "How does auto-reload work?",
          answer:
            "Auto-reload automatically adds funds to your account when your balance falls below a threshold you set. You can enable this feature in the Wallet section of your Payment & Billing page, where you can specify both the reload amount and the threshold. This ensures you never run out of funds during an important reading.",
        },
        {
          id: "cancel-subscription",
          question: "How do I cancel my subscription?",
          answer:
            "To cancel a subscription, go to the Payment & Billing section in your dashboard, select the 'Subscriptions' tab, find the subscription you want to cancel, and click 'Cancel Subscription'. You'll continue to have access until the end of your current billing period.",
        },
      ],
    },
    {
      id: "technical",
      name: "Technical Support",
      questions: [
        {
          id: "connection-issues",
          question: "What should I do if I experience connection issues during a reading?",
          answer:
            "If you experience connection issues during a reading, first try refreshing the page or restarting the app. Check your internet connection and ensure you have a stable signal. If problems persist, end the session and contact our support team. We can help troubleshoot or arrange a continuation of your reading.",
        },
        {
          id: "app-compatibility",
          question: "Is SoulSeer compatible with all devices?",
          answer:
            "SoulSeer is compatible with most modern devices. Our website works on all major browsers (Chrome, Safari, Firefox, Edge) on both desktop and mobile. We also offer dedicated apps for iOS and Android devices. For the best experience, especially for video readings, we recommend using a device with a good camera and microphone.",
        },
        {
          id: "notifications",
          question: "Why am I not receiving notifications?",
          answer:
            "If you're not receiving notifications, check your notification settings in your profile. Also ensure you've allowed notifications in your browser or device settings. For email notifications, check your spam folder and add support@soulseer.com to your contacts. If you still have issues, contact our technical support team.",
        },
        {
          id: "data-privacy",
          question: "Is my data secure?",
          answer:
            "Yes, we take data security very seriously. All personal information and reading sessions are encrypted using industry-standard protocols. We never share your data with third parties without your consent. Our platform complies with GDPR and other privacy regulations. You can review our Privacy Policy for more details on how we protect your information.",
        },
      ],
    },
  ]

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-alex-brush text-center mb-8 heading-glow">Frequently Asked Questions</h1>

        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for answers..."
                  className="pl-10 py-6 bg-gray-800/50 border-gray-700/50 text-lg font-playfair"
                />
                <Button className="absolute right-1 top-1 bg-pink-400 hover:bg-pink-500 text-black">Search</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-gray-800/70 backdrop-blur-sm border-gray-700/50 p-1 mb-6 flex flex-wrap">
            {faqCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-pink-400 data-[state=active]:text-black"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {faqCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="font-alex-brush heading-glow text-2xl">{category.name} Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-700/50">
                        <AccordionTrigger className="text-left hover:text-pink-400 font-playfair">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 font-playfair">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 glass-card p-6 text-center">
          <h2 className="text-2xl font-alex-brush mb-4 heading-glow">Still Have Questions?</h2>
          <p className="text-gray-300 mb-6 font-playfair">
            If you couldn't find the answer you were looking for, our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-pink-400 hover:bg-pink-500 text-black">Contact Support</Button>
            <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10">
              Live Chat
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
