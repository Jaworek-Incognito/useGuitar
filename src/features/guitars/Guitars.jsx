import styled from "styled-components";
import ProductsList from "../../ui/ProductsList";
import GuitarFilters from "./GuitarFilters";
import { useProducts } from "../../services/useProducts";
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

function Guitars() {
  const [currPage, setCurrPage] = useState(1);
  const {
    isLoading: isLoadingProducts,
    products,
    productsCount,
    productsNeck,
    productsBody,
  } = useProducts();

  return (
    <>
      <SearchInput />
      <Wrapper>
        <MenuWrapper>
          <GuitarFilters
            productsNeck={productsNeck}
            productsBody={productsBody}
            setCurrPage={setCurrPage}
          />
        </MenuWrapper>
        <ProductsWrapper>
          <Sort />
          <ProductsList
            productsCount={productsCount}
            isLoadingProducts={isLoadingProducts}
            products={products}
            currPage={currPage}
            setCurrPage={setCurrPage}
          />
        </ProductsWrapper>
      </Wrapper>
    </>
  );
}

export default Guitars;
