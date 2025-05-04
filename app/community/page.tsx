import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Heart, Share2, Plus, Bookmark, TrendingUp, Users } from "lucide-react"

export default function CommunityPage() {
  // Mock data for forum posts
  const forumPosts = [
    {
      id: 1,
      title: "Understanding Tarot Card Reversals",
      author: "Mystic Luna",
      authorAvatar: "/placeholder.svg?height=100&width=100",
      date: "2 hours ago",
      content:
        "I've been practicing tarot for years and still find reversed cards challenging. What's your approach to interpreting them? Do you read them as blocked energy, opposite meaning, or something else entirely?",
      likes: 24,
      comments: 12,
      tags: ["Tarot", "Discussion"],
    },
    {
      id: 2,
      title: "Meditation Techniques for Enhancing Psychic Abilities",
      author: "Celestial Sage",
      authorAvatar: "/placeholder.svg?height=100&width=100",
      date: "Yesterday",
      content:
        "I wanted to share some meditation techniques that have helped me enhance my psychic abilities over the years. Consistent practice is key, but these specific visualizations have accelerated my development.",
      likes: 56,
      comments: 18,
      tags: ["Meditation", "Psychic Development"],
    },
    {
      id: 3,
      title: "Crystal Combinations for Protection",
      author: "Crystal Guardian",
      authorAvatar: "/placeholder.svg?height=100&width=100",
      date: "3 days ago",
      content:
        "What are your favorite crystal combinations for spiritual protection? I've been working with black tourmaline and clear quartz, but I'm looking to create a more comprehensive grid for my home.",
      likes: 42,
      comments: 31,
      tags: ["Crystals", "Protection"],
    },
  ]

  // Mock data for trending topics
  const trendingTopics = [
    { id: 1, name: "Full Moon Rituals", posts: 128 },
    { id: 2, name: "Shadow Work", posts: 95 },
    { id: 3, name: "Astral Projection", posts: 87 },
    { id: 4, name: "Twin Flames", posts: 76 },
    { id: 5, name: "Chakra Healing", posts: 64 },
  ]

  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-playfair">Community</h1>
        <Button className="bg-pink-400 hover:bg-pink-500 text-black">
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>

      {/* Discord and Patreon Community Sections */}
      <section className="mb-12">
        <h2 className="text-2xl font-alex-brush heading-glow mb-6">Join Our Communities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Discord Community */}
          <Card className="glass-card overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-[#5865F2]/20 flex items-center justify-center">
                  <svg className="h-6 w-6 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-alex-brush heading-glow">Discord Community</h3>
                  <p className="text-sm text-gray-400">Connect with spiritual seekers worldwide</p>
                </div>
              </div>

              <p className="text-gray-300 mb-4 font-playfair text-sm sm:text-base">
                Join our vibrant Discord community where you can connect with like-minded individuals on their spiritual
                journey. Our Discord server offers a safe and supportive space for growth and exploration.
              </p>

              <h4 className="font-medium mb-3 text-pink-400">Community Benefits:</h4>
              <ul className="space-y-2 mb-6 font-playfair text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-pink-400/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-pink-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">Free weekly community readings and events</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-pink-400/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-pink-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">Dedicated channels for different spiritual practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-pink-400/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-pink-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">Direct access to our readers for quick questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-pink-400/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-pink-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">Exclusive Discord-only discounts and promotions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-pink-400/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-pink-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">Early announcements for upcoming features and events</span>
                </li>
              </ul>

              <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white" asChild>
                <a href="https://discord.gg/Wbue7BGUe5" target="_blank" rel="noopener noreferrer">
                  <Users className="mr-2 h-4 w-4" /> Join Our Discord
                </a>
              </Button>
            </div>
          </Card>

          {/* Patreon Community */}
          <Card className="glass-card overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-[#FF424D]/20 flex items-center justify-center">
                  <svg className="h-6 w-6 text-[#FF424D]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 .48v23.04h4.22V.48zm15.385 0c-4.764 0-8.641 3.88-8.641 8.65 0 4.755 3.877 8.623 8.641 8.623 4.75 0 8.615-3.868 8.615-8.623C24 4.36 20.136.48 15.385.48z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-alex-brush heading-glow">Patreon Membership</h3>
                  <p className="text-sm text-gray-400">Premium spiritual content and experiences</p>
                </div>
              </div>

              <p className="text-gray-300 mb-4 font-playfair text-sm sm:text-base">
                Become a patron and gain access to exclusive content, personalized readings, and advanced spiritual
                development resources. Support our mission while accelerating your spiritual growth.
              </p>

              <h4 className="font-medium mb-3 text-pink-400">Membership Benefits:</h4>
              <ul className="space-y-2 mb-6 font-playfair text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-pink-400/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-pink-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">Monthly personal readings with our top psychics</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-pink-400/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-pink-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">Exclusive spiritual development workshops and courses</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-pink-400/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-pink-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">Priority booking with your favorite readers</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-pink-400/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-pink-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">Behind-the-scenes content and reader interviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-pink-400/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-pink-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">Substantial discounts on all readings and products</span>
                </li>
              </ul>

              <Button className="w-full bg-[#FF424D] hover:bg-[#E5353F] text-white" asChild>
                <a
                  href="https://patreon.com/SoulSeer?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Users className="mr-2 h-4 w-4" /> Join Our Patreon
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="discussions" className="w-full">
            <TabsList className="bg-gray-800/70 backdrop-blur-sm border-gray-700/50 p-1 mb-6 overflow-x-auto flex-nowrap">
              <TabsTrigger
                value="discussions"
                className="data-[state=active]:bg-pink-400 data-[state=active]:text-black"
              >
                Discussions
              </TabsTrigger>
              <TabsTrigger
                value="reader-insights"
                className="data-[state=active]:bg-pink-400 data-[state=active]:text-black"
              >
                Reader Insights
              </TabsTrigger>
              <TabsTrigger value="saved" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
                Saved
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discussions" className="mt-0 space-y-6">
              {forumPosts.map((post) => (
                <Card key={post.id} className="glass-card hover:border-pink-400 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="hidden sm:block">
                        <AvatarImage src={post.authorAvatar} alt={post.author} />
                        <AvatarFallback className="bg-pink-400/20 text-pink-400">{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base sm:text-lg">{post.title}</CardTitle>
                            <CardDescription className="text-xs sm:text-sm">
                              Posted by {post.author} • {post.date}
                            </CardDescription>
                          </div>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-pink-400">
                            <Bookmark className="h-5 w-5" />
                          </Button>
                        </div>
                        <p className="text-gray-300 my-3 text-sm sm:text-base">{post.content}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-pink-400/10 text-pink-400 rounded-full text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-pink-400 text-xs sm:text-sm"
                          >
                            <Heart className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> {post.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-pink-400 text-xs sm:text-sm"
                          >
                            <MessageSquare className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> {post.comments}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-pink-400 text-xs sm:text-sm"
                          >
                            <Share2 className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="reader-insights" className="mt-0">
              <Card className="glass-card p-6 text-center">
                <p className="text-gray-300 mb-4">Reader insights will appear here.</p>
                <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10">
                  Follow Readers
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="saved" className="mt-0">
              <Card className="glass-card p-6 text-center">
                <p className="text-gray-300 mb-4">You haven't saved any posts yet.</p>
                <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10">
                  Browse Discussions
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-pink-400" /> Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendingTopics.map((topic) => (
                <div key={topic.id} className="flex items-center justify-between">
                  <a href="#" className="text-gray-300 hover:text-pink-400">
                    #{topic.name}
                  </a>
                  <span className="text-xs text-gray-400">{topic.posts} posts</span>
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t border-gray-700/50 pt-4">
              <Button variant="ghost" className="w-full text-pink-400 hover:bg-pink-400/10">
                View All Topics
              </Button>
            </CardFooter>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-gray-300">• Be respectful and supportive of others</p>
              <p className="text-gray-300">• No spam or self-promotion</p>
              <p className="text-gray-300">• Keep discussions on-topic</p>
              <p className="text-gray-300">• Respect privacy and confidentiality</p>
              <p className="text-gray-300">• No hate speech or harassment</p>
            </CardContent>
            <CardFooter className="border-t border-gray-700/50 pt-4">
              <Button variant="ghost" className="w-full text-pink-400 hover:bg-pink-400/10">
                Read Full Guidelines
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
