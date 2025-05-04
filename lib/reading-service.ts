export interface ReadingRates {
  chat: number
  call: number
  video: number
}

export type ReadingType = "chat" | "call" | "video"

export function getReaderRates(readerId: string): ReadingRates {
  // Mock data for reader rates - in a real app, this would come from a database
  const rates = {
    "1": {
      chat: 399, // cents
      call: 450, // cents
      video: 525, // cents
    },
    "2": {
      chat: 425,
      call: 475,
      video: 550,
    },
    "3": {
      chat: 375,
      call: 425,
      video: 500,
    },
  }

  return (
    rates[readerId as keyof typeof rates] || {
      chat: 399,
      call: 450,
      video: 525,
    }
  )
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export async function startReading(
  readerId: number,
  clientId: number,
  type: ReadingType,
): Promise<{ success: boolean; session?: any; error?: string }> {
  // In a real application, this function would:
  // 1. Check if the user has sufficient funds.
  // 2. Create a new reading session in the database.
  // 3. Reserve the funds from the user's account.
  // 4. Potentially trigger a notification to the reader.

  // Mock implementation:
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        session: {
          id: Math.floor(Math.random() * 1000), // Mock session ID
          readerId: readerId,
          clientId: clientId,
          type: type,
          startTime: new Date(),
        },
      })
    }, 500)
  })
}

export async function endReading(sessionId: number): Promise<{ success: boolean; session?: any; error?: string }> {
  // In a real application, this function would:
  // 1. Mark the reading session as complete in the database.
  // 2. Calculate the final cost of the reading.
  // 3. Transfer the funds from the user's account to the reader's account.

  // Mock implementation:
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        session: {
          id: sessionId,
          endTime: new Date(),
          totalCost: Math.floor(Math.random() * 5000) / 100, // Mock total cost
        },
      })
    }, 500)
  })
}
