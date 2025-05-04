import { PageContainer } from "@/components/page-container"
import { AdvancedSearch } from "@/components/search/advanced-search"

export default function AdvancedSearchPage() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-playfair mb-8">Find Your Perfect Reader</h1>
      <AdvancedSearch />
    </PageContainer>
  )
}
