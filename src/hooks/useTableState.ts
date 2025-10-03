import { useState, useMemo, useEffect } from "react";
import type { ColumnFiltersState, OnChangeFn } from "@tanstack/react-table";

export interface TableStateConfig {
  initialPage?: number;
  initialPageSize?: number;
  initialFilters?: ColumnFiltersState;
}

export interface TableState {
  // Pagination state
  currentPage: number;
  pageSize: number;

  // Filter state
  columnFilters: ColumnFiltersState;

  // Computed values
  activeFilter: boolean | undefined;

  // Actions
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  handlePageChange: (newPage: number) => void;
  handlePageSizeChange: (newPageSize: number) => void;
  resetToFirstPage: () => void;
}

export function useTableState(config: TableStateConfig = {}): TableState {
  const { initialPage = 1, initialPageSize = 20, initialFilters = [] } = config;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialFilters);

  // Get active filter from column filters
  const activeFilter = useMemo(() => {
    const activeFilterValue = columnFilters.find(
      (filter) => filter.id === "active"
    )?.value;
    if (activeFilterValue === "true") return true;
    if (activeFilterValue === "false") return false;
    return undefined;
  }, [columnFilters]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    pageSize,
    columnFilters,
    activeFilter,
    setCurrentPage,
    setPageSize,
    setColumnFilters,
    handlePageChange,
    handlePageSizeChange,
    resetToFirstPage,
  };
}
