import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderingUserApi } from "./apiUser";
import toast from "react-hot-toast";

export function useUpdateOrderingUser() {
  const queryClient = useQueryClient();
  const { mutate: updateOrderingUser, isPending } = useMutation({
    mutationFn: updateOrderingUserApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
    onError: (err) => {
      toast.dismiss();
      toast.error(err.message);
    },
  });
  return { updateOrderingUser, isPending };
}
