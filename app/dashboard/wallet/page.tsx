"use client";

import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageContainer } from '@/components/page-container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { TransactionHistoryTable } from '@/components/client-dashboard/transaction-history-table';

export default function WalletPage() {
  const { user } = useUser();
  const [balance, setBalance] = useState<number | null>(null);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingBalance, setIsFetchingBalance] = useState(true);
  const { toast } = useToast();

  // This is a placeholder for fetching the balance from your backend.
  // In a real app, you would fetch this from an API route that gets the user's balance from the database.
  useEffect(() => {
    const fetchBalance = async () => {
      if(user) {
        // Replace with your actual API endpoint
        // const response = await fetch('/api/wallet/balance');
        // const data = await response.json();
        // setBalance(data.balance);

        // Using a mock balance for now
        setTimeout(() => {
            setBalance(123.45);
            setIsFetchingBalance(false);
        }, 1000);
      }
    };
    fetchBalance();
  }, [user]);

  const handleAddFunds = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/wallet/add-funds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
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
      <div className="max-w-2xl mx-auto grid gap-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-alex-brush text-3xl">My Wallet</CardTitle>
            <CardDescription className="font-playfair">View your balance and add funds.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg font-playfair mb-2">Current Balance</p>
            {isFetchingBalance ? (
                <div className="h-12 w-32 bg-gray-700/50 animate-pulse mx-auto rounded-md"></div>
            ) : (
                <p className="text-5xl font-bold text-pink-400">
                    ${balance?.toFixed(2)}
                </p>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-alex-brush text-3xl">Add Funds</CardTitle>
            <CardDescription className="font-playfair">
              Add funds to your wallet to pay for readings and other services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddFunds} className="space-y-4">
              <div>
                <Label htmlFor="amount" className="font-playfair">Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g., 50.00"
                  min="5.00"
                  step="0.01"
                  required
                  className="bg-black/30"
                />
              </div>
              <Button type="submit" disabled={isLoading || parseFloat(amount) < 5} className="w-full bg-pink-500 hover:bg-pink-600">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Add Funds with Stripe
              </Button>
            </form>
          </CardContent>
        </Card>

        <TransactionHistoryTable />
      </div>
    </PageContainer>
  );
}
