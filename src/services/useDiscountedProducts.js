import { useQuery } from "@tanstack/react-query";
import { getDiscountedProductsApi } from "./apiProducts";

export function useDiscountedProducts() {
  const { isLoading, data: discountedProducts } = useQuery({
    queryKey: ["discounted-products"],
    queryFn: getDiscountedProductsApi,
  });
  return { isLoading, discountedProducts };
}
