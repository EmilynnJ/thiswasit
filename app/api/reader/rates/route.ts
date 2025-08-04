import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { chatRate, callRate, videoRate } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { readerProfile: true }
    });

    if (!user || !user.readerProfile) {
      return new NextResponse('Forbidden: User is not a reader', { status: 403 });
    }

    // Prepare data for update, only including fields that were provided
    const dataToUpdate: { chatRate?: number; callRate?: number; videoRate?: number } = {};
    if (chatRate !== undefined) dataToUpdate.chatRate = parseFloat(chatRate);
    if (callRate !== undefined) dataToUpdate.callRate = parseFloat(callRate);
    if (videoRate !== undefined) dataToUpdate.videoRate = parseFloat(videoRate);

    await prisma.reader.update({
      where: { id: user.readerProfile.id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, newRates: dataToUpdate });

  } catch (error) {
    console.error('[READER_RATES_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
