"use client"

import { useState } from "react"
import { PageContainer } from "@/components/page-container"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function TarotPage() {
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [revealedCards, setRevealedCards] = useState<number[]>([])
  const [isShuffling, setIsShuffling] = useState(false)

  // Mock tarot card data
  const tarotCards = [
    {
      id: 0,
      name: "The Fool",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "New beginnings, innocence, spontaneity, free spirit",
      reversedMeaning: "Recklessness, risk-taking, inconsideration",
    },
    {
      id: 1,
      name: "The Magician",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Manifestation, resourcefulness, power, inspired action",
      reversedMeaning: "Manipulation, poor planning, untapped talents",
    },
    {
      id: 2,
      name: "The High Priestess",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Intuition, sacred knowledge, divine feminine, subconscious mind",
      reversedMeaning: "Secrets, disconnected from intuition, withdrawal",
    },
    {
      id: 3,
      name: "The Empress",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Femininity, beauty, nature, nurturing, abundance",
      reversedMeaning: "Creative block, dependence, emptiness",
    },
    {
      id: 4,
      name: "The Emperor",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Authority, structure, control, fatherhood, stability",
      reversedMeaning: "Domination, excessive control, rigidity",
    },
    {
      id: 5,
      name: "The Hierophant",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Spiritual wisdom, tradition, conformity, morality, ethics",
      reversedMeaning: "Rebellion, subversiveness, new approaches",
    },
    {
      id: 6,
      name: "The Lovers",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Love, harmony, relationships, values alignment, choices",
      reversedMeaning: "Self-love, disharmony, imbalance, misalignment",
    },
    {
      id: 7,
      name: "The Chariot",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Control, willpower, success, action, determination",
      reversedMeaning: "Self-discipline, opposition, lack of direction",
    },
    {
      id: 8,
      name: "Strength",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Courage, persuasion, influence, compassion, inner strength",
      reversedMeaning: "Self-doubt, weakness, insecurity",
    },
    {
      id: 9,
      name: "The Hermit",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Soul-searching, introspection, solitude, inner guidance",
      reversedMeaning: "Isolation, loneliness, withdrawal",
    },
    {
      id: 10,
      name: "Wheel of Fortune",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Good luck, karma, life cycles, destiny, turning point",
      reversedMeaning: "Bad luck, resistance to change, breaking cycles",
    },
    {
      id: 11,
      name: "Justice",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Justice, fairness, truth, cause and effect, law",
      reversedMeaning: "Unfairness, dishonesty, lack of accountability",
    },
    {
      id: 12,
      name: "The Hanged Man",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Surrender, letting go, new perspectives, enlightenment",
      reversedMeaning: "Indecision, delay, resistance to change",
    },
    {
      id: 13,
      name: "Death",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Endings, change, transformation, transition",
      reversedMeaning: "Resistance to change, inability to move on",
    },
    {
      id: 14,
      name: "Temperance",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Balance, moderation, patience, purpose",
      reversedMeaning: "Imbalance, excess, lack of harmony",
    },
    {
      id: 15,
      name: "The Devil",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Shadow self, attachment, addiction, restriction, sexuality",
      reversedMeaning: "Releasing limiting beliefs, exploring dark thoughts, detachment",
    },
    {
      id: 16,
      name: "The Tower",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Sudden change, upheaval, chaos, revelation, awakening",
      reversedMeaning: "Fear of change, avoiding disaster, delaying the inevitable",
    },
    {
      id: 17,
      name: "The Star",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Hope, faith, purpose, renewal, spirituality",
      reversedMeaning: "Lack of faith, despair, discouragement",
    },
    {
      id: 18,
      name: "The Moon",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Illusion, fear, anxiety, subconscious, intuition",
      reversedMeaning: "Release of fear, repressed emotion, inner confusion",
    },
    {
      id: 19,
      name: "The Sun",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Positivity, fun, warmth, success, vitality",
      reversedMeaning: "Temporary depression, lack of success",
    },
    {
      id: 20,
      name: "Judgement",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Judgement, rebirth, inner calling, absolution",
      reversedMeaning: "Self-doubt, refusal of self-examination",
    },
    {
      id: 21,
      name: "The World",
      image: "/placeholder.svg?height=300&width=150",
      meaning: "Completion, integration, accomplishment, travel",
      reversedMeaning: "Lack of completion, stagnation",
    },
  ]

  const shuffleCards = () => {
    setIsShuffling(true)
    setSelectedCards([])
    setRevealedCards([])

    setTimeout(() => {
      // Randomly select 3 cards
      const shuffled = [...Array(tarotCards.length).keys()].sort(() => 0.5 - Math.random()).slice(0, 3)

      setSelectedCards(shuffled)
      setIsShuffling(false)
    }, 1500)
  }

  const revealCard = (index: number) => {
    if (!revealedCards.includes(index)) {
      setRevealedCards([...revealedCards, index])
    }
  }

  const isReversed = (index: number) => {
    // Randomly determine if a card is reversed (50% chance)
    return Math.random() < 0.5
  }

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-alex-brush text-center mb-8 heading-glow">Daily Tarot Reading</h1>

        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <p className="text-center font-playfair">
              Welcome to your daily tarot guidance. Focus on a question or situation in your life, then shuffle the deck
              and select three cards to reveal insights about your past, present, and future.
            </p>
          </CardContent>
        </Card>

        <div className="mb-8 text-center">
          <Button
            className="bg-pink-400 hover:bg-pink-500 text-black px-8 py-6 text-lg"
            onClick={shuffleCards}
            disabled={isShuffling}
          >
            {isShuffling ? "Shuffling..." : selectedCards.length > 0 ? "Shuffle Again" : "Shuffle the Deck"}
          </Button>
        </div>

        {selectedCards.length > 0 && (
          <div className="glass-card p-6 mb-8">
            <h2 className="text-2xl font-alex-brush text-center mb-6 heading-glow">Your Three-Card Spread</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((position) => {
                const cardIndex = selectedCards[position]
                const card = tarotCards[cardIndex]
                const revealed = revealedCards.includes(position)
                const reversed = isReversed(position)

                return (
                  <div key={position} className="flex flex-col items-center">
                    <h3 className="text-xl font-alex-brush mb-3 heading-glow">
                      {position === 0 ? "Past" : position === 1 ? "Present" : "Future"}
                    </h3>

                    {revealed ? (
                      <div className="text-center">
                        <div className="relative h-80 w-40 mx-auto mb-4">
                          <Image
                            src={card.image || "/placeholder.svg"}
                            alt={card.name}
                            fill
                            className={`object-cover rounded-lg ${reversed ? "rotate-180" : ""}`}
                          />
                        </div>
                        <h4 className="font-alex-brush text-lg heading-glow mb-2">
                          {card.name} {reversed ? "(Reversed)" : ""}
                        </h4>
                        <p className="text-sm text-gray-300 font-playfair">
                          {reversed ? card.reversedMeaning : card.meaning}
                        </p>
                      </div>
                    ) : (
                      <div
                        className="h-80 w-40 bg-gray-800/70 rounded-lg border border-gray-700/50 flex items-center justify-center cursor-pointer hover:border-pink-400 transition-colors"
                        onClick={() => revealCard(position)}
                      >
                        <div className="text-center p-4">
                          <div className="w-12 h-12 rounded-full bg-pink-400/20 flex items-center justify-center mx-auto mb-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-pink-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 11l5-5m0 0l5 5m-5-5v12"
                              />
                            </svg>
                          </div>
                          <p className="text-gray-300 font-playfair">Click to Reveal</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="glass-card p-6 text-center">
          <h2 className="text-2xl font-alex-brush mb-4 heading-glow">Deepen Your Tarot Journey</h2>
          <p className="text-gray-300 mb-6 font-playfair">
            This simple reading offers a glimpse into tarot's wisdom. For a more comprehensive and personalized
            interpretation, connect with one of our experienced tarot readers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-pink-400 hover:bg-pink-500 text-black" asChild>
              <Link href="/readings">Book a Tarot Reading</Link>
            </Button>
            <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10" asChild>
              <Link href="/shop">Browse Tarot Decks</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
