import { useMutation } from "@tanstack/react-query";
import { LoginApi } from "./apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: Login, isPending } = useMutation({
    mutationFn: LoginApi,
    onSuccess: () => {
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
