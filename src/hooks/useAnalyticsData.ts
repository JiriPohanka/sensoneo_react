import { useProductsAnalytics } from "../queries/useProducts";
import { useCompaniesCount } from "../queries/useCompanies";
import { useUsersCount } from "../queries/useUsers";
import type { AnalyticsData } from "../types/api";

export function useAnalyticsData() {
  const productsQuery = useProductsAnalytics();
  const companiesQuery = useCompaniesCount();
  const usersQuery = useUsersCount();

  const isLoading =
    productsQuery.isFetching ||
    companiesQuery.isFetching ||
    usersQuery.isFetching;
  const isError =
    productsQuery.isError || companiesQuery.isError || usersQuery.isError;
  const error = productsQuery.error || companiesQuery.error || usersQuery.error;

  const data: AnalyticsData | undefined =
    productsQuery.data &&
    companiesQuery.data !== undefined &&
    usersQuery.data !== undefined
      ? {
          activeProducts: productsQuery.data.activeProducts,
          pendingProducts: productsQuery.data.pendingProducts,
          companies: companiesQuery.data,
          users: usersQuery.data,
        }
      : undefined;

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: () => {
      productsQuery.refetch();
      companiesQuery.refetch();
      usersQuery.refetch();
    },
  };
}
