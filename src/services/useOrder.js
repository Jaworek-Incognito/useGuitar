import { useParams } from "react-router-dom";
import { getOrderApi } from "./apiOrders";
import { useQuery } from "@tanstack/react-query";

export function useOrder() {
  let { id } = useParams();
  const {
    isLoading,
    data: order,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderApi(id),
  });
  return { isLoading, order, error };
}
