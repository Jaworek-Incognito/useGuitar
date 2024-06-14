import { useQuery } from "@tanstack/react-query";
import { getProductReviewsApi } from "./apiReviews";
import { useSearchParams } from "react-router-dom";

export function useProductReviews(id) {
  const [searchParams] = useSearchParams();
  const rating = searchParams.get("rating");
  const { isLoading, data: { reviews, ratingsCount } = {} } = useQuery({
    queryKey: ["reviews", id, rating],
    queryFn: () => getProductReviewsApi(id, rating),
  });
  return { isLoading, reviews, ratingsCount };
}
