import { PageContainer } from "@/components/page-container"
import { AdminDashboard } from "@/components/admin-dashboard/admin-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <PageContainer>
        <h1 className="text-3xl font-playfair mb-8">Admin Dashboard</h1>
        <AdminDashboard />
      </PageContainer>
    </ProtectedRoute>
  )
}
