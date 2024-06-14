import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReviewApi } from "./apiReviews";
import toast from "react-hot-toast";

export function useCreateReview() {
  const queryClient = useQueryClient();
  const { mutate: createReview, isPending } = useMutation({
    mutationFn: createReviewApi,
    onMutate: () => {
      toast.loading("Creating...");
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["product"],
      });
      queryClient.refetchQueries({
        queryKey: ["reviews"],
      });

      toast.dismiss();
      toast.success("Review successfully added");
    },
    onError: (err) => {
      toast.dismiss();
      toast.error(err.message);
    },
  });
  return { createReview, isPending };
}
