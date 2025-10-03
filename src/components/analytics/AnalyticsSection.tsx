import { Package, Clock, Building2, Users } from "lucide-react";
import { useAnalyticsData } from "../../hooks/useAnalyticsData";
import { AnalyticsCard } from "./AnalyticsCard";

export const AnalyticsSection = () => {
  const { data, isLoading, isError, error } = useAnalyticsData();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <AnalyticsCard key={i} isLoading />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="col-span-full p-6 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center">
            <div className="text-red-600">
              <Package size={20} />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading analytics data
              </h3>
              <p className="text-sm text-red-600">
                {error?.message || "Please try again later"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <AnalyticsCard
        title="Active products"
        value={data.activeProducts}
        icon={<Package size={20} />}
        description="Active products in system"
      />
      <AnalyticsCard
        title="Pending products"
        value={data.pendingProducts}
        icon={<Clock size={20} />}
        description="Products waiting for approval"
      />
      <AnalyticsCard
        title="Companies"
        value={data.companies}
        icon={<Building2 size={20} />}
        description="Registered companies"
      />
      <AnalyticsCard
        title="Users"
        value={data.users}
        icon={<Users size={20} />}
        description="Registered users"
      />
    </div>
  );
};
