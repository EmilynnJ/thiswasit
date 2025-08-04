"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageContainer } from '@/components/page-container';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function PayoutsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleConnectStripe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/connect', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to connect with Stripe');
      }

      const { url } = await response.json();
      // Redirect the user to the Stripe onboarding URL
      window.location.href = url;
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-alex-brush text-3xl">Connect Payouts</CardTitle>
            <CardDescription className="font-playfair">
              Connect your Stripe account to receive payouts for your readings and product sales.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 font-playfair">
              SoulSeer uses Stripe to handle all payouts securely. By clicking "Connect with Stripe", you will be
              redirected to Stripe to either create a new account or connect an existing one.
            </p>
            <Button onClick={handleConnectStripe} disabled={isLoading} className="w-full bg-pink-500 hover:bg-pink-600">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Connect with Stripe
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
