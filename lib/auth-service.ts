import { executeQuery } from "./db"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import type { User } from "./repositories/user-repository"

// Use the provided JWT secret
const JWT_SECRET = new TextEncoder().encode(
  "b580a2780dfbd6e7093fbdfb1fce5409442afcd55ec1cf2b4671cc086ff9ad9e6971f59603c013abacfee58e96f926e080d517f583211f44177f6d1114e2ec72afc68227cdcef465ce6f19940a94253884633c8bf70096a1ea63fc366a3acc38aad9f1264cbf304b8eba68bc925ba7875d644b88b91c317f7beef3167326482a",
)

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function authenticateUser(email: string, password: string): Promise<{ user: User; token: string } | null> {
  try {
    // Get user with password
    const result = await executeQuery("SELECT * FROM users WHERE email = $1", [email])

    if (result.length === 0) {
      return null
    }

    const user = result[0]
    const passwordValid = await verifyPassword(password, user.password_hash)

    if (!passwordValid) {
      return null
    }

    // Create JWT token
    const token = await createToken(user)

    // Return user without password hash
    const { password_hash, ...userWithoutPassword } = user
    return { user: userWithoutPassword, token }
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

export async function createToken(user: User): Promise<string> {
  // Create a JWT that expires in 2 hours
  return new SignJWT({
    id: user.id,
    email: user.email,
    user_type: user.user_type,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const payload = await verifyToken(token)

    if (!payload || !payload.id) {
      return null
    }

    const result = await executeQuery(
      "SELECT id, email, first_name, last_name, user_type, created_at, updated_at FROM users WHERE id = $1",
      [payload.id],
    )

    return result.length > 0 ? result[0] : null
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

export async function registerUser(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  userType: "client" | "reader" | "admin" = "client",
): Promise<{ user: User; token: string } | null> {
  try {
    // Check if user already exists
    const existingUser = await executeQuery("SELECT id FROM users WHERE email = $1", [email])

    if (existingUser.length > 0) {
      return null // User already exists
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const result = await executeQuery(
      `INSERT INTO users (email, password_hash, first_name, last_name, user_type) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, email, first_name, last_name, user_type, created_at, updated_at`,
      [email, hashedPassword, firstName, lastName, userType],
    )

    if (result.length === 0) {
      return null
    }

    const user = result[0]

    // Create wallet for the user
    await executeQuery(
      `INSERT INTO wallet_balances (user_id, balance) 
       VALUES ($1, $2)`,
      [user.id, 0],
    )

    // Create JWT token
    const token = await createToken(user)

    return { user, token }
  } catch (error) {
    console.error("Registration error:", error)
    return null
  }
}

export async function logoutUser() {
  const cookieStore = cookies()
  cookieStore.delete("auth-token")
}

// Role-based authorization middleware
export function withAuth(handler: any, allowedRoles?: string[]) {
  return async (req: Request) => {
    const user = await getCurrentUser()

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (allowedRoles && !allowedRoles.includes(user.user_type)) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    }

    return handler(req, user)
  }
}
