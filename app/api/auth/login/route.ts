import { authenticateUser } from "@/lib/auth-service"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from 'next/server';

// Then use getDatabaseUrl() instead of process.env.DATABASE_URL
// This will suppress the warning while still using the actual value when available

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Authenticate user
    const result = await authenticateUser(email, password)

    if (!result) {
      return new Response(JSON.stringify({ error: "Invalid email or password" }), {
        status: 401,
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
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Login error:", error)
    return new Response(JSON.stringify({ error: "Login failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function GET(req: NextRequest) {
  // In a real implementation, this would redirect to Auth0 for authentication
  // For now, we'll redirect directly to our callback for testing
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  
  // Get the return_to parameter if it exists
  const returnTo = searchParams.get('return_to') || '/';
  
  // Redirect to the callback with some test parameters
  return NextResponse.redirect(new URL(`/auth/callback?code=test_code&state=${encodeURIComponent(returnTo)}`, url.origin));
}
