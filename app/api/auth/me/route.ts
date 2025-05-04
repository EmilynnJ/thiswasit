import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  try {
    // Get the Auth0 session cookie
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('appSession');

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // In a real implementation, this would verify the session with Auth0
    // For now, we'll just return a mock user to make progress
    const mockUser = {
      sub: 'auth0|123456789',
      email: 'user@example.com',
      name: 'Test User',
      given_name: 'Test',
      family_name: 'User',
      picture: 'https://example.com/avatar.jpg',
      'https://soulseer.com/roles': ['client'],
    };

    return NextResponse.json(mockUser);
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
