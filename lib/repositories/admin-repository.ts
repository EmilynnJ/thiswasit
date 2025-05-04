import { executeQuery } from "@/lib/db"

// Content moderation
export async function getModerationReports(status?: string) {
  const query = status
    ? `SELECT mr.*, 
              u1.email as reporter_email, u1.first_name as reporter_first_name, u1.last_name as reporter_last_name,
              u2.email as reported_user_email, u2.first_name as reported_user_first_name, u2.last_name as reported_user_last_name,
              u3.email as reviewer_email
       FROM moderation_reports mr
       LEFT JOIN users u1 ON mr.reporter_id = u1.id
       LEFT JOIN users u2 ON mr.reported_user_id = u2.id
       LEFT JOIN users u3 ON mr.reviewed_by = u3.id
       WHERE mr.status = $1
       ORDER BY mr.created_at DESC`
    : `SELECT mr.*, 
              u1.email as reporter_email, u1.first_name as reporter_first_name, u1.last_name as reporter_last_name,
              u2.email as reported_user_email, u2.first_name as reported_user_first_name, u2.last_name as reported_user_last_name,
              u3.email as reviewer_email
       FROM moderation_reports mr
       LEFT JOIN users u1 ON mr.reporter_id = u1.id
       LEFT JOIN users u2 ON mr.reported_user_id = u2.id
       LEFT JOIN users u3 ON mr.reviewed_by = u3.id
       ORDER BY 
         CASE 
           WHEN mr.status = 'pending' THEN 0
           WHEN mr.status = 'reviewed' THEN 1
           ELSE 2
         END,
         mr.created_at DESC`

  return executeQuery(query, status ? [status] : [])
}

export async function createModerationReport(
  reporterId: number,
  reportedUserId: number,
  contentType: string,
  contentId: number,
  reason: string,
) {
  const result = await executeQuery(
    `INSERT INTO moderation_reports 
     (reporter_id, reported_user_id, content_type, content_id, reason, status)
     VALUES ($1, $2, $3, $4, $5, 'pending')
     RETURNING *`,
    [reporterId, reportedUserId, contentType, contentId, reason],
  )
  return result.length > 0 ? result[0] : null
}

export async function updateModerationReport(reportId: number, status: string, adminNotes: string, reviewedBy: number) {
  const result = await executeQuery(
    `UPDATE moderation_reports
     SET status = $2, admin_notes = $3, reviewed_by = $4, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [reportId, status, adminNotes, reviewedBy],
  )
  return result.length > 0 ? result[0] : null
}

// Disputes
export async function getDisputes(status?: string) {
  const query = status
    ? `SELECT d.*, 
              u1.email as client_email, u1.first_name as client_first_name, u1.last_name as client_last_name,
              u2.first_name as reader_first_name, u2.last_name as reader_last_name,
              u3.email as resolver_email
       FROM disputes d
       LEFT JOIN users u1 ON d.client_id = u1.id
       LEFT JOIN reader_profiles rp ON d.reader_id = rp.id
       LEFT JOIN users u2 ON rp.user_id = u2.id
       LEFT JOIN users u3 ON d.resolved_by = u3.id
       WHERE d.status = $1
       ORDER BY d.created_at DESC`
    : `SELECT d.*, 
              u1.email as client_email, u1.first_name as client_first_name, u1.last_name as client_last_name,
              u2.first_name as reader_first_name, u2.last_name as reader_last_name,
              u3.email as resolver_email
       FROM disputes d
       LEFT JOIN users u1 ON d.client_id = u1.id
       LEFT JOIN reader_profiles rp ON d.reader_id = rp.id
       LEFT JOIN users u2 ON rp.user_id = u2.id
       LEFT JOIN users u3 ON d.resolved_by = u3.id
       ORDER BY 
         CASE 
           WHEN d.status = 'open' THEN 0
           WHEN d.status = 'under_review' THEN 1
           ELSE 2
         END,
         d.created_at DESC`

  return executeQuery(query, status ? [status] : [])
}

export async function createDispute(clientId: number, readerId: number, bookingId: number, reason: string) {
  const result = await executeQuery(
    `INSERT INTO disputes 
     (client_id, reader_id, booking_id, reason, status)
     VALUES ($1, $2, $3, $4, 'open')
     RETURNING *`,
    [clientId, readerId, bookingId, reason],
  )
  return result.length > 0 ? result[0] : null
}

export async function updateDisputeStatus(disputeId: number, status: string, resolution?: string, resolvedBy?: number) {
  const result = await executeQuery(
    `UPDATE disputes
     SET status = $2, resolution = $3, resolved_by = $4, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [disputeId, status, resolution || null, resolvedBy || null],
  )
  return result.length > 0 ? result[0] : null
}

// Admin analytics
export async function getUserStats() {
  return executeQuery(
    `SELECT 
       COUNT(*) as total_users,
       COUNT(CASE WHEN user_type = 'client' THEN 1 END) as client_count,
       COUNT(CASE WHEN user_type = 'reader' THEN 1 END) as reader_count,
       COUNT(CASE WHEN user_type = 'admin' THEN 1 END) as admin_count,
       COUNT(CASE WHEN created_at > CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as new_users_last_week
     FROM users`,
    [],
  )
}

export async function getTransactionStats() {
  return executeQuery(
    `SELECT 
       COUNT(*) as total_transactions,
       SUM(amount) as total_amount,
       COUNT(CASE WHEN type = 'deposit' THEN 1 END) as deposit_count,
       SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END) as deposit_amount,
       COUNT(CASE WHEN type = 'payment' THEN 1 END) as payment_count,
       SUM(CASE WHEN type = 'payment' THEN amount ELSE 0 END) as payment_amount,
       COUNT(CASE WHEN created_at > CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as transactions_last_week,
       SUM(CASE WHEN created_at > CURRENT_DATE - INTERVAL '7 days' THEN amount ELSE 0 END) as amount_last_week
     FROM transactions`,
    [],
  )
}

export async function getBookingStats() {
  return executeQuery(
    `SELECT 
       COUNT(*) as total_bookings,
       COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
       COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_count,
       COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_count,
       COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_count,
       COUNT(CASE WHEN created_at > CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as bookings_last_week
     FROM bookings`,
    [],
  )
}

export async function getReaderEarningStats() {
  return executeQuery(
    `SELECT 
       COUNT(*) as total_earnings,
       SUM(amount) as total_amount,
       SUM(platform_fee) as total_platform_fee,
       SUM(net_amount) as total_net_amount,
       COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
       SUM(CASE WHEN status = 'pending' THEN net_amount ELSE 0 END) as pending_amount,
       COUNT(CASE WHEN status = 'paid' THEN 1 END) as paid_count,
       SUM(CASE WHEN status = 'paid' THEN net_amount ELSE 0 END) as paid_amount,
       COUNT(CASE WHEN created_at > CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as earnings_last_week,
       SUM(CASE WHEN created_at > CURRENT_DATE - INTERVAL '7 days' THEN net_amount ELSE 0 END) as amount_last_week
     FROM reader_earnings`,
    [],
  )
}
