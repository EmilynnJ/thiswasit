import { withAuth } from "@/lib/auth-service"
import { getClientProfile, createClientProfile, updateClientProfile } from "@/lib/repositories/user-profile-repository"

export const GET = withAuth(async (req: Request, user: any) => {
  if (user.user_type !== "client" && user.user_type !== "admin") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const profile = await getClientProfile(user.id)

    return new Response(JSON.stringify({ profile }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching client profile:", error)
    return new Response(JSON.stringify({ error: "Failed to fetch profile" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})

export const POST = withAuth(async (req: Request, user: any) => {
  if (user.user_type !== "client" && user.user_type !== "admin") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const { bio, profileImage, preferences } = await req.json()

    // Check if profile already exists
    const existingProfile = await getClientProfile(user.id)

    let profile
    if (existingProfile) {
      profile = await updateClientProfile(user.id, bio, profileImage, preferences)
    } else {
      profile = await createClientProfile(user.id, bio, profileImage, preferences)
    }

    return new Response(JSON.stringify({ profile }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error updating client profile:", error)
    return new Response(JSON.stringify({ error: "Failed to update profile" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
