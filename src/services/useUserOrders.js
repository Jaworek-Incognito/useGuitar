import { useQuery } from "@tanstack/react-query";
import { getUserOrdersApi } from "./apiOrders";

function useUserOrders(id) {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", id],
    queryFn: () => getUserOrdersApi(id),
  });
  return { orders, isLoading };
}

export default useUserOrders;
