import { executeQuery } from "@/lib/db"

export async function getVirtualGifts() {
  return executeQuery(`SELECT * FROM virtual_gifts WHERE is_active = true ORDER BY price`, [])
}

export async function getVirtualGiftById(giftId: number) {
  const result = await executeQuery(`SELECT * FROM virtual_gifts WHERE id = $1`, [giftId])
  return result.length > 0 ? result[0] : null
}

export async function createGiftTransaction(
  senderId: number,
  recipientId: number,
  giftId: number,
  amount: number,
  streamId?: number,
  message?: string,
) {
  const result = await executeQuery(
    `INSERT INTO gift_transactions 
     (sender_id, recipient_id, gift_id, stream_id, amount, message)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [senderId, recipientId, giftId, streamId || null, amount, message || null],
  )
  return result.length > 0 ? result[0] : null
}

export async function getGiftTransactionsByRecipient(recipientId: number) {
  return executeQuery(
    `SELECT gt.*, 
            vg.name as gift_name, vg.image_url as gift_image,
            u.first_name as sender_first_name, u.last_name as sender_last_name
     FROM gift_transactions gt
     JOIN virtual_gifts vg ON gt.gift_id = vg.id
     JOIN users u ON gt.sender_id = u.id
     WHERE gt.recipient_id = $1
     ORDER BY gt.created_at DESC`,
    [recipientId],
  )
}

export async function getGiftTransactionsBySender(senderId: number) {
  return executeQuery(
    `SELECT gt.*, 
            vg.name as gift_name, vg.image_url as gift_image,
            rp.profile_image as recipient_image,
            u.first_name as recipient_first_name, u.last_name as recipient_last_name
     FROM gift_transactions gt
     JOIN virtual_gifts vg ON gt.gift_id = vg.id
     JOIN reader_profiles rp ON gt.recipient_id = rp.id
     JOIN users u ON rp.user_id = u.id
     WHERE gt.sender_id = $1
     ORDER BY gt.created_at DESC`,
    [senderId],
  )
}

export async function getGiftTransactionsByStream(streamId: number) {
  return executeQuery(
    `SELECT gt.*, 
            vg.name as gift_name, vg.image_url as gift_image,
            u.first_name as sender_first_name, u.last_name as sender_last_name
     FROM gift_transactions gt
     JOIN virtual_gifts vg ON gt.gift_id = vg.id
     JOIN users u ON gt.sender_id = u.id
     WHERE gt.stream_id = $1
     ORDER BY gt.created_at DESC`,
    [streamId],
  )
}
