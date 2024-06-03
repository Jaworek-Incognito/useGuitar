import { useQuery } from "@tanstack/react-query";
import { getProductReviewsApi } from "./apiReviews";

export function useGetProductReviews(id) {
  const { isLoading, data: reviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getProductReviewsApi(id),
  });
  return { isLoading, reviews };
}
