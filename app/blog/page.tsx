import { PageContainer } from "@/components/page-container"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  // Mock blog post data
  const featuredPosts = [
    {
      id: "understanding-tarot",
      slug: "understanding-tarot-beyond-fortune-telling",
      title: "Understanding Tarot: Beyond Fortune Telling",
      excerpt:
        "Discover how tarot cards can be used as a powerful tool for self-reflection and personal growth, beyond their traditional association with predicting the future.",
      image: "/placeholder.svg?height=400&width=800",
      category: "Tarot",
      author: {
        name: "Mystic Luna",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "March 15, 2025",
      readTime: "8 min read",
    },
    {
      id: "astrology-career",
      slug: "using-astrology-to-navigate-career-changes",
      title: "Using Astrology to Navigate Career Changes",
      excerpt:
        "Learn how your birth chart can provide insights into your professional strengths and ideal career paths, especially during times of transition.",
      image: "/placeholder.svg?height=400&width=800",
      category: "Astrology",
      author: {
        name: "Celestial Sage",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "March 10, 2025",
      readTime: "6 min read",
    },
  ]

  const recentPosts = [
    {
      id: "crystal-healing",
      slug: "crystal-healing-beginners-guide",
      title: "Crystal Healing: A Beginner's Guide to Energy Work",
      excerpt:
        "Explore the basics of crystal healing, including how to choose, cleanse, and use crystals to balance your energy and enhance your well-being.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Energy Healing",
      author: {
        name: "Crystal Guardian",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "March 8, 2025",
      readTime: "5 min read",
    },
    {
      id: "meditation-techniques",
      slug: "meditation-techniques-for-psychic-development",
      title: "Meditation Techniques for Psychic Development",
      excerpt:
        "Discover effective meditation practices designed to enhance your intuition and develop your natural psychic abilities.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Psychic Development",
      author: {
        name: "Aura Whisperer",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "March 5, 2025",
      readTime: "7 min read",
    },
    {
      id: "moon-phases",
      slug: "harnessing-moon-phases-for-manifestation",
      title: "Harnessing Moon Phases for Manifestation",
      excerpt:
        "Learn how to align your intention-setting and manifestation practices with the natural cycles of the moon for more powerful results.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Manifestation",
      author: {
        name: "Lunar Guide",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "March 1, 2025",
      readTime: "6 min read",
    },
    {
      id: "past-lives",
      slug: "signs-you-may-have-lived-past-lives",
      title: "5 Signs You May Have Lived Past Lives",
      excerpt:
        "Explore the common indicators that suggest you might have memories or connections to previous incarnations and what they could mean for your current life path.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Spirituality",
      author: {
        name: "Soul Journeyer",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "February 25, 2025",
      readTime: "5 min read",
    },
  ]

  const categories = [
    { id: "tarot", name: "Tarot", count: 24 },
    { id: "astrology", name: "Astrology", count: 18 },
    { id: "psychic", name: "Psychic Development", count: 15 },
    { id: "healing", name: "Energy Healing", count: 12 },
    { id: "manifestation", name: "Manifestation", count: 10 },
    { id: "spirituality", name: "Spirituality", count: 22 },
    { id: "meditation", name: "Meditation", count: 14 },
    { id: "relationships", name: "Love & Relationships", count: 16 },
  ]

  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-alex-brush text-center mb-8 heading-glow">Spiritual Insights Blog</h1>

        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search articles..."
              className="pl-10 py-6 bg-gray-800/50 border-gray-700/50 text-lg font-playfair"
            />
            <Button className="absolute right-1 top-1 bg-pink-400 hover:bg-pink-500 text-black">Search</Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full mb-12">
          <TabsList className="bg-gray-800/70 backdrop-blur-sm border-gray-700/50 p-1 mb-6 flex flex-wrap">
            <TabsTrigger value="all" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              All Topics
            </TabsTrigger>
            {categories.slice(0, 6).map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-pink-400 data-[state=active]:text-black"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Featured Posts */}
        <section className="mb-12">
          <h2 className="text-2xl font-alex-brush mb-6 heading-glow">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="glass-card overflow-hidden">
                <div className="relative h-48 md:h-64">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  <div className="absolute top-2 left-2 bg-pink-400 text-black text-xs px-2 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-pink-400 transition-colors">
                    <h3 className="text-xl font-alex-brush heading-glow">{post.title}</h3>
                  </Link>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-300 mb-4 font-playfair line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback className="bg-pink-400/20 text-pink-400">{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-playfair">{post.author.name}</span>
                    </div>
                    <div className="text-xs text-gray-400 font-playfair">
                      {post.date} · {post.readTime}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-pink-400 text-pink-400 hover:bg-pink-400/10"
                    asChild
                  >
                    <Link href={`/blog/${post.slug}`}>Read Full Article</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section className="mb-12">
          <h2 className="text-2xl font-alex-brush mb-6 heading-glow">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPosts.map((post) => (
              <Card key={post.id} className="glass-card overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3 relative h-32 sm:h-auto">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="sm:w-2/3 p-4">
                    <div className="text-xs text-pink-400 mb-1 font-playfair">{post.category}</div>
                    <Link href={`/blog/${post.slug}`} className="hover:text-pink-400 transition-colors">
                      <h3 className="text-lg font-alex-brush heading-glow mb-2">{post.title}</h3>
                    </Link>
                    <p className="text-gray-300 text-sm mb-3 font-playfair line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 font-playfair">{post.date}</span>
                      <span className="text-gray-400 font-playfair">{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button className="bg-pink-400 hover:bg-pink-500 text-black">View All Articles</Button>
          </div>
        </section>

        {/* Categories and Subscribe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <h2 className="text-xl font-alex-brush heading-glow">Subscribe to Our Newsletter</h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 font-playfair">
                  Stay updated with our latest articles, spiritual insights, and exclusive offers. We'll send you weekly
                  inspiration to support your spiritual journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input placeholder="Your email address" className="bg-gray-800/50 border-gray-700/50 font-playfair" />
                  <Button className="bg-pink-400 hover:bg-pink-500 text-black whitespace-nowrap">Subscribe</Button>
                </div>
                <p className="text-xs text-gray-400 mt-2 font-playfair">
                  By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="glass-card">
              <CardHeader>
                <h2 className="text-xl font-alex-brush heading-glow">Categories</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-playfair">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <Link href={`/blog/category/${category.id}`} className="text-gray-300 hover:text-pink-400">
                        {category.name}
                      </Link>
                      <span className="text-xs text-gray-400">{category.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
