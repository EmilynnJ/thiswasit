"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="border-gray-700">
        <Moon className="h-5 w-5 text-gray-400" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="border-gray-700"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Moon className="h-5 w-5 text-gray-400" /> : <Sun className="h-5 w-5 text-yellow-400" />}
    </Button>
  )
}
