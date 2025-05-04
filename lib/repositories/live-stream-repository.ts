import { executeQuery } from "@/lib/db"

export async function createLiveStream(
  readerId: number,
  title: string,
  description: string,
  scheduledStart: string,
  thumbnailUrl?: string,
) {
  const result = await executeQuery(
    `INSERT INTO live_streams 
     (reader_id, title, description, scheduled_start, status, thumbnail_url)
     VALUES ($1, $2, $3, $4, 'scheduled', $5)
     RETURNING *`,
    [readerId, title, description, scheduledStart, thumbnailUrl],
  )
  return result.length > 0 ? result[0] : null
}

export async function getLiveStreamById(streamId: number) {
  const result = await executeQuery(
    `SELECT ls.*, 
            rp.profile_image as reader_image,
            u.first_name as reader_first_name, u.last_name as reader_last_name
     FROM live_streams ls
     JOIN reader_profiles rp ON ls.reader_id = rp.id
     JOIN users u ON rp.user_id = u.id
     WHERE ls.id = $1`,
    [streamId],
  )
  return result.length > 0 ? result[0] : null
}

export async function getActiveLiveStreams() {
  return executeQuery(
    `SELECT ls.*, 
            rp.profile_image as reader_image,
            u.first_name as reader_first_name, u.last_name as reader_last_name
     FROM live_streams ls
     JOIN reader_profiles rp ON ls.reader_id = rp.id
     JOIN users u ON rp.user_id = u.id
     WHERE ls.status = 'live'
     ORDER BY ls.actual_start DESC`,
    [],
  )
}

export async function getUpcomingLiveStreams() {
  return executeQuery(
    `SELECT ls.*, 
            rp.profile_image as reader_image,
            u.first_name as reader_first_name, u.last_name as reader_last_name
     FROM live_streams ls
     JOIN reader_profiles rp ON ls.reader_id = rp.id
     JOIN users u ON rp.user_id = u.id
     WHERE ls.status = 'scheduled' AND ls.scheduled_start > CURRENT_TIMESTAMP
     ORDER BY ls.scheduled_start ASC`,
    [],
  )
}

export async function getReaderLiveStreams(readerId: number) {
  return executeQuery(
    `SELECT * FROM live_streams
     WHERE reader_id = $1
     ORDER BY 
       CASE 
         WHEN status = 'live' THEN 0
         WHEN status = 'scheduled' THEN 1
         ELSE 2
       END,
       COALESCE(actual_start, scheduled_start) DESC`,
    [readerId],
  )
}

export async function startLiveStream(streamId: number) {
  const result = await executeQuery(
    `UPDATE live_streams
     SET status = 'live', actual_start = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [streamId],
  )
  return result.length > 0 ? result[0] : null
}

export async function endLiveStream(streamId: number) {
  const result = await executeQuery(
    `UPDATE live_streams
     SET status = 'ended', actual_end = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [streamId],
  )
  return result.length > 0 ? result[0] : null
}

export async function updateViewerCount(streamId: number, viewerCount: number) {
  const result = await executeQuery(
    `UPDATE live_streams
     SET viewer_count = $2, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [streamId, viewerCount],
  )
  return result.length > 0 ? result[0] : null
}

export async function cancelLiveStream(streamId: number) {
  const result = await executeQuery(
    `UPDATE live_streams
     SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [streamId],
  )
  return result.length > 0 ? result[0] : null
}
