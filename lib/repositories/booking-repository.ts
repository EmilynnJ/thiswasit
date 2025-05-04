import { executeQuery } from "@/lib/db"

export async function createBooking(
  clientId: number,
  readerId: number,
  serviceId: number,
  bookingDate: string,
  startTime: string,
  endTime: string,
  amount: number,
) {
  const result = await executeQuery(
    `INSERT INTO bookings 
     (client_id, reader_id, service_id, booking_date, start_time, end_time, status, payment_status, amount)
     VALUES ($1, $2, $3, $4, $5, $6, 'pending', 'pending', $7)
     RETURNING *`,
    [clientId, readerId, serviceId, bookingDate, startTime, endTime, amount],
  )
  return result.length > 0 ? result[0] : null
}

export async function getBookingById(bookingId: number) {
  const result = await executeQuery(
    `SELECT b.*, 
            rs.service_name, rs.description as service_description, rs.duration,
            rp.profile_image as reader_image,
            u.first_name as reader_first_name, u.last_name as reader_last_name,
            cu.first_name as client_first_name, cu.last_name as client_last_name
     FROM bookings b
     JOIN reader_services rs ON b.service_id = rs.id
     JOIN reader_profiles rp ON b.reader_id = rp.id
     JOIN users u ON rp.user_id = u.id
     JOIN users cu ON b.client_id = cu.id
     WHERE b.id = $1`,
    [bookingId],
  )
  return result.length > 0 ? result[0] : null
}

export async function getClientBookings(clientId: number) {
  return executeQuery(
    `SELECT b.*, 
            rs.service_name, rs.duration,
            rp.profile_image as reader_image,
            u.first_name as reader_first_name, u.last_name as reader_last_name
     FROM bookings b
     JOIN reader_services rs ON b.service_id = rs.id
     JOIN reader_profiles rp ON b.reader_id = rp.id
     JOIN users u ON rp.user_id = u.id
     WHERE b.client_id = $1
     ORDER BY b.booking_date DESC, b.start_time DESC`,
    [clientId],
  )
}

export async function getReaderBookings(readerId: number) {
  return executeQuery(
    `SELECT b.*, 
            rs.service_name, rs.duration,
            u.first_name as client_first_name, u.last_name as client_last_name
     FROM bookings b
     JOIN reader_services rs ON b.service_id = rs.id
     JOIN users u ON b.client_id = u.id
     WHERE b.reader_id = $1
     ORDER BY b.booking_date DESC, b.start_time DESC`,
    [readerId],
  )
}

export async function updateBookingStatus(bookingId: number, status: string) {
  const result = await executeQuery(
    `UPDATE bookings
     SET status = $2, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [bookingId, status],
  )
  return result.length > 0 ? result[0] : null
}

export async function updatePaymentStatus(bookingId: number, paymentStatus: string) {
  const result = await executeQuery(
    `UPDATE bookings
     SET payment_status = $2, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [bookingId, paymentStatus],
  )
  return result.length > 0 ? result[0] : null
}
