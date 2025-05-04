import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  try {
    // Mock reader user for testing purposes
    const mockReaderUser = {
      sub: 'auth0|reader123456',
      email: 'reader@example.com',
      name: 'Reader User',
      given_name: 'Reader',
      family_name: 'User',
      picture: 'https://example.com/reader-avatar.jpg',
      'https://soulseer.com/roles': ['reader'],
    };

    // Set a mock session cookie
    cookies().set('appSession', 'reader-session-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return NextResponse.json(mockReaderUser);
  } catch (error) {
    console.error('Error in /api/auth/reader:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 