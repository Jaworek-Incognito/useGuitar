import { useQuery } from "@tanstack/react-query";
import { getFeaturedProductsApi } from "./apiProducts";

export function useFeaturedProducts() {
  const { isLoading, data: featuredProducts } = useQuery({
    queryKey: ["featured-products"],
    queryFn: getFeaturedProductsApi,
  });
  return { isLoading, featuredProducts };
}
