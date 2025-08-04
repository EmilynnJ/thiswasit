"use client";

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, CirclePause } from 'lucide-react';

type Status = 'online' | 'offline' | 'busy';

export function StatusToggle() {
  const [status, setStatus] = useState<Status>('offline');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStatusChange = async (newStatus: Status) => {
    setIsLoading(true);
    try {
      // In a real app, you would get the reader's ID from the current user session
      const response = await fetch('/api/reader/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setStatus(newStatus);
      toast({
        title: 'Status Updated',
        description: `You are now ${newStatus}.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to update your status. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const statusConfig = {
    offline: { icon: <WifiOff className="mr-2 h-4 w-4" />, text: 'Go Online', next: 'online', color: 'bg-gray-500' },
    online: { icon: <Wifi className="mr-2 h-4 w-4" />, text: 'Go Busy', next: 'busy', color: 'bg-green-500' },
    busy: { icon: <CirclePause className="mr-2 h-4 w-4" />, text: 'Go Offline', next: 'offline', color: 'bg-yellow-500' },
  };

  const current = statusConfig[status];

  return (
    <Button
      onClick={() => handleStatusChange(current.next as Status)}
      disabled={isLoading}
      className={`${current.color} hover:${current.color}/90`}
    >
      {current.icon}
      {current.text}
    </Button>
  );
}
