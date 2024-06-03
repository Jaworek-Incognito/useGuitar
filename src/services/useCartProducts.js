import getLocalStorageItem from "../helpers/getLocalStorageItem";
import { useQuery } from "@tanstack/react-query";
import { getCartProductsApi } from "./apiProducts";

export function useCartProducts() {
  const idArray = getLocalStorageItem("cart");
  //   if (!idArray || idArray?.length === 0) {
  //     toast.error("There is no products in your cart");
  //     throw new Error("There is no products in your cart");
  //   }
  const { isLoading, data: cartProducts } = useQuery({
    queryKey: ["cart", idArray],
    queryFn: () => getCartProductsApi(idArray),
  });
  return { isLoading, cartProducts };
}
