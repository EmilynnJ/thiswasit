import { PageContainer } from "@/components/page-container"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, Share2, Bookmark, Heart, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Mock blog post data - in a real app, this would come from a database or CMS
  const post = {
    slug: params.slug,
    title: "Understanding Tarot: Beyond Fortune Telling",
    excerpt:
      "Discover how tarot cards can be used as a powerful tool for self-reflection and personal growth, beyond their traditional association with predicting the future.",
    content: `
      <p>Tarot cards have long been associated with fortune-telling and predicting the future. However, this ancient practice offers much more than glimpses into what might come. At its core, tarot is a powerful tool for self-reflection, personal growth, and accessing your intuition.</p>
      
      <h2>The Origins of Tarot</h2>
      
      <p>Contrary to popular belief, tarot cards weren't originally designed for divination. The earliest known tarot decks appeared in Italy in the 15th century as playing cards for games. It wasn't until the 18th century that they began to be widely used for spiritual and divinatory purposes.</p>
      
      <p>The standard tarot deck consists of 78 cards divided into two groups: the Major Arcana (22 cards representing major life themes and spiritual lessons) and the Minor Arcana (56 cards divided into four suits that address day-to-day situations and challenges).</p>
      
      <h2>Tarot as a Mirror</h2>
      
      <p>Rather than predicting fixed outcomes, tarot cards serve as mirrors reflecting aspects of our subconscious mind. When we draw cards, we're not being told what will happen, but rather what energies are at play in our lives and what potential outcomes might manifest based on our current path.</p>
      
      <p>The imagery and symbolism in tarot cards tap into universal archetypes that resonate with our deeper selves. This is why the same card can have different meanings for different people or in different situations—the cards speak to us through our own intuitive understanding.</p>
      
      <h2>Psychological Benefits of Tarot</h2>
      
      <p>Many psychologists and therapists have recognized the value of tarot as a psychological tool. The practice of reading tarot can:</p>
      
      <ul>
        <li>Provide a framework for examining complex emotions and situations</li>
        <li>Offer new perspectives on challenges you're facing</li>
        <li>Help identify patterns in your thinking or behavior</li>
        <li>Facilitate decision-making by clarifying your values and priorities</li>
        <li>Promote mindfulness and present-moment awareness</li>
      </ul>
      
      <p>When approached with intention and an open mind, tarot becomes less about predicting the future and more about understanding yourself and your relationship to the world around you.</p>
      
      <h2>Getting Started with Reflective Tarot Practice</h2>
      
      <p>If you're interested in exploring tarot as a tool for self-reflection, here are some steps to begin:</p>
      
      <ol>
        <li><strong>Choose a deck that resonates with you.</strong> The traditional Rider-Waite-Smith deck is excellent for beginners due to its clear imagery and wealth of available resources, but follow your intuition.</li>
        <li><strong>Familiarize yourself with the cards.</strong> Spend time looking at each card, noting your immediate reactions and feelings.</li>
        <li><strong>Start with simple spreads.</strong> A daily one-card draw is perfect for beginners—simply ask what energy you need to be aware of today.</li>
        <li><strong>Keep a tarot journal.</strong> Record your draws, your interpretations, and how they manifested in your day.</li>
        <li><strong>Approach with curiosity, not fear.</strong> There are no "bad" cards—each offers valuable insights and lessons.</li>
      </ol>
      
      <h2>Beyond Divination: Practical Applications</h2>
      
      <p>Tarot can be incorporated into many aspects of personal development:</p>
      
      <p><strong>Creative Inspiration:</strong> Writers, artists, and musicians often use tarot to overcome creative blocks and generate new ideas.</p>
      
      <p><strong>Problem-Solving:</strong> Drawing cards can help you see different angles of a problem and potential solutions you hadn't considered.</p>
      
      <p><strong>Meditation Focus:</strong> Using a card as a meditation focal point can deepen your practice and provide themes for contemplation.</p>
      
      <p><strong>Shadow Work:</strong> Tarot is excellent for exploring the hidden aspects of yourself that Jung called the "shadow"—those parts we often repress or deny.</p>
      
      <h2>Conclusion</h2>
      
      <p>While tarot can certainly be used for divination, its greatest value lies in its ability to connect us with our inner wisdom. By shifting our perspective from "What will happen to me?" to "What do I need to know about this situation?", we reclaim our agency and recognize that we are active participants in creating our future, not passive recipients of fate.</p>
      
      <p>Whether you're a skeptic or a believer, tarot offers a structured system for self-reflection that has benefited countless individuals on their personal growth journeys. The cards don't hold magical powers—the magic happens in the space between the cards and your own intuition, where meaning is created and insights emerge.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    category: "Tarot",
    author: {
      name: "Mystic Luna",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Tarot reader and spiritual guide with over 15 years of experience. Specializes in using tarot as a tool for personal growth and self-discovery.",
    },
    date: "March 15, 2025",
    readTime: "8 min read",
    tags: ["Tarot", "Self-Development", "Spirituality", "Divination", "Intuition"],
  }

  // Related posts
  const relatedPosts = [
    {
      id: "tarot-spreads",
      slug: "5-essential-tarot-spreads-for-self-discovery",
      title: "5 Essential Tarot Spreads for Self-Discovery",
      image: "/placeholder.svg?height=200&width=300",
      date: "March 8, 2025",
    },
    {
      id: "tarot-journaling",
      slug: "tarot-journaling-deepening-your-practice",
      title: "Tarot Journaling: Deepening Your Practice",
      image: "/placeholder.svg?height=200&width=300",
      date: "March 1, 2025",
    },
    {
      id: "shadow-work",
      slug: "using-tarot-for-shadow-work",
      title: "Using Tarot for Shadow Work",
      image: "/placeholder.svg?height=200&width=300",
      date: "February 22, 2025",
    },
  ]

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-gray-300 hover:text-pink-400 font-playfair">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Blog
          </Link>
        </div>

        <article className="mb-12">
          <div className="mb-8">
            <div className="text-pink-400 mb-2 font-playfair">{post.category}</div>
            <h1 className="text-4xl font-alex-brush mb-4 heading-glow">{post.title}</h1>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback className="bg-pink-400/20 text-pink-400">{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium font-playfair">{post.author.name}</div>
                  <div className="text-sm text-gray-400 font-playfair">
                    {post.date} · {post.readTime}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-pink-400">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-pink-400">
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="relative h-80 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          <Card className="glass-card">
            <CardContent className="p-6 md:p-8">
              <div
                className="prose prose-invert max-w-none font-playfair prose-headings:font-alex-brush prose-headings:heading-glow"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="flex flex-wrap gap-2 mt-8">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-3 py-1 bg-gray-800/50 hover:bg-pink-400/20 text-gray-300 hover:text-pink-400 rounded-full text-sm transition-colors font-playfair"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-700/50">
                <div className="flex gap-4">
                  <Button variant="ghost" className="flex items-center gap-2 text-gray-400 hover:text-pink-400">
                    <Heart className="h-5 w-5" />
                    <span>124</span>
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2 text-gray-400 hover:text-pink-400">
                    <MessageSquare className="h-5 w-5" />
                    <span>18</span>
                  </Button>
                </div>
                <Button variant="ghost" className="text-gray-400 hover:text-pink-400">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Card className="glass-card p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback className="bg-pink-400/20 text-pink-400 text-xl">
                    {post.author.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-alex-brush mb-2 heading-glow">About {post.author.name}</h3>
                  <p className="text-gray-300 font-playfair">{post.author.bio}</p>
                </div>
                <Button className="bg-pink-400 hover:bg-pink-500 text-black whitespace-nowrap">View Profile</Button>
              </div>
            </Card>
          </div>
        </article>

        <section>
          <h2 className="text-2xl font-alex-brush mb-6 heading-glow">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Card key={post.id} className="glass-card overflow-hidden">
                <div className="relative h-40">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <Link href={`/blog/${post.slug}`} className="hover:text-pink-400 transition-colors">
                    <h3 className="font-alex-brush heading-glow text-lg mb-2">{post.title}</h3>
                  </Link>
                  <div className="text-xs text-gray-400 font-playfair">{post.date}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  )
}
