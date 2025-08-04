import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Mock Data
  const mockTransactions = [
    { id: 'txn_1', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(), description: 'Added funds to wallet', amount: 50.00, type: 'ADD_FUNDS' },
    { id: 'txn_2', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(), description: 'Reading with Mystic Luna', amount: -19.95, type: 'READING_PAYMENT' },
    { id: 'txn_3', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(), description: 'Purchase: Crystal Guide', amount: -9.99, type: 'PURCHASE' },
    { id: 'txn_4', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(), description: 'Refund for cancelled reading', amount: 15.00, type: 'REFUND' },
    { id: 'txn_5', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(), description: 'Added funds to wallet', amount: 25.00, type: 'ADD_FUNDS' },
  ];

  return NextResponse.json(mockTransactions);
}
