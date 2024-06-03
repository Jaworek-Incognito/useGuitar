import { useQuery } from "@tanstack/react-query";
import { getSpecificProductsApi } from "./apiProducts";
import { useSearchParams } from "react-router-dom";

export function useProducts() {
  const [searchParams] = useSearchParams();
  let params = [];
  for (let entry of searchParams.entries()) {
    params.push(entry);
  }
  let category = "";
  if (window.location.href.includes("guitars")) {
    category = "guitar";
  } else if (window.location.href.includes("amplifiers")) {
    category = "amplifier";
  } else if (window.location.href.includes("pickups")) {
    category = "pickup";
  } else if (window.location.href.includes("multiEffects")) {
    category = "multi effect";
  }

  //check if params includes page
  let flag = false;

  params.map((param) => {
    if (param.includes("page")) {
      flag = true;
    }
  });

  if (!flag) {
    params.push(["page", "1"]);
  }

  const {
    isLoading,
    data: { products, productsCount, productsNeck, productsBody } = {},
  } = useQuery({
    queryKey: ["products", category, params],
    queryFn: () => getSpecificProductsApi({ category, params }),
  });

  return { isLoading, products, productsCount, productsNeck, productsBody };
}
