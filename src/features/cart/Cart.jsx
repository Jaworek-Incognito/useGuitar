import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CartProductsTable from "./CartProductsTable";
import CartSummary from "./CartSummary";
import EmptyCart from "../../ui/EmptyCart";
import { useUser } from "../../services/useUser";
import { useCartProducts } from "../../services/useCartProducts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CartButton } from "../../ui/CartButton";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 450px;
  margin: 40px auto 80px auto;
  width: 100%;
  position: relative;
  @media (max-width: 1000px) {
    display: block;
  }
`;

const StyledH1 = styled.h1`
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 4px;
  font-family: "Roboto";
  padding: 6px;
  margin-bottom: 40px;
  @media (max-width: 800px) {
    text-align: center;
  }
`;

const SummaryContainer = styled.div`
  position: sticky;
  width: 80%;
  top: 220px;
  height: 450px;
  margin: 30px auto 0 auto;
  @media (max-width: 1000px) {
    position: static;
    height: max-content;
  }
`;

function Cart() {
  const { cartProducts, isLoading } = useCartProducts();
  const { user } = useUser();

  const cart = useSelector((state) => state.cart.cartAfterFetch);
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!cartProducts) return <EmptyCart />;

  return (
    <>
      <Wrapper>
        <div>
          <StyledH1>Cart</StyledH1>

          <CartProductsTable products={cartProducts} cart={cart} />
        </div>
        <SummaryContainer>
          <StyledH1
            style={{
              textAlign: "center",
              padding: "12px ",
              marginBottom: "12px",
              borderBottom: "1px solid #999",
            }}
          >
            Summary
          </StyledH1>
          <CartSummary />
          <CartButton
            onClick={() => {
              if (!user) {
                toast.error("To make order please log in");
                return navigate("/login");
              }
              navigate("delivery");
            }}
          >
            Continue
          </CartButton>
        </SummaryContainer>
      </Wrapper>
    </>
  );
}

export default Cart;
