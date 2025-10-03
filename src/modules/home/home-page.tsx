import { Package } from "lucide-react";

import { PageHeader } from "../../components/page-header";
import { AnalyticsSection } from "../../components/analytics/AnalyticsSection";
import { QuickActionsSection } from "../../components/quick-actions/QuickActionsSection";
import { RecentProductsSection } from "../../components/recent-products/RecentProductsSection";

export function HomePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Deposit management dashboard"
        description="Welcome to your deposit management system. Monitor and manage your products, companies, and users."
        icon={<Package size={28} />}
      />
      <AnalyticsSection />
      <QuickActionsSection />
      <RecentProductsSection />
    </div>
  );
}
