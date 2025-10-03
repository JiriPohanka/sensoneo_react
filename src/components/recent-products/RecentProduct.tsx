import type { Product } from "../../types/api";
import { Skeleton } from "../skeleton";

interface RecentProductViewProps {
  product?: Product;
  isLoading?: boolean;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatVolume = (volume: number) => {
  if (volume >= 1000) {
    return `${volume / 1000}L`;
  }
  return `${volume}ml`;
};

const formatDeposit = (deposit: number) => {
  return `$${(deposit / 100).toFixed(2)}`;
};

const formatPackaging = (packaging: string) => {
  return packaging.charAt(0).toUpperCase() + packaging.slice(1);
};

export const RecentProduct = ({
  product,
  isLoading = false,
}: RecentProductViewProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-3 w-20" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const volumeFormatted = formatVolume(product.volume);
  const depositFormatted = formatDeposit(product.deposit);
  const packagingFormatted = formatPackaging(product.packaging);
  const registeredDateFormatted = formatDate(product.registeredAt);

  // todo: introduce UnicodeEntity enum for special character handling

  return (
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
        <p className="text-xs text-gray-500">
          {volumeFormatted} • {depositFormatted} deposit • {packagingFormatted}
        </p>
      </div>
      <span className="text-xs text-gray-500">{registeredDateFormatted}</span>
    </div>
  );
};
