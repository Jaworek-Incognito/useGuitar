import styled from "styled-components";
import ProductsList from "../../ui/ProductsList";
import { useProducts } from "../../services/useProducts";
import AmplifiersFilters from "./AmplifiersFilters";
import SearchInput from "../../ui/SearchInput";
import Sort from "../../ui/Sort";
import { useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 3fr;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MenuWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  height: fit-content;
  @media (max-width: 900px) {
    display: block;
    margin: 0 auto;
    min-width: 75%;
  }
`;

const ProductsWrapper = styled.div`
  background-color: transparent;
`;

function Amplifiers() {
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
          <AmplifiersFilters currPage={currPage} />
        </MenuWrapper>
        <ProductsWrapper>
          <Sort />
          <ProductsList
            isLoadingProducts={isLoadingProducts}
            products={products}
            productsCount={productsCount}
            currPage={currPage}
            setCurrPage={setCurrPage}
          />
        </ProductsWrapper>
      </Wrapper>
    </>
  );
}

export default Amplifiers;
