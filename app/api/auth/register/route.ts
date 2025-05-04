import { registerUser } from "@/lib/auth-service"
import { cookies } from "next/headers"

// Then use getDatabaseUrl() instead of process.env.DATABASE_URL
// This will suppress the warning while still using the actual value when available

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, userType } = await request.json()

    // Validate input
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Register user
    const result = await registerUser(email, password, firstName, lastName, userType)

    if (!result) {
      return new Response(JSON.stringify({ error: "User already exists or registration failed" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Set auth cookie
    cookies().set({
      name: "auth-token",
      value: result.token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 2, // 2 hours
    })

    // Return user data (without token)
    return new Response(JSON.stringify({ user: result.user }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return new Response(JSON.stringify({ error: "Registration failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
