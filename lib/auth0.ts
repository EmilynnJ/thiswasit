import { getSession } from '@auth0/nextjs-auth0';
import type { NextRequest } from 'next/server';
import type { Session, UserProfile } from '@auth0/nextjs-auth0';

export interface AuthUser extends UserProfile {
  role?: 'admin' | 'reader' | 'client';
}

export interface AuthSession extends Session {
  user: AuthUser;
}

export async function getAuthSession(req: NextRequest): Promise<AuthSession | null> {
  try {
    return await getSession(req as any, {} as any) as AuthSession;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export function getUserRole(user: AuthUser | undefined): 'admin' | 'reader' | 'client' | undefined {
  if (!user) return undefined;
  
  // Check user metadata for role
  if (user['https://soulseer.com/roles']) {
    const roles = user['https://soulseer.com/roles'] as string[];
    if (roles.includes('admin')) return 'admin';
    if (roles.includes('reader')) return 'reader';
    if (roles.includes('client')) return 'client';
  }
  
  // Default to client if no role found
  return 'client';
} 