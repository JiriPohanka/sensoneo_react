export interface Product {
  id: number;
  companyId: number;
  registeredById: number;
  name: string;
  packaging: "pet" | "can" | "glass" | "tetra" | "other";
  deposit: number;
  volume: number;
  registeredAt: string;
  active: boolean;
}

export interface Company {
  id: number;
  name: string;
  registeredAt: string;
}

export interface User {
  id: number;
  companyId: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface AnalyticsData {
  activeProducts: number;
  pendingProducts: number;
  companies: number;
  users: number;
}

export interface ProductFormData {
  name: string;
  packaging: "pet" | "can" | "glass" | "tetra" | "other";
  deposit: number;
  volume: number;
  companyId: number;
  registeredById: number;
}
