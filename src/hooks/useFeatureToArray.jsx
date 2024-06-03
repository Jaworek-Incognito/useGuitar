import { useProducts } from "../services/useProducts";
import Spinner from "../ui/Spinner";

export function useFeatureToArray(feature) {
  const { products, isLoading } = useProducts();
  if (isLoading) return <Spinner />;
  let bodyArray = products.map((product) => {
    return product?.[feature];
  });

  bodyArray = bodyArray.reduce((prev, cur) => {
    prev[cur] = (prev[cur] || 0) + 1;
    return prev;
  }, {});
  return Object.entries(bodyArray);
}
