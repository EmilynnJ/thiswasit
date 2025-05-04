"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: Array<"client" | "reader" | "admin">
}

export function ProtectedRoute({ children, allowedRoles = ["client", "reader", "admin"] }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page",
        variant: "destructive",
      })
      router.push("/auth")
      return
    }

    // If authenticated but not in allowed roles, redirect to unauthorized
    if (!isLoading && isAuthenticated && user && allowedRoles.length > 0) {
      if (!allowedRoles.includes(user.user_type)) {
        toast({
          title: "Access denied",
          description: "You don't have permission to access this page",
          variant: "destructive",
        })
        router.push("/unauthorized")
      }
    }
  }, [isLoading, isAuthenticated, user, router, allowedRoles, toast])

  // Show loading state
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-400 border-opacity-50 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Loading</h2>
          <p className="text-gray-400">Please wait while we verify your session...</p>
        </div>
      </div>
    )
  }

  // User is authenticated and authorized, render the protected content
  return <>{children}</>
}
