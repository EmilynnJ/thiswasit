"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReaderCard } from "@/components/reader-card"
import { Search, Filter } from "lucide-react"

interface Reader {
  id: number
  name: string
  avatar: string
  specialty: string
  rating: number
  price: number
  isOnline: boolean
  languages?: string[]
  experience?: number
  tags?: string[]
}

export function AdvancedSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 10])
  const [ratingFilter, setRatingFilter] = useState("0")
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [specialtyFilter, setSpecialtyFilter] = useState<string[]>([])
  const [languageFilter, setLanguageFilter] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("rating")
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for readers
  const allReaders: Reader[] = [
    {
      id: 1,
      name: "Mystic Luna",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Tarot & Astrology",
      rating: 4.9,
      price: 3.99,
      isOnline: true,
      languages: ["English", "Spanish"],
      experience: 8,
      tags: ["Tarot", "Astrology", "Love", "Career"],
    },
    {
      id: 2,
      name: "Celestial Sage",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Spiritual Healing",
      rating: 4.8,
      price: 4.5,
      isOnline: true,
      languages: ["English", "French"],
      experience: 12,
      tags: ["Healing", "Chakra", "Meditation", "Spiritual Growth"],
    },
    {
      id: 3,
      name: "Aura Whisperer",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Aura Reading",
      rating: 4.7,
      price: 3.75,
      isOnline: true,
      languages: ["English"],
      experience: 5,
      tags: ["Aura", "Energy", "Healing", "Intuitive"],
    },
    {
      id: 4,
      name: "Cosmic Guide",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Psychic Medium",
      rating: 4.9,
      price: 5.25,
      isOnline: false,
      languages: ["English", "German"],
      experience: 15,
      tags: ["Medium", "Spirit", "Past Lives", "Guidance"],
    },
    {
      id: 5,
      name: "Ethereal Empath",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Empathic Readings",
      rating: 4.6,
      price: 3.5,
      isOnline: false,
      languages: ["English", "Italian"],
      experience: 7,
      tags: ["Empath", "Emotions", "Relationships", "Healing"],
    },
    {
      id: 6,
      name: "Starlight Oracle",
      avatar: "/placeholder.svg?height=100&width=100",
      specialty: "Oracle Cards",
      rating: 4.8,
      price: 4.0,
      isOnline: true,
      languages: ["English", "Portuguese"],
      experience: 10,
      tags: ["Oracle", "Divination", "Guidance", "Spiritual"],
    },
  ]

  // Filter readers based on search criteria
  const filteredReaders = allReaders.filter((reader) => {
    // Search term filter
    if (
      searchTerm &&
      !reader.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !reader.specialty.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !reader.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false
    }

    // Price range filter
    if (reader.price < priceRange[0] || reader.price > priceRange[1]) {
      return false
    }

    // Rating filter
    if (reader.rating < Number.parseFloat(ratingFilter)) {
      return false
    }

    // Online only filter
    if (onlineOnly && !reader.isOnline) {
      return false
    }

    // Specialty filter
    if (
      specialtyFilter.length > 0 &&
      !specialtyFilter.some((specialty) => reader.specialty.includes(specialty) || reader.tags?.includes(specialty))
    ) {
      return false
    }

    // Language filter
    if (languageFilter.length > 0 && !languageFilter.some((language) => reader.languages?.includes(language))) {
      return false
    }

    return true
  })

  // Sort readers
  const sortedReaders = [...filteredReaders].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "price_low":
        return a.price - b.price
      case "price_high":
        return b.price - a.price
      case "experience":
        return (b.experience || 0) - (a.experience || 0)
      default:
        return 0
    }
  })

  const handleSearch = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setSpecialtyFilter((prev) => [...prev, specialty])
    } else {
      setSpecialtyFilter((prev) => prev.filter((s) => s !== specialty))
    }
  }

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setLanguageFilter((prev) => [...prev, language])
    } else {
      setLanguageFilter((prev) => prev.filter((l) => l !== language))
    }
  }

  const specialties = ["Tarot", "Astrology", "Psychic", "Medium", "Healing", "Chakra", "Oracle", "Aura", "Empath"]

  const languages = ["English", "Spanish", "French", "German", "Italian", "Portuguese"]

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="glass-card p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by name, specialty, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700/50"
            />
          </div>
          <Button className="bg-pink-400 hover:bg-pink-500 text-black" onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </span>
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="space-y-6">
          <div className="glass-card p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2 text-pink-400" /> Filters
            </h3>

            <div className="space-y-6">
              {/* Price Range */}
              <div className="space-y-2">
                <Label className="text-sm">Price Range (per minute)</Label>
                <div className="pt-4">
                  <Slider defaultValue={[0, 10]} max={10} step={0.5} value={priceRange} onValueChange={setPriceRange} />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400 mt-2">
                  <span>${priceRange[0].toFixed(2)}</span>
                  <span>${priceRange[1].toFixed(2)}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label className="text-sm">Minimum Rating</Label>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700/50">
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any Rating</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Online Status */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="online-only"
                  checked={onlineOnly}
                  onCheckedChange={(checked) => setOnlineOnly(checked as boolean)}
                />
                <Label htmlFor="online-only" className="text-sm">
                  Online Now Only
                </Label>
              </div>

              {/* Specialties */}
              <div className="space-y-2">
                <Label className="text-sm">Specialties</Label>
                <div className="grid grid-cols-2 gap-2">
                  {specialties.map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox
                        id={`specialty-${specialty.toLowerCase()}`}
                        checked={specialtyFilter.includes(specialty)}
                        onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked as boolean)}
                      />
                      <Label htmlFor={`specialty-${specialty.toLowerCase()}`} className="text-sm">
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <Label className="text-sm">Languages</Label>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`language-${language.toLowerCase()}`}
                        checked={languageFilter.includes(language)}
                        onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                      />
                      <Label htmlFor={`language-${language.toLowerCase()}`} className="text-sm">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <Label className="text-sm">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700/50">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-gray-700/50 text-gray-300 hover:bg-gray-800/50"
            onClick={() => {
              setSearchTerm("")
              setPriceRange([0, 10])
              setRatingFilter("0")
              setOnlineOnly(false)
              setSpecialtyFilter([])
              setLanguageFilter([])
              setSortBy("rating")
            }}
          >
            Reset Filters
          </Button>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              {sortedReaders.length} {sortedReaders.length === 1 ? "Reader" : "Readers"} Found
            </h3>
            <div className="flex items-center text-sm text-gray-400">
              <span className="mr-1">Sorted by:</span>
              <span className="font-medium text-white">
                {sortBy === "rating"
                  ? "Highest Rated"
                  : sortBy === "price_low"
                    ? "Price: Low to High"
                    : sortBy === "price_high"
                      ? "Price: High to Low"
                      : "Most Experienced"}
              </span>
            </div>
          </div>

          {sortedReaders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedReaders.map((reader) => (
                <ReaderCard key={reader.id} reader={reader} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-6 text-center">
              <p className="text-gray-300 mb-4">No readers match your search criteria.</p>
              <p className="text-sm text-gray-400 mb-4">Try adjusting your filters or search term.</p>
              <Button
                variant="outline"
                className="border-pink-400 text-pink-400 hover:bg-pink-400/10"
                onClick={() => {
                  setSearchTerm("")
                  setPriceRange([0, 10])
                  setRatingFilter("0")
                  setOnlineOnly(false)
                  setSpecialtyFilter([])
                  setLanguageFilter([])
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
