"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Plus, Trash2, CheckCircle } from "lucide-react"
import { AddPaymentMethod } from "@/components/payment/add-payment-method"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PaymentMethod {
  id: string
  type: "visa" | "mastercard" | "amex" | "discover"
  last4: string
  expMonth: string
  expYear: string
  isDefault: boolean
}

export function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm_1",
      type: "visa",
      last4: "4242",
      expMonth: "12",
      expYear: "2025",
      isDefault: true,
    },
    {
      id: "pm_2",
      type: "mastercard",
      last4: "5555",
      expMonth: "08",
      expYear: "2024",
      isDefault: false,
    },
  ])

  const [showAddCard, setShowAddCard] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleSetDefault = (id: string) => {
    setPaymentMethods((methods) =>
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  const handleDelete = (id: string) => {
    setPaymentMethods((methods) => methods.filter((method) => method.id !== id))
    setDeleteId(null)
  }

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return (
          <svg className="h-6 w-6" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#1A1F71"
              d="M13.35 15.45H10.4l1.85-8.2h2.95l-1.85 8.2zm13.6-8c-.6-.25-1.55-.5-2.75-.5-3 0-5.15 1.4-5.15 3.4 0 1.5 1.5 2.3 2.65 2.8 1.15.5 1.55.8 1.55 1.25 0 .7-.95 1-1.8 1-1.2 0-1.8-.15-2.8-.55l-.4-.15-.4 2.2c.7.3 1.95.55 3.25.55 3.05 0 5.05-1.4 5.05-3.55 0-1.2-.8-2.1-2.5-2.85-1.05-.5-1.7-.8-1.7-1.3 0-.45.55-.9 1.75-.9 1 0 1.7.2 2.25.4l.3.15.4-2zm4.15 8.1h-2.3l-1.45-8.2h-2.8l-3.15 8.2h5.75l.45-1.15h2.65l.25 1.15h2.3l-1.7-8.2zm-3.85-2.7h-1.7l.85-2.35.85 2.35z"
            />
          </svg>
        )
      case "mastercard":
        return (
          <svg className="h-6 w-6" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#EB001B"
              d="M12.5 24.5c2.4 2 5.5 3.1 8.9 3.1 7.7 0 14-6.3 14-14s-6.3-14-14-14c-3.4 0-6.5 1.2-8.9 3.1 2.6 2.2 4.3 5.4 4.3 9.9 0 4.4-1.7 7.7-4.3 9.9z"
            />
            <path
              fill="#F79E1B"
              d="M12.5 24.5c-2.6-2.2-4.3-5.4-4.3-9.9 0-4.4 1.7-7.7 4.3-9.9C10.1 2.7 7 1.5 3.6 1.5c-7.7 0-14 6.3-14 14s6.3 14 14 14c3.4 0 6.5-1.2 8.9-3.1z"
            />
            <path
              fill="#FF5F00"
              d="M12.5 4.7c-2.6 2.2-4.3 5.4-4.3 9.9 0 4.4 1.7 7.7 4.3 9.9 2.6-2.2 4.3-5.4 4.3-9.9 0-4.4-1.7-7.7-4.3-9.9z"
            />
          </svg>
        )
      case "amex":
        return (
          <svg className="h-6 w-6" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#006FCF"
              d="M32 15.36v1.28h-1.52l-1.2-1.28-1.2 1.28h-9.52v-5.76h-3.2l-1.6 3.52-1.6-3.52h-11.2v5.76h3.2l.8-1.6v1.6h4l.8-1.6v1.6h4v-1.28h.8c.64 0 .64 0 .64.64v.64h3.2v-.64c0-.64 0-.64.64-.64h.8zm-17.6-3.2h-1.6l1.6 3.84 1.6-3.84zm12.8 3.2h-3.2v-.64c0-.64 0-.64-.64-.64h-3.2c-.64 0-.64 0-.64.64v.64h-1.6v-3.2h9.28v3.2zm-5.76-1.28h2.56v-.64h-2.56v.64zm5.76-1.28h-1.6l-1.2 1.28-1.2-1.28h-5.28v-.64h9.28v.64z"
            />
          </svg>
        )
      case "discover":
        return (
          <svg className="h-6 w-6" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FF6000"
              d="M2 10v12h28V10H2zm14 9.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"
            />
          </svg>
        )
      default:
        return <CreditCard className="h-6 w-6 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-pink-400" /> Payment Methods
            </span>
            <Button
              variant="outline"
              size="sm"
              className="border-pink-400 text-pink-400 hover:bg-pink-400/10"
              onClick={() => setShowAddCard(true)}
            >
              <Plus className="h-4 w-4 mr-2" /> Add New
            </Button>
          </CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-400 mb-4">You don't have any payment methods yet.</p>
              <Button
                variant="outline"
                className="border-pink-400 text-pink-400 hover:bg-pink-400/10"
                onClick={() => setShowAddCard(true)}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Payment Method
              </Button>
            </div>
          ) : (
            paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/50"
              >
                <div className="flex items-center gap-3">
                  {getCardIcon(method.type)}
                  <div>
                    <p className="font-medium">
                      {method.type.charAt(0).toUpperCase() + method.type.slice(1)} •••• {method.last4}
                    </p>
                    <p className="text-sm text-gray-400">
                      Expires {method.expMonth}/{method.expYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.isDefault ? (
                    <span className="flex items-center text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                      <CheckCircle className="h-3 w-3 mr-1" /> Default
                    </span>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                      onClick={() => handleSetDefault(method.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  <Dialog open={deleteId === method.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-400"
                        onClick={() => setDeleteId(method.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card">
                      <DialogHeader>
                        <DialogTitle>Remove Payment Method</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to remove this payment method? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50"
                          onClick={() => setDeleteId(null)}
                        >
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(method.id)}>
                          Remove
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog open={showAddCard} onOpenChange={setShowAddCard}>
        <DialogContent className="sm:max-w-md">
          <AddPaymentMethod />
        </DialogContent>
      </Dialog>
    </div>
  )
}
