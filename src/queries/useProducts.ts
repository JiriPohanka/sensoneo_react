import { useQuery } from "@tanstack/react-query";
import type { Product, ApiResponse } from "../types/api";

const API_BASE_URL = "http://localhost:3001/api";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`);
  const data: ApiResponse<Product[]> = await response.json();

  if (!data.success) {
    throw new Error("Failed to fetch products");
  }

  return data.data;
};

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

export const useProductsAnalytics = () =>
  useQuery({
    queryKey: ["products", "analytics"],
    queryFn: async () => {
      const products = await fetchProducts();
      const activeProducts = products.filter(
        (product) => product.active
      ).length;
      const pendingProducts = products.filter(
        (product) => !product.active
      ).length;

      return {
        activeProducts,
        pendingProducts,
        total: products.length,
      };
    },
    staleTime: 2 * 60 * 1000,
    retry: 3,
  });

const fetchRecentProducts = async (limit: number = 5): Promise<Product[]> => {
  const response = await fetch(
    `${API_BASE_URL}/products?limit=${limit}&sortBy=registeredAt&sortOrder=desc`
  );
  const data: ApiResponse<Product[]> = await response.json();

  if (!data.success) {
    throw new Error("Failed to fetch recent products");
  }

  return data.data;
};

export const useRecentProducts = (limit: number = 5) =>
  useQuery({
    queryKey: ["products", "recent", limit],
    queryFn: () => fetchRecentProducts(limit),
    staleTime: 60 * 1000,
    retry: 3,
  });

// Paginated products with filtering
interface ProductsQueryParams {
  page?: number;
  limit?: number;
  active?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const fetchPaginatedProducts = async (
  params: ProductsQueryParams = {}
): Promise<{
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}> => {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined)
    searchParams.set("page", params.page.toString());
  if (params.limit !== undefined)
    searchParams.set("limit", params.limit.toString());
  if (params.active !== undefined)
    searchParams.set("active", params.active.toString());
  if (params.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params.sortOrder) searchParams.set("sortOrder", params.sortOrder);

  const response = await fetch(
    `${API_BASE_URL}/products?${searchParams.toString()}`
  );
  const data: ApiResponse<Product[]> & { pagination?: any } =
    await response.json();

  if (!data.success) {
    throw new Error("Failed to fetch products");
  }

  return {
    products: data.data,
    pagination: data.pagination || {
      currentPage: 1,
      totalPages: 1,
      totalItems: data.data.length,
      itemsPerPage: data.data.length,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };
};

export const usePaginatedProducts = (params: ProductsQueryParams = {}) =>
  useQuery({
    queryKey: ["products", "paginated", params],
    queryFn: () => fetchPaginatedProducts(params),
    staleTime: 30 * 1000,
    retry: 3,
  });
