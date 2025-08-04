import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { status } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!['online', 'offline', 'busy'].includes(status)) {
        return new NextResponse('Bad Request: Invalid status', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { readerProfile: true }
    });

    if (!user || !user.readerProfile) {
      return new NextResponse('Forbidden: User is not a reader', { status: 403 });
    }

    await prisma.reader.update({
      where: { id: user.readerProfile.id },
      data: {
        status: status,
        isOnline: status === 'online', // Also update the isOnline boolean
      },
    });

    return NextResponse.json({ success: true, newStatus: status });

  } catch (error) {
    console.error('[READER_STATUS_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
