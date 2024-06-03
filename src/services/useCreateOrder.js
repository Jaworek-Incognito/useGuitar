import { useMutation } from "@tanstack/react-query";
import { createOrderApi } from "./apiOrders";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import setLocalStorageItem from "../helpers/setLocalStorageItem";

export function useCreateOrder() {
  const navigate = useNavigate();
  const { mutate: createOrder, isPending } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: (data) => {
      toast.dismiss();
      navigate(`/payment/${data._id}`);
      setLocalStorageItem("cart", "");
    },
    onError: (err) => {
      toast.dismiss();
      toast.error(err.message);
    },
  });
  return { createOrder, isPending };
}
