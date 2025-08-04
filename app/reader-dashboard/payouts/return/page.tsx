"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageContainer } from '@/components/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PayoutsReturnPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    // For now, we'll just assume success if the user is redirected here.
    // In a real application, you might want to make an API call to verify the account status.
    const accountId = searchParams.get('account_id');
    if (accountId) {
      // Here you could make a call to your backend to verify the account and update its status.
      // For example: fetch(`/api/stripe/verify-account?account_id=${accountId}`)
      // For this implementation, we'll just assume success.
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, [searchParams]);

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto">
        <Card className="glass-card">
          <CardHeader className="text-center">
            {status === 'loading' && <CardTitle className="font-alex-brush text-3xl">Verifying Account</CardTitle>}
            {status === 'success' && <CardTitle className="font-alex-brush text-3xl">Connection Successful!</CardTitle>}
            {status === 'error' && <CardTitle className="font-alex-brush text-3xl">An Error Occurred</CardTitle>}
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-6">
            {status === 'loading' && <div className="animate-pulse">Loading...</div>}
            {status === 'success' && (
              <>
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <p className="font-playfair text-center">
                  Your Stripe account has been successfully connected. You are now ready to receive payouts.
                </p>
              </>
            )}
            {status === 'error' && (
              <>
                <XCircle className="h-16 w-16 text-red-500" />
                <p className="font-playfair text-center">
                  Something went wrong while connecting your Stripe account. Please try again.
                </p>
              </>
            )}
            <Button asChild className="bg-pink-500 hover:bg-pink-600">
              <Link href="/reader-dashboard">Return to Dashboard</Link>
            </Button>
          </CardContent>
        </card>
      </div>
    </PageContainer>
  );
}
