import { withAuth } from "@/lib/auth-service"
import { getReaderProfile, createReaderProfile, updateReaderProfile } from "@/lib/repositories/user-profile-repository"

export const GET = withAuth(async (req: Request, user: any) => {
  if (user.user_type !== "reader" && user.user_type !== "admin") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const profile = await getReaderProfile(user.id)

    return new Response(JSON.stringify({ profile }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching reader profile:", error)
    return new Response(JSON.stringify({ error: "Failed to fetch profile" }), {
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
    const { bio, profileImage, specialties, yearsExperience, hourlyRate } = await req.json()

    // Check if profile already exists
    const existingProfile = await getReaderProfile(user.id)

    let profile
    if (existingProfile) {
      profile = await updateReaderProfile(
        user.id,
        bio,
        profileImage,
        specialties,
        yearsExperience,
        undefined,
        undefined,
        hourlyRate,
      )
    } else {
      profile = await createReaderProfile(user.id, bio, profileImage, specialties, yearsExperience, hourlyRate)
    }

    return new Response(JSON.stringify({ profile }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error updating reader profile:", error)
    return new Response(JSON.stringify({ error: "Failed to update profile" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
