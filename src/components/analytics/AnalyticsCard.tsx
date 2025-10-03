import { Card, CardContent } from "../card";
import { Skeleton } from "../skeleton";
import type { ReactNode } from "react";

interface AnalyticsCardViewProps {
  icon?: ReactNode;
  title?: string;
  value?: number;
  description?: string;
  isLoading?: boolean;
}

export const AnalyticsCard = ({
  icon,
  title,
  value,
  description,
  isLoading = false,
}: AnalyticsCardViewProps) => {
  if (isLoading) {
    return (
      <Card className="p-6 bg-white rounded-xl border shadow-sm">
        <CardContent className="p-0">
          <div className="flex items-start justify-between mb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-32" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!title || value === undefined || !description) {
    return null;
  }

  return (
    <Card className="p-6 bg-white rounded-xl border shadow-sm">
      <CardContent className="p-0">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <div className="text-gray-400">{icon}</div>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-gray-900">
            {value.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
