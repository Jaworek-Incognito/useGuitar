import ProductsContainer from "@/app/_components/ProductsContainer";
import Spinner from "@/app/_components/Spinner";
import { getProductsByCategory } from "@/app/_lib/productsController";
import { PageSearchParamsProps } from "@/app/_types/types";
import { Suspense } from "react";

export const metadata = {
  title: "Amplifiers",
};

async function Page({ searchParams }: PageSearchParamsProps) {
  const category = "amplifier";
  const { products, productsCount } = await getProductsByCategory({
    searchParams,
    category,
  });
  return (
    <Suspense fallback={<Spinner />} key={category}>
      <ProductsContainer products={products} productsCount={productsCount} />
    </Suspense>
  );
}

export default Page;
