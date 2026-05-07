import {
  type Column,
  type ColumnDef,
  type RowData,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Pencil, Power } from "lucide-react";
import type { Product } from "../../types/api";
import { usePaginatedProducts } from "../../queries/useProducts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { Badge } from "../badge";
import { Button } from "../button";
import { useTableState } from "../../hooks/useTableState";
import { useToggleProductStatus } from "../../mutations/useProductMutations";
import { EditProductModal } from "../edit-product/EditProductModal";
import { ProductSearchBar } from "./ProductSearchBar";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

function ProductsTable() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const {
    currentPage,
    pageSize,
    columnFilters,
    activeFilter,
    searchTerm,
    debouncedSearchTerm,
    setColumnFilters,
    setSearchTerm,
    handlePageChange,
    handlePageSizeChange,
  } = useTableState();

  const { data, isLoading, error } = usePaginatedProducts({
    page: currentPage,
    limit: pageSize,
    active: activeFilter,
    search: debouncedSearchTerm || undefined,
  });

  const { mutate: toggleStatus, isPending: isTogglingStatus } =
    useToggleProductStatus();

  const products = data?.products || [];

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: (props) => props.getValue(),
    },
    {
      accessorKey: "packaging",
      header: "Packaging",
      cell: (props) => {
        const value = props.getValue() as Product["packaging"];
        return (
          <Badge variant="outline" className="capitalize">
            {value}
          </Badge>
        );
      },
    },
    {
      accessorKey: "deposit",
      header: "Deposit (¢)",
      cell: (props) => {
        const value = props.getValue() as Product["deposit"];
        return `${value}¢`;
      },
    },
    {
      accessorKey: "volume",
      header: "Volume (ml)",
      cell: (props) => {
        const value = props.getValue() as Product["volume"];
        return `${value}ml`;
      },
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: (props) => {
        const isActive = props.getValue() as Product["active"];
        return (
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
      meta: {
        filterVariant: "select",
      },
    },
    {
      accessorKey: "registeredAt",
      header: "Registered",
      cell: (props) => {
        const date = new Date(props.getValue() as Product["registeredAt"]);
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: (props) => {
        const product = props.row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              title="Edit product"
              onClick={() => setEditingProduct(product)}
            >
              <Pencil size={14} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 ${
                product.active
                  ? "text-red-500 hover:text-red-700 hover:bg-red-50"
                  : "text-green-600 hover:text-green-800 hover:bg-green-50"
              }`}
              title={product.active ? "Deactivate product" : "Activate product"}
              disabled={isTogglingStatus}
              onClick={() => toggleStatus(product.id)}
            >
              <Power size={14} />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  if (isLoading) {
    return <div className="p-4">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading products: {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="px-4 pt-4 pb-2">
        <ProductSearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>
      <div className="p-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div className="mt-2">
                              <Filter column={header.column} />
                            </div>
                          ) : null}
                        </>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {debouncedSearchTerm
                    ? `No products found matching "${debouncedSearchTerm}"`
                    : "No products found"}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="h-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className="border rounded p-1 px-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(1)}
              disabled={!data?.pagination?.hasPreviousPage}
            >
              {"<<"}
            </button>
            <button
              className="border rounded p-1 px-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!data?.pagination?.hasPreviousPage}
            >
              {"<"}
            </button>
            <button
              className="border rounded p-1 px-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!data?.pagination?.hasNextPage}
            >
              {">"}
            </button>
            <button
              className="border rounded p-1 px-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() =>
                handlePageChange(data?.pagination?.totalPages || 1)
              }
              disabled={!data?.pagination?.hasNextPage}
            >
              {">>"}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Page {data?.pagination?.currentPage || 1} of{" "}
              {data?.pagination?.totalPages || 1}
            </span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="border rounded p-1 text-sm"
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          Showing {products.length} products
          {data?.pagination && (
            <span> of {data.pagination.totalItems} total</span>
          )}
        </div>
      </div>

      <EditProductModal
        product={editingProduct}
        open={editingProduct !== null}
        onOpenChange={(open) => {
          if (!open) setEditingProduct(null);
        }}
      />
    </>
  );
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  if (filterVariant === "select" && column.id === "active") {
    return (
      <select
        onChange={(e) => column.setFilterValue(e.target.value)}
        value={columnFilterValue?.toString()}
        className="border rounded p-1 text-sm w-full"
      >
        <option value="">All</option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
    );
  }

  return null;
}

export default ProductsTable;
