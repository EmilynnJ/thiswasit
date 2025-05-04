"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Facebook, Github, Mail, ShieldCheck, Sparkles, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface AuthFormsProps {
  defaultTab?: string
}

export function AuthForms({ defaultTab = "signin" }: AuthFormsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const { login } = useAuth()

  // Update active tab if URL param changes
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "signup") {
      setActiveTab("signup")
    } else if (tab === "signin") {
      setActiveTab("signin")
    }
  }, [searchParams])

  const handleAuth0Login = () => {
    setIsLoading(true)
    login()
  }

  // For testing different roles
  const loginAsRole = (role: string) => {
    setIsLoading(true)
    window.location.href = `/api/auth/${role}`
  }

  return (
    <Card className="w-full max-w-md glass-card border-gray-700/50">
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-pink-400/20 flex items-center justify-center">
              <span className="font-alex-brush text-2xl text-pink-400">S</span>
            </div>
          </div>
          <TabsList className="grid grid-cols-2 w-full bg-gray-800/70">
            <TabsTrigger value="signin" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
              Sign Up
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <TabsContent value="signin">
          <CardContent className="space-y-4 pt-4">
            <div className="text-center mb-4">
              <p className="text-gray-400">Sign in to access your account</p>
            </div>
            <Button 
              onClick={handleAuth0Login} 
              className="w-full bg-pink-400 hover:bg-pink-500 text-black flex items-center justify-center"
              disabled={isLoading}
            >
              <Mail className="mr-2 h-4 w-4" />
              Continue with Email
            </Button>
            
            {/* Test buttons for different roles */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-3 text-center">Test Logins (Dev Only)</p>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={() => loginAsRole('me')} className="flex items-center justify-center">
                  <User className="mr-1 h-3 w-3" />
                  Client
                </Button>
                <Button variant="outline" size="sm" onClick={() => loginAsRole('reader')} className="flex items-center justify-center">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Reader
                </Button>
                <Button variant="outline" size="sm" onClick={() => loginAsRole('admin')} className="flex items-center justify-center">
                  <ShieldCheck className="mr-1 h-3 w-3" />
                  Admin
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700"></span>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-black px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button variant="outline" className="border-gray-700" onClick={handleAuth0Login}>
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" className="border-gray-700" onClick={handleAuth0Login}>
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
            </div>
          </CardFooter>
        </TabsContent>

        <TabsContent value="signup">
          <CardContent className="space-y-4 pt-4">
            <div className="text-center mb-4">
              <p className="text-gray-400">Create a new account</p>
            </div>
            <Button 
              onClick={handleAuth0Login} 
              className="w-full bg-pink-400 hover:bg-pink-500 text-black flex items-center justify-center"
              disabled={isLoading}
            >
              <Mail className="mr-2 h-4 w-4" />
              Sign Up with Email
            </Button>
            
            {/* Test buttons for different roles */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-3 text-center">Test Signups (Dev Only)</p>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={() => loginAsRole('me')} className="flex items-center justify-center">
                  <User className="mr-1 h-3 w-3" />
                  Client
                </Button>
                <Button variant="outline" size="sm" onClick={() => loginAsRole('reader')} className="flex items-center justify-center">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Reader
                </Button>
                <Button variant="outline" size="sm" onClick={() => loginAsRole('admin')} className="flex items-center justify-center">
                  <ShieldCheck className="mr-1 h-3 w-3" />
                  Admin
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700"></span>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-black px-2 text-gray-500">Or sign up with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button variant="outline" className="border-gray-700" onClick={handleAuth0Login}>
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" className="border-gray-700" onClick={handleAuth0Login}>
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
            </div>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
