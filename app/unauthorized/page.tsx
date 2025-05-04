import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="w-16 h-16 rounded-full bg-pink-400/20 flex items-center justify-center mb-6">
          <span className="font-alex-brush text-3xl text-pink-400">S</span>
        </div>
        
        <h1 className="text-4xl font-alex-brush text-pink-400 mb-4">Access Denied</h1>
        
        <p className="text-xl mb-8 max-w-md">
          You don't have permission to access this page. Please contact support if you believe this is an error.
        </p>
        
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
          
          <Button asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}
