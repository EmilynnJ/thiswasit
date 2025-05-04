import { PageContainer } from "@/components/page-container"
import { ReaderDashboard } from "@/components/reader-dashboard/reader-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ReaderDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["reader", "admin"]}>
      <PageContainer>
        <h1 className="text-3xl font-playfair mb-8">Reader Dashboard</h1>
        <ReaderDashboard />
      </PageContainer>
    </ProtectedRoute>
  )
}
