import { AuthForms } from "@/components/auth/auth-forms"
import { PageContainer } from "@/components/page-container"

export default function AuthPage({ searchParams }: { searchParams: { tab?: string } }) {
  // Default to signin if no tab is specified
  const defaultTab = searchParams.tab === "signup" ? "signup" : "signin"

  return (
    <PageContainer className="flex items-center justify-center min-h-screen py-12">
      <AuthForms defaultTab={defaultTab} />
    </PageContainer>
  )
}
