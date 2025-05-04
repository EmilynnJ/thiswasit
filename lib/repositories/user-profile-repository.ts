import { executeQuery } from "@/lib/db"

// Client profile functions
export async function getClientProfile(userId: number) {
  const result = await executeQuery(`SELECT * FROM client_profiles WHERE user_id = $1`, [userId])
  return result.length > 0 ? result[0] : null
}

export async function createClientProfile(userId: number, bio?: string, profileImage?: string, preferences?: any) {
  const result = await executeQuery(
    `INSERT INTO client_profiles (user_id, bio, profile_image, preferences)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, bio || null, profileImage || null, preferences ? JSON.stringify(preferences) : null],
  )
  return result.length > 0 ? result[0] : null
}

export async function updateClientProfile(userId: number, bio?: string, profileImage?: string, preferences?: any) {
  const result = await executeQuery(
    `UPDATE client_profiles
     SET bio = COALESCE($2, bio),
         profile_image = COALESCE($3, profile_image),
         preferences = COALESCE($4, preferences),
         updated_at = CURRENT_TIMESTAMP
     WHERE user_id = $1
     RETURNING *`,
    [userId, bio, profileImage, preferences ? JSON.stringify(preferences) : null],
  )
  return result.length > 0 ? result[0] : null
}

// Reader profile functions
export async function getReaderProfile(userId: number) {
  const result = await executeQuery(`SELECT * FROM reader_profiles WHERE user_id = $1`, [userId])
  return result.length > 0 ? result[0] : null
}

export async function getReaderProfileById(readerId: number) {
  const result = await executeQuery(
    `SELECT rp.*, u.first_name, u.last_name, u.email
     FROM reader_profiles rp
     JOIN users u ON rp.user_id = u.id
     WHERE rp.id = $1`,
    [readerId],
  )
  return result.length > 0 ? result[0] : null
}

export async function createReaderProfile(
  userId: number,
  bio?: string,
  profileImage?: string,
  specialties?: string[],
  yearsExperience?: number,
  hourlyRate?: number,
) {
  const result = await executeQuery(
    `INSERT INTO reader_profiles 
     (user_id, bio, profile_image, specialties, years_experience, hourly_rate)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [userId, bio || null, profileImage || null, specialties || null, yearsExperience || 0, hourlyRate || 0],
  )
  return result.length > 0 ? result[0] : null
}

export async function updateReaderProfile(
  userId: number,
  bio?: string,
  profileImage?: string,
  specialties?: string[],
  yearsExperience?: number,
  isFeatured?: boolean,
  isOnline?: boolean,
  hourlyRate?: number,
) {
  const result = await executeQuery(
    `UPDATE reader_profiles
     SET bio = COALESCE($2, bio),
         profile_image = COALESCE($3, profile_image),
         specialties = COALESCE($4, specialties),
         years_experience = COALESCE($5, years_experience),
         is_featured = COALESCE($6, is_featured),
         is_online = COALESCE($7, is_online),
         hourly_rate = COALESCE($8, hourly_rate),
         updated_at = CURRENT_TIMESTAMP
     WHERE user_id = $1
     RETURNING *`,
    [userId, bio, profileImage, specialties, yearsExperience, isFeatured, isOnline, hourlyRate],
  )
  return result.length > 0 ? result[0] : null
}

// Reader availability functions
export async function getReaderAvailability(readerId: number) {
  return executeQuery(`SELECT * FROM reader_availability WHERE reader_id = $1 ORDER BY day_of_week, start_time`, [
    readerId,
  ])
}

export async function addReaderAvailability(
  readerId: number,
  dayOfWeek: number,
  startTime: string,
  endTime: string,
  timezone = "UTC",
) {
  const result = await executeQuery(
    `INSERT INTO reader_availability (reader_id, day_of_week, start_time, end_time, timezone)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [readerId, dayOfWeek, startTime, endTime, timezone],
  )
  return result.length > 0 ? result[0] : null
}

export async function updateReaderAvailability(
  id: number,
  dayOfWeek: number,
  startTime: string,
  endTime: string,
  timezone?: string,
) {
  const result = await executeQuery(
    `UPDATE reader_availability
     SET day_of_week = $2,
         start_time = $3,
         end_time = $4,
         timezone = COALESCE($5, timezone),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [id, dayOfWeek, startTime, endTime, timezone],
  )
  return result.length > 0 ? result[0] : null
}

export async function deleteReaderAvailability(id: number) {
  return executeQuery(`DELETE FROM reader_availability WHERE id = $1`, [id])
}

// Reader services functions
export async function getReaderServices(readerId: number) {
  return executeQuery(`SELECT * FROM reader_services WHERE reader_id = $1 AND is_active = true ORDER BY price`, [
    readerId,
  ])
}

export async function getReaderService(serviceId: number) {
  const result = await executeQuery(`SELECT * FROM reader_services WHERE id = $1`, [serviceId])
  return result.length > 0 ? result[0] : null
}

export async function createReaderService(
  readerId: number,
  serviceName: string,
  description: string,
  duration: number,
  price: number,
) {
  const result = await executeQuery(
    `INSERT INTO reader_services (reader_id, service_name, description, duration, price)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [readerId, serviceName, description, duration, price],
  )
  return result.length > 0 ? result[0] : null
}

export async function updateReaderService(
  serviceId: number,
  serviceName?: string,
  description?: string,
  duration?: number,
  price?: number,
  isActive?: boolean,
) {
  const result = await executeQuery(
    `UPDATE reader_services
     SET service_name = COALESCE($2, service_name),
         description = COALESCE($3, description),
         duration = COALESCE($4, duration),
         price = COALESCE($5, price),
         is_active = COALESCE($6, is_active),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [serviceId, serviceName, description, duration, price, isActive],
  )
  return result.length > 0 ? result[0] : null
}

export async function deleteReaderService(serviceId: number) {
  return executeQuery(`UPDATE reader_services SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1`, [
    serviceId,
  ])
}
