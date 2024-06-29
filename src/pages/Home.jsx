import styled from "styled-components";
import { useDiscountedProducts } from "../services/useDiscountedProducts";
import ProductsElement from "../ui/ProductsElement";
import Spinner from "../ui/Spinner";
import { useFeaturedProducts } from "../services/useFeaturedProducts";

const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  color: #fff;
  @media (max-width: 700px) {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
`;

const StyledH1 = styled.h1`
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 4px;
  font-family: "Roboto";
  padding: 6px;
  margin-bottom: 40px;
  color: var(--primary-font-color);
  @media (max-width: 700px) {
    text-align: center;
  }
`;

function Home() {
  const { discountedProducts, isLoading: isLoadingDiscountedProducts } =
    useDiscountedProducts();
  const { featuredProducts, isLoading: isLoadingFeaturedProducts } =
    useFeaturedProducts();

  const isLoading = isLoadingDiscountedProducts || isLoadingFeaturedProducts;
  if (isLoading) return <Spinner />;

  return (
    <>
      <StyledH1>Best Deals</StyledH1>
      <Ul>
        {discountedProducts &&
          discountedProducts.map((product) => (
            <ProductsElement product={product} key={product._id} />
          ))}
      </Ul>
      <StyledH1>We Recomended</StyledH1>
      <Ul>
        {featuredProducts &&
          featuredProducts.map((product) => (
            <ProductsElement product={product} key={product._id} />
          ))}
      </Ul>
    </>
  );
}

export default Home;
