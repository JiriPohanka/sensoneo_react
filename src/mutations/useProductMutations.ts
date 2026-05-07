import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product, ProductFormData, ProductUpdateData } from "../types/api";

const API_BASE_URL = "http://localhost:3001/api";

const createProduct = async (
  productData: ProductFormData
): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  const data = await response.json();
  return data.data;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate and refetch products queries
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", "analytics"] });
    },
    onError: (error) => {
      console.error("Failed to create product:", error);
    },
  });
};

const updateProduct = async (
  productData: ProductUpdateData
): Promise<Product> => {
  const { id, ...fields } = productData;
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  const data = await response.json();
  return data.data;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Failed to update product:", error);
    },
  });
};

const toggleProductStatus = async (productId: number): Promise<Product> => {
  const response = await fetch(
    `${API_BASE_URL}/products/${productId}/toggle-status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to toggle product status");
  }

  const data = await response.json();
  return data.data;
};

export const useToggleProductStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleProductStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", "analytics"] });
    },
    onError: (error) => {
      console.error("Failed to toggle product status:", error);
    },
  });
};
