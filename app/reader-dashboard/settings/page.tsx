import { PageContainer } from "@/components/page-container";
import { RateSettingsForm } from "@/components/reader-dashboard/rate-settings-form";

export default function ReaderSettingsPage() {
  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-alex-brush text-center mb-8">Reader Settings</h1>
        <RateSettingsForm />
        {/* Other settings can be added here in the future */}
      </div>
    </PageContainer>
  );
}
