import { useState, useMemo, useEffect } from "react";
import type { ColumnFiltersState, OnChangeFn } from "@tanstack/react-table";
import { useDebounce } from "./useDebounce";

export interface TableStateConfig {
  initialPage?: number;
  initialPageSize?: number;
  initialFilters?: ColumnFiltersState;
  initialSearch?: string;
}

export interface TableState {
  // Pagination state
  currentPage: number;
  pageSize: number;

  // Filter state
  columnFilters: ColumnFiltersState;

  // Search state
  searchTerm: string;
  debouncedSearchTerm: string;

  // Computed values
  activeFilter: boolean | undefined;

  // Actions
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  setSearchTerm: (term: string) => void;
  handlePageChange: (newPage: number) => void;
  handlePageSizeChange: (newPageSize: number) => void;
  resetToFirstPage: () => void;
}

export function useTableState(config: TableStateConfig = {}): TableState {
  const {
    initialPage = 1,
    initialPageSize = 20,
    initialFilters = [],
    initialSearch = "",
  } = config;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialFilters);
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Get active filter from column filters
  const activeFilter = useMemo(() => {
    const activeFilterValue = columnFilters.find(
      (filter) => filter.id === "active"
    )?.value;
    if (activeFilterValue === "true") return true;
    if (activeFilterValue === "false") return false;
    return undefined;
  }, [columnFilters]);

  // Reset to first page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, debouncedSearchTerm]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    pageSize,
    columnFilters,
    searchTerm,
    debouncedSearchTerm,
    activeFilter,
    setCurrentPage,
    setPageSize,
    setColumnFilters,
    setSearchTerm,
    handlePageChange,
    handlePageSizeChange,
    resetToFirstPage,
  };
}
