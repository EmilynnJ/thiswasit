import { PageContainer } from "@/components/page-container"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Clock, Calendar, MessageSquare, Heart, Bookmark, Settings } from "lucide-react"
import Link from "next/link"

export default function UserProfilePage() {
  // Mock user data
  const user = {
    name: "Astral Seeker",
    username: "@astralseeker",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Spiritual explorer on a journey of self-discovery. Passionate about tarot, astrology, and energy healing. Always seeking to expand my consciousness and connect with like-minded souls.",
    location: "Portland, OR",
    memberSince: "January 2023",
    readings: 42,
    favoriteReaders: 5,
  }

  // Mock favorite readers
  const favoriteReaders = [
    {
      id: 1,
      name: "Mystic Luna",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Tarot & Astrology",
      rating: 4.9,
      readings: 8,
    },
    {
      id: 2,
      name: "Celestial Sage",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Spiritual Healing",
      rating: 4.8,
      readings: 5,
    },
    {
      id: 3,
      name: "Aura Whisperer",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Aura Reading",
      rating: 4.7,
      readings: 3,
    },
  ]

  // Mock recent readings
  const recentReadings = [
    {
      id: "reading_1",
      reader: "Mystic Luna",
      readerAvatar: "/placeholder.svg?height=100&width=100",
      type: "Tarot Reading",
      date: "March 15, 2025",
      duration: "30 minutes",
      rating: 5,
    },
    {
      id: "reading_2",
      reader: "Celestial Sage",
      readerAvatar: "/placeholder.svg?height=100&width=100",
      type: "Energy Healing",
      date: "March 8, 2025",
      duration: "45 minutes",
      rating: 5,
    },
    {
      id: "reading_3",
      reader: "Aura Whisperer",
      readerAvatar: "/placeholder.svg?height=100&width=100",
      type: "Aura Reading",
      date: "February 28, 2025",
      duration: "20 minutes",
      rating: 4,
    },
  ]

  // Mock saved articles
  const savedArticles = [
    {
      id: "article_1",
      title: "Understanding Tarot: Beyond Fortune Telling",
      excerpt: "Discover how tarot cards can be used as a powerful tool for self-reflection and personal growth.",
      image: "/placeholder.svg?height=100&width=200",
      date: "Saved on March 16, 2025",
      link: "/blog/understanding-tarot-beyond-fortune-telling",
    },
    {
      id: "article_2",
      title: "5 Essential Tarot Spreads for Self-Discovery",
      excerpt: "Learn these fundamental tarot layouts to gain deeper insights into yourself and your path.",
      image: "/placeholder.svg?height=100&width=200",
      date: "Saved on March 10, 2025",
      link: "/blog/5-essential-tarot-spreads-for-self-discovery",
    },
  ]

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <Button variant="ghost" className="text-gray-400 hover:text-white" asChild>
            <Link href="/profile">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <Avatar className="h-24 w-24 md:h-32 md:w-32">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-pink-400/20 text-pink-400 text-2xl">{user.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl font-alex-brush heading-glow mb-1">{user.name}</h1>
                  <p className="text-gray-400 mb-4 font-playfair">{user.username}</p>

                  <p className="text-gray-300 mb-4 font-playfair">{user.bio}</p>

                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center text-sm text-gray-400 font-playfair">
                      <Calendar className="h-4 w-4 mr-1 text-pink-400" />
                      Member since {user.memberSince}
                    </div>
                    <div className="flex items-center text-sm text-gray-400 font-playfair">
                      <MessageSquare className="h-4 w-4 mr-1 text-pink-400" />
                      {user.readings} readings
                    </div>
                    <div className="flex items-center text-sm text-gray-400 font-playfair">
                      <Heart className="h-4 w-4 mr-1 text-pink-400" />
                      {user.favoriteReaders} favorite readers
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="readings" className="w-full">
          <TabsList className="bg-gray-800/70 backdrop-blur-sm border-gray-700/50 p-1 mb-6">
            <TabsTrigger value="readings" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              Recent Readings
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              Favorite Readers
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              Saved Articles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="readings" className="mt-0">
            <div className="space-y-4">
              {recentReadings.map((reading) => (
                <Card key={reading.id} className="glass-card">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={reading.readerAvatar} alt={reading.reader} />
                        <AvatarFallback className="bg-pink-400/20 text-pink-400">{reading.reader[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h3 className="font-medium font-playfair">
                              {reading.type} with {reading.reader}
                            </h3>
                            <div className="flex items-center text-sm text-gray-400 font-playfair">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{reading.date}</span>
                              <span className="mx-2">•</span>
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{reading.duration}</span>
                            </div>
                          </div>

                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < reading.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50"
                          >
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50"
                          >
                            Book Again
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="text-center mt-6">
                <Button className="bg-pink-400 hover:bg-pink-500 text-black" asChild>
                  <Link href="/dashboard">View All Readings</Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {favoriteReaders.map((reader) => (
                <Card key={reader.id} className="glass-card">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-16 w-16 mb-3">
                        <AvatarImage src={reader.avatar} alt={reader.name} />
                        <AvatarFallback className="bg-pink-400/20 text-pink-400">{reader.name[0]}</AvatarFallback>
                      </Avatar>

                      <h3 className="font-alex-brush heading-glow text-lg mb-1">{reader.name}</h3>
                      <p className="text-sm text-gray-300 mb-2 font-playfair">{reader.specialty}</p>

                      <div className="flex items-center mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < reader.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                          />
                        ))}
                        <span className="text-xs text-gray-400 ml-1 font-playfair">{reader.rating}</span>
                      </div>

                      <p className="text-xs text-gray-400 mb-4 font-playfair">{reader.readings} readings together</p>

                      <Button className="w-full bg-pink-400 hover:bg-pink-500 text-black" asChild>
                        <Link href={`/book/${reader.id}`}>Book Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-6">
              <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10" asChild>
                <Link href="/readings">Discover More Readers</Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-0">
            <div className="space-y-4">
              {savedArticles.map((article) => (
                <Card key={article.id} className="glass-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/4 relative h-32 sm:h-auto">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="sm:w-3/4 p-4">
                        <div className="flex items-start justify-between">
                          <Link href={article.link} className="hover:text-pink-400 transition-colors">
                            <h3 className="font-alex-brush heading-glow text-lg mb-2">{article.title}</h3>
                          </Link>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-pink-400">
                            <Bookmark className="h-5 w-5 fill-current" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-300 mb-3 font-playfair line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 font-playfair">{article.date}</span>
                          <Button variant="link" className="text-pink-400 p-0 h-auto" asChild>
                            <Link href={article.link}>Read Article</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="text-center mt-6">
                <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10" asChild>
                  <Link href="/blog">Explore More Articles</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  )
}
