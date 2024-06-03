import styled from "styled-components";
import Spinner from "./Spinner";
import ProductsElement from "./ProductsElement";
import Pagination from "./Pagination";

const Content = styled.div`
  padding-top: 14px;
`;

const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;

  color: #fff;
`;

const Wrapper = styled.div`
  padding: 0px 40px 24px 60px;
  font-size: 16px;
  /* background-color: #ddd; */
`;

function ProductsList({
  products,
  isLoadingProducts,
  productsCount,
  setCurrPage,
  currPage,
}) {
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
