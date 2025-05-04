"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Search,
  Play,
  ShoppingBag,
  MessageCircle,
  Users,
  LayoutDashboard,
  HelpCircle,
  User,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsDropdown } from "@/components/notifications/notifications-dropdown"

export function AppSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
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

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/readings", label: "Readings", icon: Search },
    { path: "/live", label: "Live", icon: Play },
    { path: "/shop", label: "Shop", icon: ShoppingBag },
    { path: "/community", label: "Community", icon: Users },
    { path: "/messages", label: "Messages", icon: MessageCircle },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/help", label: "Help Center", icon: HelpCircle },
  ]

  return (
    <Sidebar variant="floating" collapsible="icon" className="hidden md:flex">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-pink-400/20 flex items-center justify-center">
            <span className="font-alex-brush text-xl text-pink-400">S</span>
          </div>
          <h1 className="font-alex-brush text-2xl text-pink-400">SoulSeer</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild isActive={isActive(item.path)} tooltip={item.label}>
                <Link href={item.path}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile">
              <Link href="/profile" className="flex items-center gap-3">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-pink-400/20 text-pink-400 text-xs">U</AvatarFallback>
                </Avatar>
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="flex items-center justify-between px-2 py-1">
              <ThemeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/readings", label: "Readings", icon: Search },
    { path: "/live", label: "Live", icon: Play },
    { path: "/shop", label: "Shop", icon: ShoppingBag },
    { path: "/community", label: "Community", icon: Users },
    { path: "/messages", label: "Messages", icon: MessageCircle },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/help", label: "Help Center", icon: HelpCircle },
    { path: "/profile", label: "Profile", icon: User },
  ]

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  return (
    <>
      <header className="md:hidden glass-nav fixed top-0 left-0 right-0 z-50 p-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-400/20 flex items-center justify-center">
              <span className="font-alex-brush text-xl text-pink-400">S</span>
            </div>
            <h1 className="font-alex-brush text-2xl text-pink-400">SoulSeer</h1>
          </Link>
          <div className="flex items-center gap-2">
            <NotificationsDropdown />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm pt-16 md:hidden">
          <div className="container mx-auto p-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 p-3 rounded-md ${
                    isActive(item.path) ? "bg-pink-400/20 text-pink-400" : "text-gray-300 hover:bg-gray-800/50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
