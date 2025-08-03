"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Play,
  ShoppingBag,
  MessageCircle,
  Users,
  LayoutDashboard,
  Menu,
  X,
  FileText,
  HelpCircle,
  User,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsDropdown } from "@/components/notifications/notifications-dropdown"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export function TopNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) {
    return null
  }

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  const mainNavItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/readings", label: "Readings", icon: Sparkles },
    { path: "/live", label: "Live", icon: Play },
    { path: "/shop", label: "Shop", icon: ShoppingBag },
    { path: "/community", label: "Community", icon: Users },
    { path: "/messages", label: "Messages", icon: MessageCircle },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/help", label: "Help Center", icon: HelpCircle },
    { path: "/profile", label: "Profile", icon: User },
    { path: "/policies", label: "Policies", icon: FileText },
  ]

  // Dashboards submenu items
  const dashboardItems = [
    { path: "/admin-dashboard", label: "Admin Dashboard" },
    { path: "/reader-dashboard", label: "Reader Dashboard" },
    { path: "/client-dashboard", label: "Client Dashboard" },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <header className={`hidden md:block sticky top-0 z-50 ${isScrolled ? "glass-nav" : "bg-transparent"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Sign In/Up */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-alex-brush text-pink-400 title-glow">SoulSeer</span>
              </Link>

              <SignedOut>
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-gray-300 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-pink-400 hover:bg-pink-500 text-black">Sign Up</Button>
                </Link>
              </SignedOut>
            </div>

            {/* Center - Main Navigation */}
            <div className="flex items-center justify-center">
              <nav className="flex items-center space-x-1">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? "text-pink-400 bg-pink-400/10"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Side - Theme and Notifications */}
            <div className="flex items-center gap-4">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
                <NotificationsDropdown />
              </SignedIn>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Header */}
      <header className="md:hidden glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-alex-brush text-pink-400 title-glow">SoulSeer</span>
          </Link>

          <div className="flex items-center gap-2">
            <NotificationsDropdown />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm pt-16 md:hidden">
          <div className="container mx-auto p-4">
            <div className="flex flex-col gap-6">
              {/* Navigation Section */}
              <div>
                <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2 px-3">Navigation</h3>
                <nav className="flex flex-col gap-1">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex items-center gap-3 p-3 rounded-md ${
                        isActive(item.path) ? "bg-pink-400/20 text-pink-400" : "text-gray-300 hover:bg-gray-800/50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Dashboards Section */}
              <div>
                <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2 px-3">Dashboards</h3>
                <nav className="flex flex-col gap-1">
                  {dashboardItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex items-center gap-3 p-3 rounded-md ${
                        isActive(item.path) ? "bg-pink-400/20 text-pink-400" : "text-gray-300 hover:bg-gray-800/50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Auth Buttons */}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-800">
                <SignedOut>
                  <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-gray-700 text-gray-300">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-pink-400 hover:bg-pink-500 text-black">Sign Up</Button>
                  </Link>
                </SignedOut>
                <SignedIn>
                  {/* The UserButton can be placed here if needed, or rely on the desktop one */}
                </SignedIn>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                <span className="text-gray-400">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
