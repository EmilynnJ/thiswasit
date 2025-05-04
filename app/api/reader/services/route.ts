import { withAuth } from "@/lib/auth-service"
import { getReaderProfile } from "@/lib/repositories/user-profile-repository"
import { getReaderServices, createReaderService } from "@/lib/repositories/user-profile-repository"

export const GET = withAuth(async (req: Request, user: any) => {
  if (user.user_type !== "reader" && user.user_type !== "admin" && user.user_type !== "client") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    // Get reader ID from query params or use the current user's reader profile
    const url = new URL(req.url)
    const readerId = url.searchParams.get("readerId")

    let readerProfileId

    if (readerId) {
      readerProfileId = Number.parseInt(readerId)
    } else if (user.user_type === "reader") {
      const profile = await getReaderProfile(user.id)
      if (!profile) {
        return new Response(JSON.stringify({ error: "Reader profile not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        })
      }
      readerProfileId = profile.id
    } else {
      return new Response(JSON.stringify({ error: "Reader ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const services = await getReaderServices(readerProfileId)

    return new Response(JSON.stringify({ services }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching reader services:", error)
    return new Response(JSON.stringify({ error: "Failed to fetch services" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})

export const POST = withAuth(async (req: Request, user: any) => {
  if (user.user_type !== "reader" && user.user_type !== "admin") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const { serviceName, description, duration, price } = await req.json()

    // Validate input
    if (!serviceName || !duration || !price) {
      return new Response(JSON.stringify({ error: "Service name, duration, and price are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Get reader profile
    const profile = await getReaderProfile(user.id)
    if (!profile) {
      return new Response(JSON.stringify({ error: "Reader profile not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    const service = await createReaderService(profile.id, serviceName, description, duration, price)

    return new Response(JSON.stringify({ service }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error creating reader service:", error)
    return new Response(JSON.stringify({ error: "Failed to create service" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
