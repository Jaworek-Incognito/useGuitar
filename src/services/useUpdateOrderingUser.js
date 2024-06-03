import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateOrderingUserApi } from "./apiUser";
import toast from "react-hot-toast";

export function useUpdateOrderingUser() {
  const queryClient = useQueryClient();
  const { mutate: updateOrderingUser, isPending } = useMutation({
    mutationFn: UpdateOrderingUserApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
    onError: (err) => {
      toast.dismiss();
      toast.error(err.message);
    },
  });
  return { updateOrderingUser, isPending };
}
