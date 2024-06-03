import { useQuery } from "@tanstack/react-query";
import { getProductApi } from "./apiProducts";
import { useParams } from "react-router-dom";

export function useProduct(cartName) {
  let { name } = useParams();
  if (!name) name = cartName;

  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["product", name],
    queryFn: () => getProductApi(name),
  });
  return { isLoading, product, error };
}
