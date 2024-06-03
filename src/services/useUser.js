import { useQuery } from "@tanstack/react-query";
import { GetCurrentUserApi } from "./apiUser";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: GetCurrentUserApi,
  });
  return { user, isLoading };
}
