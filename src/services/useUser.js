import { useQuery } from "@tanstack/react-query";
import { getCurrentUserApi } from "./apiUser";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserApi,
  });
  return { user, isLoading };
}
