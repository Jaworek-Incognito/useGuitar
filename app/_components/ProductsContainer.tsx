"use client";

import { useState } from "react";
import Filter from "./Filter";
import ProductList from "./ProductList";
import Search from "./Search";
import Pagination from "./Pagination";
import Sort from "./Sort";

type ProductsContaierProps = {
  products: {}[];
  productsBody?: string[];
  productsNeck?: string[];
  productsCount: number;
};

function ProductsContainer({
  products,
  productsBody,
  productsNeck,
  productsCount,
}: ProductsContaierProps) {
  const [currPage, setCurrPage] = useState<number>(1);

  return (
    <>
      <Search />
      <div className="grid grid-cols-[300px_3fr] mt-8">
        <aside className="flex flex-col h-fit">
          <Filter
            productsBody={productsBody}
            productsNeck={productsNeck}
            setCurrPage={setCurrPage}
          />
        </aside>
        <article>
          <Sort />
          <ProductList products={products} productsCount={productsCount} />
          <Pagination
            productsCount={productsCount}
            currPage={currPage}
            setCurrPage={setCurrPage}
          />
        </article>
      </div>
    </>
  );
}

export default ProductsContainer;