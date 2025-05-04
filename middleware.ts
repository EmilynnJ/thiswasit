import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// Routes that don't require authentication
const publicRoutes = ["/", "/auth", "/about", "/contact", "/faq", "/blog"]

// Routes that require specific roles
const roleRoutes = {
  client: ["/dashboard", "/payment", "/messages", "/reading"],
  reader: ["/reader-dashboard", "/readings/manage"],
  admin: ["/admin-dashboard", "/admin"],
}

// Use the same JWT secret as in auth-service.ts
const JWT_SECRET = new TextEncoder().encode(
  "b580a2780dfbd6e7093fbdfb1fce5409442afcd55ec1cf2b4671cc086ff9ad9e6971f59603c013abacfee58e96f926e080d517f583211f44177f6d1114e2ec72afc68227cdcef465ce6f19940a94253884633c8bf70096a1ea63fc366a3acc38aad9f1264cbf304b8eba68bc925ba7875d644b88b91c317f7beef3167326482a",
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is public
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Get the token from the cookies
  const token = request.cookies.get("auth-token")?.value

  // If there's no token and the route requires authentication
  if (!token) {
    return redirectToLogin(request)
  }

  try {
    // Verify the token
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const userType = payload.user_type as string

    // Check if the user has access to the requested route based on their role
    if (pathname.startsWith("/reader-dashboard") && userType !== "reader") {
      return redirectToUnauthorized(request)
    }

    if (pathname.startsWith("/admin-dashboard") && userType !== "admin") {
      return redirectToUnauthorized(request)
    }

    // Check client-specific routes
    if (
      (pathname.startsWith("/dashboard") ||
        pathname.startsWith("/payment") ||
        pathname.startsWith("/messages") ||
        pathname.startsWith("/reading")) &&
      userType !== "client" &&
      userType !== "reader" &&
      userType !== "admin"
    ) {
      return redirectToUnauthorized(request)
    }

    // User is authenticated and authorized
    return NextResponse.next()
  } catch (error) {
    // Token is invalid
    console.error("Token verification failed:", error)
    return redirectToLogin(request)
  }
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/auth?tab=signin", request.url)
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

function redirectToUnauthorized(request: NextRequest) {
  return NextResponse.redirect(new URL("/unauthorized", request.url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes that handle their own authentication
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)",
  ],
}
