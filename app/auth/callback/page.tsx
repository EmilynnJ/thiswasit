'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export default function CallbackPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Redirect based on user role
        if (user?.user_type === 'admin') {
          router.push('/admin-dashboard');
        } else if (user?.user_type === 'reader') {
          router.push('/reader-dashboard');
        } else {
          router.push('/dashboard');
        }
      } else {
        // Something went wrong
        router.push('/auth?error=login_failed');
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-400 border-opacity-50 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Completing Your Login</h2>
        <p className="text-gray-400">Please wait while we set up your session...</p>
      </div>
    </div>
  );
} 