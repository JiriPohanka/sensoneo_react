import { useRecentProducts } from "../../queries/useProducts";
import { RecentProduct } from "./RecentProduct";

export const RecentProductsContent = () => {
  const { data: products, isFetching, isError } = useRecentProducts(5);

  if (isFetching) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <RecentProduct key={i} isLoading />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-gray-500">Failed to load recent products</p>
    );
  }

  if (!products || products.length === 0) {
    return <p className="text-sm text-gray-500">No products found</p>;
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <RecentProduct key={product.id} product={product} />
      ))}
    </div>
  );
};
