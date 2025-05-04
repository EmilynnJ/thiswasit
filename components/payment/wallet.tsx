"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, DollarSign, History } from "lucide-react"

interface WalletProps {
  userId: number
  currentBalance: number
  transactions: Array<{
    id: number
    amount: number
    type: string
    date: string
    description: string
  }>
}

export function WalletComponent({ userId, currentBalance, transactions }: WalletProps) {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleAddFunds = async () => {
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // In a real app, you would integrate with Stripe here
      // For now, we'll simulate a successful payment
      const response = await fetch("/api/wallet/add-funds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          amount: Number.parseFloat(amount) * 100, // Convert to cents
          paymentMethodId: "pm_card_visa", // Simulated payment method
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(`Successfully added $${Number.parseFloat(amount).toFixed(2)} to your wallet!`)
        // In a real app, you would update the UI with the new balance
      } else {
        setError(data.error || "Failed to add funds")
      }
    } catch (error) {
      console.error("Error adding funds:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-alex-brush heading-glow text-2xl">Your Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 font-playfair">Current Balance</span>
            <span className="text-2xl font-bold text-pink-400">${(currentBalance / 100).toFixed(2)}</span>
          </div>
        </div>

        <Tabs defaultValue="add-funds">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="add-funds">Add Funds</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="add-funds" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Add</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  id="amount"
                  type="number"
                  min="5"
                  step="5"
                  placeholder="25.00"
                  className="pl-10"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="p-3 border border-gray-700 rounded-md flex items-center">
                <CreditCard className="mr-2 text-gray-400" size={16} />
                <span>•••• •••• •••• 4242</span>
                <span className="ml-auto text-sm text-gray-400">Default</span>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <Button
              className="w-full bg-pink-500 hover:bg-pink-600"
              onClick={handleAddFunds}
              disabled={isLoading || !amount}
            >
              {isLoading ? "Processing..." : "Add Funds"}
            </Button>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border-b border-gray-700">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                  <div className={`font-semibold ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                    {transaction.amount > 0 ? "+" : ""}
                    {(transaction.amount / 100).toFixed(2)}
                  </div>
                </div>
              ))}

              {transactions.length === 0 && (
                <div className="text-center py-6 text-gray-400">
                  <History className="mx-auto h-8 w-8 mb-2" />
                  <p>No transactions yet</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
