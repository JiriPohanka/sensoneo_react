import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product, ProductFormData } from "../types/api";

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
