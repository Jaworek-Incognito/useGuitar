import { useQuery } from "@tanstack/react-query";
import { getDeliveryCompanies } from "./apiDelivery";

export function useDeliveries() {
  const { isLoading, data: deliveries } = useQuery({
    queryKey: ["deliveries"],
    queryFn: getDeliveryCompanies,
  });

  return { isLoading, deliveries };
}
