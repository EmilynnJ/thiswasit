import { PageContainer } from "@/components/page-container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletComponent } from "@/components/payment/wallet"
import { PaymentMethods } from "@/components/payment/payment-methods"

export default function PaymentPage() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-playfair mb-8">Payment & Billing</h1>

      <Tabs defaultValue="wallet" className="w-full">
        <TabsList className="bg-gray-800/70 backdrop-blur-sm border-gray-700/50 p-1 mb-6">
          <TabsTrigger value="wallet" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
            Wallet
          </TabsTrigger>
          <TabsTrigger
            value="payment-methods"
            className="data-[state=active]:bg-pink-400 data-[state=active]:text-black"
          >
            Payment Methods
          </TabsTrigger>
          <TabsTrigger
            value="billing-history"
            className="data-[state=active]:bg-pink-400 data-[state=active]:text-black"
          >
            Billing History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="wallet" className="mt-0">
          <WalletComponent />
        </TabsContent>

        <TabsContent value="payment-methods" className="mt-0">
          <PaymentMethods />
        </TabsContent>

        <TabsContent value="billing-history" className="mt-0">
          <div className="glass-card p-6 text-center">
            <p className="text-gray-300 mb-4">Your billing history will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  )
}
