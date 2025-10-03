import { useQuery } from "@tanstack/react-query";
import type { Company, ApiResponse } from "../types/api";

const API_BASE_URL = "http://localhost:3001/api";

const fetchCompanies = async (): Promise<Company[]> => {
  const response = await fetch(`${API_BASE_URL}/companies`);
  const data: ApiResponse<Company[]> = await response.json();

  if (!data.success) {
    throw new Error("Failed to fetch companies");
  }

  return data.data;
}

export const useCompanies = () => useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    staleTime: 10 * 60 * 1000,
    retry: 3,
  });


export const useCompaniesCount = () => useQuery({
    queryKey: ["companies", "count"],
    queryFn: async () => {
      const companies = await fetchCompanies();
      return companies.length;
    },
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
