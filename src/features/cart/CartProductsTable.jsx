import { useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  increaseItemQuantity,
  setCartAfterFetch,
  deleteItem,
  decreaseItemQuantity,
} from "../../utilities/cartSlice";
import { priceConverter } from "../../helpers/priceConverter";

const StyledRow = styled.div`
  width: 94%;
  display: grid;
  grid-template-columns: 80px 1fr 200px 120px 80px;
  border-top: 1px solid #ddd;
  padding: 26px 6px;
  margin: 0 auto;
  background-color: #fff;
  @media (max-width: 800px) {
    grid-template-columns: 40% 20% 25% 15%;
    width: 100%;
  }
`;

const StyledCol = styled.span`
  display: flex;
  align-items: center;
  font-size: 18px;
  text-transform: uppercase;
  font-family: "Roboto";
  font-weight: 700;
  letter-spacing: 1px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 18px;
  color: #555;
  transition: all 0.2s;
  &:hover {
    color: #111;
  }
`;
const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 40px;
  width: 120px;
  background-color: #eee;
  border-radius: 12px;
`;
const StyledNavLink = styled(NavLink)`
  display: flex;
  color: #000;
  align-items: center;
  min-height: 40px;
`;
const StyledColImage = styled(StyledCol)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin-right: 20px;
  @media (max-width: 800px) {
    display: none;
  }
`;

const Img = styled.img`
  display: flex;
  width: auto;
  height: auto;
  max-width: 40px;
  max-height: 60px;
  object-fit: cover;
`;

function CartProductsTable({ products, cart }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCartAfterFetch(products));
  }, [dispatch, products]);

  return (
    <>
      {cart &&
        cart.map((product) => (
          <StyledRow key={product._id}>
            <StyledColImage>
              <StyledNavLink
                to={`/${
                  product.category === "multi effect"
                    ? "multiEffects"
                    : `${product.category}s`
                }/product/${product.name.replaceAll(" ", "_")}`}
              >
                <Img src={product.imageURL} />
              </StyledNavLink>
            </StyledColImage>
            <StyledNavLink
              to={`/${
                product.category === "multi effect"
                  ? "multiEffects"
                  : `${product.category}s`
              }/product/${product.name.replaceAll(" ", "_")}`}
            >
              <StyledCol>{product.name}</StyledCol>
            </StyledNavLink>
            <StyledCol>
              <QuantityContainer>
                <StyledButton
                  onClick={() => dispatch(decreaseItemQuantity(product._id))}
                >
                  <FaMinus />
                </StyledButton>
                {product.quantity}
                <StyledButton
                  onClick={() => dispatch(increaseItemQuantity(product._id))}
                >
                  <FaPlus />
                </StyledButton>
              </QuantityContainer>
            </StyledCol>
            <StyledCol>{priceConverter(product.price)}</StyledCol>
            <StyledCol>
              <StyledButton
                onClick={() => {
                  dispatch(deleteItem(product._id));
                }}
              >
                <MdDelete style={{ fontSize: "24px" }} />
              </StyledButton>
            </StyledCol>
          </StyledRow>
        ))}
    </>
  );
}

export default CartProductsTable;
