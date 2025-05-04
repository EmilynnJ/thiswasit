import { PageContainer } from "@/components/page-container"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HoroscopePage() {
  // Mock data for zodiac signs
  const zodiacSigns = [
    {
      name: "Aries",
      dates: "Mar 21 - Apr 19",
      element: "Fire",
      ruling: "Mars",
      image: "/placeholder.svg?height=100&width=100",
      horoscope:
        "Today brings a surge of energy and motivation, Aries. Your natural leadership abilities are heightened, making this an excellent time to take initiative on projects or ideas you've been contemplating. Be mindful of impatience, however, as rushing could lead to overlooking important details. A surprising conversation may open doors to new opportunities.",
    },
    {
      name: "Taurus",
      dates: "Apr 20 - May 20",
      element: "Earth",
      ruling: "Venus",
      image: "/placeholder.svg?height=100&width=100",
      horoscope:
        "Stability and comfort are highlighted today, Taurus. You may feel a strong desire to beautify your surroundings or indulge in sensory pleasures. Financial matters look favorable, with potential for unexpected gains. Your practical approach to a complex problem will impress those around you. Take time to appreciate the simple joys in life.",
    },
    {
      name: "Gemini",
      dates: "May 21 - Jun 20",
      element: "Air",
      ruling: "Mercury",
      image: "/placeholder.svg?height=100&width=100",
      horoscope:
        "Your mind is particularly sharp today, Gemini. Communication flows easily, making this an ideal time for important conversations, presentations, or writing projects. You may find yourself juggling multiple interests or social invitations. While your adaptability serves you well, be careful not to spread yourself too thin. An intellectual connection could develop into something more significant.",
    },
    {
      name: "Cancer",
      dates: "Jun 21 - Jul 22",
      element: "Water",
      ruling: "Moon",
      image: "/placeholder.svg?height=100&width=100",
      horoscope:
        "Emotional intuition runs high today, Cancer. You're especially attuned to the needs and feelings of those around you. Home and family matters take center stage, possibly requiring your nurturing attention. A creative project connected to your personal history could bring unexpected satisfaction. Trust your instincts regarding a financial decision.",
    },
    {
      name: "Leo",
      dates: "Jul 23 - Aug 22",
      element: "Fire",
      ruling: "Sun",
      image: "/placeholder.svg?height=100&width=100",
      horoscope:
        "Your natural charisma shines brightly today, Leo. Others are drawn to your warmth and confidence, making this an excellent day for social gatherings or public appearances. A creative endeavor receives positive recognition. Romance is highlighted, with potential for passionate encounters or deepening existing connections. Remember to share the spotlight with others.",
    },
    {
      name: "Virgo",
      dates: "Aug 23 - Sep 22",
      element: "Earth",
      ruling: "Mercury",
      image: "/placeholder.svg?height=100&width=100",
      horoscope:
        "Your analytical skills are particularly sharp today, Virgo. Details that others miss are clear to you, allowing for efficient problem-solving. Work and health matters are favorably highlighted. Your organizational talents could lead to improvements in daily routines. While your perfectionist tendencies serve you well, remember to be gentle with yourself and others. An unexpected insight may help resolve a lingering issue.",
    },
    {
      name: "Libra",
      dates: "Sep 23 - Oct 22",
      element: "Air",
      ruling: "Venus",
      image: "/placeholder.svg?height=100&width=100",
      horoscope:
        "Harmony and balance are your focus today, Libra. Relationships of all kinds are highlighted, with opportunities for meaningful connections and conflict resolution. Your diplomatic skills are in high demand. Aesthetic pursuits bring satisfaction, whether appreciating or creating beauty. A decision you've been weighing carefully now becomes clearer, allowing you to move forward with confidence.",
    },
    {
      name: "Scorpio",
      dates: "Oct 23 - Nov 21",
      element: "Water",
      ruling: "Pluto, Mars",
      image: "/placeholder.svg?height=100&width=100",
      horoscope:
        "Intensity marks your experiences today, Scorpio. Your penetrating insight allows you to see beneath surface appearances, revealing hidden truths. Transformation is highlighted, possibly through letting go of what no longer serves you. Financial matters may require careful attention. A powerful emotional connection deepens, bringing both vulnerability and strength.",
    },
    {
      name: "Sagittarius",
      dates: "Nov 22 - Dec 21",
      element: "Fire",
      ruling: "Jupiter",
      image: "/placeholder.svg?height=100&width=100",
      horoscope:
        "Adventure calls to you today, Sagittarius. Your natural optimism and enthusiasm inspire those around you. Learning opportunities abound, whether through formal education, travel, or philosophical discussions. Your honest perspective helps clarify a complex situation. While your freedom-loving nature is strong, a meaningful commitment may prove surprisingly satisfying.",
    },
    {
      name: "Capricorn",
      dates: "Dec 22 - Jan 19",
      element: "Earth",
      ruling: "Saturn",
      image: "/placeholder.svg?height=100&width=100",
      horoscope:
        "Ambition and discipline drive you forward today, Capricorn. Professional matters receive favorable influences, with potential for recognition of your hard work. Your practical approach to challenges earns respect. Family responsibilities may require attention, balancing your public and private lives. A long-term goal moves closer to fruition through your persistent efforts.",
    },
    {
      name: "Aquarius",
      dates: "Jan 20 - Feb 18",
      element: "Air",
      ruling: "Uranus, Saturn",
      image: "/placeholder.svg?height=100&width=100",
      horoscope:
        "Innovative thinking sets you apart today, Aquarius. Your unique perspective leads to creative solutions that others might miss. Social connections are highlighted, particularly within groups sharing your humanitarian interests. Technology may play a significant role in your day. While your independent streak is strong, collaborative efforts bring unexpected rewards.",
    },
    {
      name: "Pisces",
      dates: "Feb 19 - Mar 20",
      element: "Water",
      ruling: "Neptune, Jupiter",
      image: "/placeholder.svg?height=100&width=100",
      horoscope:
        "Your intuitive and compassionate nature is heightened today, Pisces. Creative inspiration flows freely, making this an excellent time for artistic pursuits. Spiritual matters bring comfort and insight. Your empathy allows you to connect deeply with others, though remember to maintain healthy boundaries. Dreams may contain important messages worth reflecting upon.",
    },
  ]

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-alex-brush text-center mb-8 heading-glow">Daily Horoscopes</h1>

        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <p className="text-center font-playfair">
              Explore your daily cosmic guidance. The stars and planets offer insights to help navigate your path.
              Select your zodiac sign below to reveal today's personalized horoscope.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="aries" className="w-full">
          <TabsList className="bg-gray-800/70 backdrop-blur-sm border-gray-700/50 p-1 mb-6 flex flex-wrap justify-center">
            {zodiacSigns.map((sign) => (
              <TabsTrigger
                key={sign.name.toLowerCase()}
                value={sign.name.toLowerCase()}
                className="data-[state=active]:bg-pink-400 data-[state=active]:text-black"
              >
                {sign.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {zodiacSigns.map((sign) => (
            <TabsContent key={sign.name.toLowerCase()} value={sign.name.toLowerCase()} className="mt-0">
              <Card className="glass-card overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 p-6 flex flex-col items-center text-center border-r border-gray-700/50">
                    <div className="relative h-32 w-32 mb-4">
                      <Image src={sign.image || "/placeholder.svg"} alt={sign.name} fill className="object-contain" />
                    </div>
                    <h2 className="text-2xl font-alex-brush mb-2 heading-glow">{sign.name}</h2>
                    <p className="text-gray-300 mb-2 font-playfair">{sign.dates}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-playfair">
                      <div className="text-gray-400">Element:</div>
                      <div>{sign.element}</div>
                      <div className="text-gray-400">Ruling Planet:</div>
                      <div>{sign.ruling}</div>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="text-xl font-alex-brush mb-4 heading-glow">Today's Horoscope</h3>
                    <p className="text-gray-300 mb-6 font-playfair leading-relaxed">{sign.horoscope}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="bg-pink-400 hover:bg-pink-500 text-black" asChild>
                        <Link href="/readings">Get a Detailed Reading</Link>
                      </Button>
                      <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10">
                        Share Horoscope
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 glass-card p-6 text-center">
          <h2 className="text-2xl font-alex-brush mb-4 heading-glow">Personalized Astrological Services</h2>
          <p className="text-gray-300 mb-6 font-playfair">
            Looking for deeper insights? Our expert astrologers offer personalized birth chart readings, compatibility
            analyses, and future forecasts tailored specifically to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-pink-400 hover:bg-pink-500 text-black" asChild>
              <Link href="/readings">Book an Astrology Reading</Link>
            </Button>
            <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10" asChild>
              <Link href="/shop">Browse Astrology Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
