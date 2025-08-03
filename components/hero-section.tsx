import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Content overlay */}
      <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
        <h1 className="font-alex-brush text-5xl md:text-7xl text-pink-400 mb-4 heading-glow">SoulSeer</h1>

        {/* Hero image between header and tagline */}
        <div className="w-48 h-48 mx-auto my-6 relative rounded-full overflow-hidden border-2 border-pink-400/50 shadow-lg">
          <Image
            src="https://i.postimg.cc/tRLSgCPb/HERO-IMAGE-1.jpg"
            alt="SoulSeer Hero Image"
            layout="fill"
            objectFit="cover"
            className="object-center"
          />
        </div>

        <h2 className="font-playfair text-xl md:text-2xl text-white mb-8">A Community of Gifted Psychics</h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-up">
            <Button className="bg-pink-400 hover:bg-pink-500 text-black px-8 py-6 text-lg">Get a Reading</Button>
          </Link>
          <Link href="/readers">
            <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10 px-8 py-6 text-lg">
              Meet Our Psychics
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-8 h-8 text-yellow-400 animate-pulse">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 w-6 h-6 text-yellow-400 animate-pulse delay-300">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  )
}
