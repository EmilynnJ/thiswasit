import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  try {
    // Mock admin user for testing purposes
    const mockAdminUser = {
      sub: 'auth0|admin123456',
      email: 'admin@example.com',
      name: 'Admin User',
      given_name: 'Admin',
      family_name: 'User',
      picture: 'https://example.com/admin-avatar.jpg',
      'https://soulseer.com/roles': ['admin'],
    };

    // Set a mock session cookie
    cookies().set('appSession', 'admin-session-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return NextResponse.json(mockAdminUser);
  } catch (error) {
    console.error('Error in /api/auth/admin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 