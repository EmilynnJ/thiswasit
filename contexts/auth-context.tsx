"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id?: string
  email: string
  name?: string
  first_name?: string
  last_name?: string
  user_type: "client" | "reader" | "admin"
  picture?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()

  // Fetch user information on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/auth/me')
        
        if (response.ok) {
          const userData = await response.json()
          const userRole = getUserRole(userData)
          setUser({
            id: userData.sub,
            email: userData.email || '',
            name: userData.name,
            first_name: userData.given_name,
            last_name: userData.family_name,
            user_type: userRole,
            picture: userData.picture
          })
          setIsLoading(false)
        } else {
          // Not authenticated
          setUser(null)
          setIsLoading(false)
        }
      } catch (err) {
        console.error("Auth error:", err)
        setError(err instanceof Error ? err : new Error(String(err)))
        setUser(null)
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Log errors
  useEffect(() => {
    if (error) {
      console.error("Auth error:", error)
    }
  }, [error])

  const getUserRole = (user: any): "client" | "reader" | "admin" => {
    if (!user) return "client"
    
    // Check for Auth0 roles
    if (user['https://soulseer.com/roles']) {
      const roles = user['https://soulseer.com/roles'] as string[]
      if (roles.includes('admin')) return 'admin'
      if (roles.includes('reader')) return 'reader'
      if (roles.includes('client')) return 'client'
    }
    
    // Default to client
    return "client"
  }

  const refreshUser = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/me')
      
      if (response.ok) {
        const userData = await response.json()
        const userRole = getUserRole(userData)
        setUser({
          id: userData.sub,
          email: userData.email || '',
          name: userData.name,
          first_name: userData.given_name,
          last_name: userData.family_name,
          user_type: userRole,
          picture: userData.picture
        })
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error("Failed to refresh user:", err)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = () => {
    // Redirect to Auth0 login
    window.location.href = '/api/auth/login'
  }

  const logout = () => {
    // Redirect to Auth0 logout
    window.location.href = '/api/auth/logout'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
