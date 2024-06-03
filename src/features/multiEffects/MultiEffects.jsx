import styled from "styled-components";
import ProductsList from "../../ui/ProductsList";
import { useProducts } from "../../services/useProducts";
import MultiEffectsFilters from "./MultiEffectsFilters";
import SearchInput from "../../ui/SearchInput";
import Sort from "../../ui/Sort";
import { useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 3fr;
`;

const MenuWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const ProductsWrapper = styled.div`
  background-color: transparent;
`;

function MultiEffects() {
  const [currPage, setCurrPage] = useState(1);
  const {
    isLoading: isLoadingProducts,
    products,
    productsCount,
  } = useProducts();

  return (
    <>
      <SearchInput />
      <Wrapper>
        <MenuWrapper>
          <MultiEffectsFilters currPage={currPage} />
        </MenuWrapper>
        <ProductsWrapper>
          <Sort />
          <ProductsList
            isLoadingProducts={isLoadingProducts}
            products={products}
            productsCount={productsCount}
            currPage={currPage}
          />
        </ProductsWrapper>
      </Wrapper>
    </>
  );
}

export default MultiEffects;
