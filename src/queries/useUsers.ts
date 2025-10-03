import { useQuery } from "@tanstack/react-query";
import type { User, ApiResponse } from "../types/api";

const API_BASE_URL = "http://localhost:3001/api";

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  const data: ApiResponse<User[]> = await response.json();

  if (!data.success) {
    throw new Error("Failed to fetch users");
  }

  return data.data;
}

export const useUsers = () => useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

export const useUsersCount = () => useQuery({
    queryKey: ["users", "count"],
    queryFn: async () => {
      const users = await fetchUsers();
      return users.length;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
