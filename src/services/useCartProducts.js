import getLocalStorageItem from "../helpers/getLocalStorageItem";
import { useQuery } from "@tanstack/react-query";
import { getCartProductsApi } from "./apiProducts";

export function useCartProducts() {
  const idArray = getLocalStorageItem("cart");
  const { isLoading, data: cartProducts } = useQuery({
    queryKey: ["cart", idArray],
    queryFn: () => getCartProductsApi(idArray),
  });
  return { isLoading, cartProducts };
}
