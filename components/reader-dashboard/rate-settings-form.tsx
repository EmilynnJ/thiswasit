"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const rateSchema = z.object({
  chatRate: z.coerce.number().min(0, "Rate must be positive").optional(),
  callRate: z.coerce.number().min(0, "Rate must be positive").optional(),
  videoRate: z.coerce.number().min(0, "Rate must be positive").optional(),
});

type RateFormValues = z.infer<typeof rateSchema>;

export function RateSettingsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // In a real app, you would fetch the reader's current rates and set them as default values.
  const form = useForm<RateFormValues>({
    resolver: zodResolver(rateSchema),
    defaultValues: {
      chatRate: 2.99,
      callRate: 3.99,
      videoRate: 4.99,
    },
  });

  const onSubmit = async (values: RateFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/reader/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update rates');
      }

      toast({
        title: 'Rates Updated',
        description: 'Your new per-minute rates have been saved.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to update your rates. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-card">
        <CardHeader>
            <CardTitle className="font-alex-brush text-3xl">Set Your Rates</CardTitle>
            <CardDescription className="font-playfair">
                Set your per-minute rates for different types of readings.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="chatRate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Chat Rate ($/min)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 2.99" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="callRate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Voice Call Rate ($/min)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 3.99" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="videoRate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Video Call Rate ($/min)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 4.99" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full bg-pink-500 hover:bg-pink-600">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Save Rates
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
