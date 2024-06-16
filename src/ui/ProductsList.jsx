import styled from "styled-components";
import Spinner from "./Spinner";
import ProductsElement from "./ProductsElement";
import Pagination from "./Pagination";
import { useEffect } from "react";

const Content = styled.div`
  padding-top: 14px;
`;

const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  color: #fff;
  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;
  }
  @media (max-width: 680px) {
    display: block;
    margin: 0 auto;
  }
`;

const Wrapper = styled.div`
  padding: 0px 0px 24px 60px;

  font-size: 16px;
  @media (max-width: 680px) {
    padding: 0;
  }
`;

function ProductsList({
  products,
  isLoadingProducts,
  productsCount,
  setCurrPage,
  currPage,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currPage]);

  return (
    <Wrapper>
      <Content>
        <Ul>
          {isLoadingProducts ? (
            <Spinner />
          ) : (
            products &&
            products.map((product) => (
              <ProductsElement product={product} key={product._id} />
            ))
          )}
        </Ul>
        <Pagination
          productsCount={productsCount}
          setCurrPage={setCurrPage}
          currPage={currPage}
        />
      </Content>
    </Wrapper>
  );
}

export default ProductsList;
