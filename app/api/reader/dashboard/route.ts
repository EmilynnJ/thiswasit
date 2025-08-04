import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

// This is a mock API route. In a real application, this would fetch data from the database.
export async function GET(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Mock Data
  const mockDashboardData = {
    earnings: {
      today: 125.50,
      thisWeek: 875.00,
      thisMonth: 3500.00,
      total: 25000.00,
      todayChange: 15,
      weekChange: 5,
      monthChange: 10,
    },
    stats: {
      totalSessions: 5,
      totalClients: 3,
      totalHours: 240, // in minutes
      rating: 4.8,
      reviewCount: 89,
      avgSessionTime: 48,
    },
    pendingRequests: [
      { id: 1, clientName: 'Alice', type: 'Video Call', requestedAt: new Date().toISOString() },
      { id: 2, clientName: 'Bob', type: 'Chat', requestedAt: new Date().toISOString() },
    ],
    upcomingSessions: [
        { id: 1, clientName: 'Charlie', type: 'Voice Call', sessionTime: new Date(Date.now() + 3600 * 1000).toISOString() },
    ],
    // Data for the revenue chart (e.g., last 7 days)
    revenueData: [
        { name: 'Mon', revenue: 400 },
        { name: 'Tue', revenue: 300 },
        { name: 'Wed', revenue: 200 },
        { name: 'Thu', revenue: 278 },
        { name: 'Fri', revenue: 189 },
        { name: 'Sat', revenue: 239 },
        { name: 'Sun', revenue: 349 },
    ],
  };

  return NextResponse.json(mockDashboardData);
}
