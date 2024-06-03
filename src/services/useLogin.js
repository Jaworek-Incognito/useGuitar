import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginApi } from "./apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: Login, isPending } = useMutation({
    mutationFn: LoginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      toast.dismiss();
      toast.success("You logged in!");
      navigate("/");
    },
    onError: (err) => {
      toast.dismiss();
      toast.error(err.message);
    },
  });
  return { Login, isPending };
}
