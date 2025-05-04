import { PageContainer } from "@/components/page-container"
import { ReaderApplication } from "@/components/reading/reader-application"

export default function BecomeReaderPage() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-playfair mb-8">Become a SoulSeer Reader</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="glass-card p-6 text-center">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Flexible Schedule</h3>
          <p className="text-gray-300">
            Work when you want, from anywhere in the world. Set your own hours and availability.
          </p>
        </div>

        <div className="glass-card p-6 text-center">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Competitive Earnings</h3>
          <p className="text-gray-300">
            Set your own rates and keep 70% of your earnings. Top readers earn $5,000+ monthly.
          </p>
        </div>

        <div className="glass-card p-6 text-center">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Global Clientele</h3>
          <p className="text-gray-300">
            Connect with clients from around the world seeking your unique spiritual guidance.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-playfair mb-4">How It Works</h2>
        <div className="glass-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-pink-400/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-pink-400">1</span>
              </div>
              <h3 className="font-medium mb-2">Apply</h3>
              <p className="text-sm text-gray-300">Complete the application form with your details and specialties.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-pink-400/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-pink-400">2</span>
              </div>
              <h3 className="font-medium mb-2">Verify</h3>
              <p className="text-sm text-gray-300">Complete a verification interview to demonstrate your abilities.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-pink-400/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-pink-400">3</span>
              </div>
              <h3 className="font-medium mb-2">Setup</h3>
              <p className="text-sm text-gray-300">
                Create your profile, set your rates, and define your availability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-pink-400/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-pink-400">4</span>
              </div>
              <h3 className="font-medium mb-2">Start</h3>
              <p className="text-sm text-gray-300">Begin offering readings and building your client base.</p>
            </div>
          </div>
        </div>
      </div>

      <ReaderApplication />
    </PageContainer>
  )
}
