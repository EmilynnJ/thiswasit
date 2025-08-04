"use client";

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'ADD_FUNDS' | 'READING_PAYMENT' | 'PURCHASE' | 'REFUND';
}

const getBadgeVariant = (type: Transaction['type']) => {
    switch (type) {
        case 'ADD_FUNDS': return 'bg-green-500/20 text-green-400';
        case 'READING_PAYMENT': return 'bg-red-500/20 text-red-400';
        case 'PURCHASE': return 'bg-blue-500/20 text-blue-400';
        case 'REFUND': return 'bg-yellow-500/20 text-yellow-400';
        default: return 'bg-gray-500/20 text-gray-400';
    }
}

export function TransactionHistoryTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      // In a real app, fetch from '/api/wallet/transactions'
      // For now, using mock data
      setTimeout(() => {
        setTransactions([
          { id: 'txn_1', date: new Date().toLocaleDateString(), description: 'Added funds to wallet', amount: 50.00, type: 'ADD_FUNDS' },
          { id: 'txn_2', date: new Date().toLocaleDateString(), description: 'Reading with Mystic Luna', amount: -19.95, type: 'READING_PAYMENT' },
          { id: 'txn_3', date: new Date().toLocaleDateString(), description: 'Purchase: Crystal Guide', amount: -9.99, type: 'PURCHASE' },
          { id: 'txn_4', date: new Date().toLocaleDateString(), description: 'Refund for cancelled reading', amount: 15.00, type: 'REFUND' },
        ]);
        setIsLoading(false);
      }, 1500);
    };
    fetchTransactions();
  }, []);

  return (
    <Card className="glass-card">
        <CardHeader>
            <CardTitle className="font-alex-brush text-3xl">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">Loading transactions...</TableCell>
                        </TableRow>
                    ) : transactions.map((tx) => (
                        <TableRow key={tx.id}>
                            <TableCell>{tx.date}</TableCell>
                            <TableCell>{tx.description}</TableCell>
                            <TableCell><Badge className={getBadgeVariant(tx.type)}>{tx.type.replace('_', ' ')}</Badge></TableCell>
                            <TableCell className={`text-right ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
