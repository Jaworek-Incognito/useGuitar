import { useMutation } from "@tanstack/react-query";
import { updateStatusOrderApi } from "./apiOrders";

export function useUpdateStatusOrder() {
  const { mutate: updateStatusOrder, isPending } = useMutation({
    mutationFn: updateStatusOrderApi,
  });
  return { updateStatusOrder, isPending };
}
