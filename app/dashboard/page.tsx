import { PageContainer } from "@/components/page-container"
import { ClientDashboard } from "@/components/client-dashboard/client-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function DashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["client", "admin"]}>
      <PageContainer>
        <h1 className="text-3xl font-playfair mb-8">Dashboard</h1>
        <ClientDashboard />
      </PageContainer>
    </ProtectedRoute>
  )
}
