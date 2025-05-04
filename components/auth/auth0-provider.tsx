'use client';

import { ReactNode } from 'react';

// This is a simplified Auth0Provider that doesn't require the Auth0 SDK
// It's just a wrapper component that passes children through
export function Auth0Provider({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 