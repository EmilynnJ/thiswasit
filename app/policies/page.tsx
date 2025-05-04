import { PageContainer } from "@/components/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PoliciesPage() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-alex-brush text-center mb-8 heading-glow">Policies & Guidelines</h1>

        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <p className="text-center font-playfair mb-4">
              At SoulSeer, we're committed to maintaining a safe, ethical, and supportive environment for all users.
              Please review our policies to understand how we operate and what you can expect from our services.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="terms" className="w-full">
          <TabsList className="bg-gray-800/70 backdrop-blur-sm border-gray-700/50 p-1 mb-6 w-full grid grid-cols-4">
            <TabsTrigger value="terms" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              Terms of Service
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              Privacy Policy
            </TabsTrigger>
            <TabsTrigger value="refund" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              Refund Policy
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              Community Guidelines
            </TabsTrigger>
          </TabsList>

          <TabsContent value="terms" className="mt-0">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-alex-brush heading-glow text-2xl">Terms of Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 font-playfair">
                <div>
                  <h3 className="text-lg font-medium mb-2">1. Acceptance of Terms</h3>
                  <p className="text-gray-300">
                    By accessing or using SoulSeer's services, you agree to be bound by these Terms of Service. If you
                    do not agree to these terms, please do not use our services.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">2. Service Description</h3>
                  <p className="text-gray-300">
                    SoulSeer provides a platform connecting users with psychic readers, spiritual advisors, and related
                    content. Our services are for entertainment and spiritual guidance purposes only.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">3. User Eligibility</h3>
                  <p className="text-gray-300">
                    You must be at least 18 years of age to use SoulSeer's services. By using our platform, you
                    represent and warrant that you are 18 or older.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">4. Account Responsibility</h3>
                  <p className="text-gray-300">
                    You are responsible for maintaining the confidentiality of your account information and for all
                    activities that occur under your account. You agree to notify us immediately of any unauthorized
                    use.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">5. Payment and Billing</h3>
                  <p className="text-gray-300">
                    By purchasing services on SoulSeer, you agree to pay all fees and charges associated with your
                    account on a timely basis. All payments are processed securely through our payment providers.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">6. Disclaimer of Warranties</h3>
                  <p className="text-gray-300">
                    SoulSeer's services are provided "as is" without warranties of any kind, either express or implied.
                    We do not guarantee specific outcomes from readings or spiritual guidance.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">7. Limitation of Liability</h3>
                  <p className="text-gray-300">
                    SoulSeer shall not be liable for any indirect, incidental, special, consequential, or punitive
                    damages resulting from your use or inability to use our services.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">8. Modifications to Terms</h3>
                  <p className="text-gray-300">
                    SoulSeer reserves the right to modify these Terms of Service at any time. We will notify users of
                    significant changes via email or through the platform.
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mt-8">Last Updated: March 15, 2025</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="mt-0">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-alex-brush heading-glow text-2xl">Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 font-playfair">
                <div>
                  <h3 className="text-lg font-medium mb-2">1. Information We Collect</h3>
                  <p className="text-gray-300">
                    We collect personal information such as your name, email address, and payment details when you
                    create an account. We also collect usage data to improve our services.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">2. How We Use Your Information</h3>
                  <p className="text-gray-300">
                    We use your information to provide and improve our services, process payments, communicate with you,
                    and ensure platform security. We never sell your personal data to third parties.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">3. Data Security</h3>
                  <p className="text-gray-300">
                    We implement appropriate security measures to protect your personal information from unauthorized
                    access, alteration, disclosure, or destruction.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">4. Cookies and Tracking</h3>
                  <p className="text-gray-300">
                    We use cookies and similar tracking technologies to enhance your experience on our platform. You can
                    adjust your browser settings to refuse cookies, but this may limit functionality.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">5. Third-Party Services</h3>
                  <p className="text-gray-300">
                    Our platform may contain links to third-party websites or services. We are not responsible for the
                    privacy practices of these external sites.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">6. Your Rights</h3>
                  <p className="text-gray-300">
                    You have the right to access, correct, or delete your personal information. You may also request a
                    copy of the data we hold about you. Contact our support team to exercise these rights.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">7. Children's Privacy</h3>
                  <p className="text-gray-300">
                    Our services are not intended for individuals under 18 years of age. We do not knowingly collect
                    personal information from children.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">8. Changes to Privacy Policy</h3>
                  <p className="text-gray-300">
                    We may update our Privacy Policy periodically. We will notify you of significant changes via email
                    or through the platform.
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mt-8">Last Updated: March 15, 2025</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="refund" className="mt-0">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-alex-brush heading-glow text-2xl">Refund Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 font-playfair">
                <div>
                  <h3 className="text-lg font-medium mb-2">1. Satisfaction Guarantee</h3>
                  <p className="text-gray-300">
                    We strive to ensure all readings and services meet high standards of quality. If you're not
                    satisfied with your experience, please contact us within 24 hours of your session.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">2. Refund Eligibility</h3>
                  <p className="text-gray-300">Refunds may be issued in the following circumstances:</p>

                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>Technical issues that significantly disrupted the reading session</li>
                    <li>Reader misconduct or violation of our ethical guidelines</li>
                    <li>Unauthorized charges or billing errors</li>
                    <li>Service not delivered as described</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">3. Refund Process</h3>
                  <p className="text-gray-300">
                    To request a refund, please contact our support team with your order details and reason for the
                    request. Each case will be reviewed individually within 3-5 business days.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">4. Non-Refundable Services</h3>
                  <p className="text-gray-300">The following are generally not eligible for refunds:</p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>Completed readings where the client participated fully</li>
                    <li>Digital products that have been downloaded</li>
                    <li>Requests made more than 24 hours after service completion</li>
                    <li>Refund requests based solely on disagreement with reading content</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">5. Refund Methods</h3>
                  <p className="text-gray-300">
                    Approved refunds will be issued to the original payment method used for the purchase. Processing
                    times may vary depending on your payment provider.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">6. Account Credits</h3>
                  <p className="text-gray-300">
                    In some cases, we may offer account credits instead of monetary refunds. These credits can be used
                    for future services on our platform.
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mt-8">Last Updated: March 15, 2025</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="mt-0">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-alex-brush heading-glow text-2xl">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 font-playfair">
                <div>
                  <h3 className="text-lg font-medium mb-2">1. Respect & Kindness</h3>
                  <p className="text-gray-300">
                    Treat all community members with respect and kindness. Harassment, hate speech, or discrimination of
                    any kind will not be tolerated.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">2. Authentic Interactions</h3>
                  <p className="text-gray-300">
                    Be genuine in your interactions. Misrepresentation, impersonation, or creating fake accounts is
                    prohibited.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">3. Ethical Conduct for Readers</h3>
                  <p className="text-gray-300">Readers must adhere to our ethical standards:</p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>Never claim to cure illness or predict death</li>
                    <li>Respect client confidentiality</li>
                    <li>Provide guidance without creating dependency</li>
                    <li>Be honest about your abilities and limitations</li>
                    <li>Never exploit vulnerable individuals</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">4. Content Guidelines</h3>
                  <p className="text-gray-300">When posting in forums or community spaces:</p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>No spam, solicitation, or self-promotion outside designated areas</li>
                    <li>No explicit, violent, or disturbing content</li>
                    <li>No sharing of personal information without consent</li>
                    <li>No plagiarism or copyright infringement</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">5. Dispute Resolution</h3>
                  <p className="text-gray-300">
                    If conflicts arise, attempt to resolve them respectfully. For unresolved issues, contact our
                    moderation team rather than escalating publicly.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">6. Reporting Violations</h3>
                  <p className="text-gray-300">
                    If you witness violations of these guidelines, please report them promptly. We investigate all
                    reports and take appropriate action to maintain community standards.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">7. Consequences</h3>
                  <p className="text-gray-300">
                    Violations may result in warnings, temporary suspension, or permanent removal from the platform,
                    depending on the severity and frequency of the offense.
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mt-8">Last Updated: March 15, 2025</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  )
}
