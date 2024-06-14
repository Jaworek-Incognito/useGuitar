import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../services/useUser";
import { useEffect, useState } from "react";
import { useCartProducts } from "../../services/useCartProducts";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";

import { createValidProductObject } from "../../helpers/createValidProductObject";
import styled from "styled-components";
import CartSummary from "./CartSummary";
import { CartButton } from "../../ui/CartButton";
import { useDeliveries } from "../../services/useDelivery";
import { useCreateOrder } from "../../services/useCreateOrder";
import { OrderTableHeader } from "../../ui/OrderTableHeader";
import { OrderTableRow } from "../../ui/OrderTableRow";
import { OrderTableFooter } from "../../ui/OrderTableFooter";
import { priceConverter } from "../../helpers/priceConverter";

const StyledH1 = styled.h1`
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 4px;
  font-family: "Roboto";
  padding: 6px;
  margin-bottom: 40px;
`;

const Wrapper = styled.div`
  margin: 40px auto 80px auto;
  display: grid;
  grid-template-columns: 1fr 450px;
  position: relative;
`;

const EditButton = styled.button`
  position: absolute;
  top: 22px;
  right: 16px;
  border: none;
  background-color: transparent;
  color: #065ec0;
  cursor: pointer;
  font-size: 18px;
  font-weight: 300;
  font-family: "Lato";
  opacity: 0;
  transition: all 0.15s;
`;

const CustomerContainer = styled.div`
  background-color: #ddd;
  border-radius: 6px;
  padding: 20px 28px;
  width: max-content;
  position: relative;

  &:hover ${EditButton} {
    opacity: 1;
  }
`;

const StyledPar = styled.p`
  font-size: 18px;
  padding: 8px 0;
  letter-spacing: 1px;
`;

const Table = styled.div`
  margin-top: 20px;
`;

const StyledSpan = styled.span`
  margin: auto 0;
  padding: 0 24px;
  font-weight: 300;
  font-size: 18px;
`;

const StyledSpanNumber = styled(StyledSpan)`
  padding: 0 0 0 40px;
`;

const StyledCartPrice = styled(StyledSpan)`
  font-weight: 700;
  letter-spacing: 1px;
`;

const StyledColImage = styled(StyledSpan)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  display: flex;
  width: auto;
  height: auto;
  max-width: 40px;
  max-height: 60px;
  object-fit: cover;
`;

const PriceSummaryContainer = styled.div`
  position: sticky;
  top: 220px;
  width: 84%;
  height: fit-content;
  padding: 22px 28px;
  border-radius: 16px;
  background-color: #eee;
  margin: 30px auto 0 auto;
`;

const StyledTotalPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 1px;
  border-bottom: 1px solid #000;
  padding-bottom: 14px;
`;

const OtherCostsContainer = styled(StyledTotalPriceContainer)`
  font-size: 18px;
  font-weight: 500;
  border: none;
  padding: 0;
`;

const DeliveryContainer = styled.div`
  margin-top: 26px;
`;

const DeliveryTable = styled.div`
  font-size: 18px;
`;

const DeliveryRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px 80px;
  border-top: 1px solid #ddd;
  padding: 18px 16px;
`;

const DeliverySpan = styled.span`
  font-weight: 300;
  font-size: 16px;
`;

const DeliveryCompanySpan = styled.span`
  margin-left: 12px;
`;

const DeliveryCostSpan = styled.span`
  font-weight: 500;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  color: #000;
  align-items: center;
  min-height: 40px;
  text-transform: uppercase;
`;

function OrderOverview() {
  const [deliveryDetails, setDeliveryDetails] = useState({
    supplier: "",
    cost: 0,
  });
  const cart = useSelector((state) => state.cart.cartAfterFetch);
  const navigate = useNavigate();
  const { user, isLoadingUser } = useUser();
  const { cartProducts, isLoading: isLoadingProducts } = useCartProducts();
  const { deliveries } = useDeliveries();
  const { createOrder, isPending: isOrdering } = useCreateOrder();

  function handleButton() {
    const body = {
      clientProducts,
      supplier: deliveryDetails.supplier,
      cost: deliveryDetails.cost,
      totalPrice,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      email: user.email,
      phoneNumber: user.phoneNumber,
      postCode: user.postCode,
      country: user.country,
    };

    createOrder({ body });
  }

  useEffect(() => {
    if (!cart || cart.length < 1 || (!isLoadingUser && !user)) {
      return navigate("/cart");
    }
  }, [navigate, cart, user, isLoadingUser]);

  if (isLoadingProducts) return <Spinner />;

  const products = createValidProductObject(cartProducts, cart);

  const cartPrice = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalPrice = deliveryDetails.cost
    ? cartPrice + deliveryDetails.cost
    : cartPrice + 0;

  const clientProducts = products.map((product) => {
    const object = {
      product: product._id,
      quantity: product.quantity,
      price: product.price,
      image: product.image,
      name: product.name,
    };
    return object;
  });

  return (
    <Wrapper>
      <div>
        <StyledH1>Order overview</StyledH1>

        <CustomerContainer>
          <StyledPar>{`${user.firstName} ${user.lastName}`}</StyledPar>
          <StyledPar>{`${user.address} ${user.postCode} ${user.city} `}</StyledPar>
          <StyledPar>{`${user.phoneNumber} ${user.country} `}</StyledPar>
          <EditButton onClick={() => navigate("/cart/delivery")}>
            edit
          </EditButton>
        </CustomerContainer>
        <Table>
          <OrderTableHeader>
            <StyledSpan></StyledSpan>
            <StyledSpan>Name</StyledSpan>
            <StyledSpan>Unit price</StyledSpan>
            <StyledSpan>Amount</StyledSpan>
            <StyledSpan>Total price</StyledSpan>
          </OrderTableHeader>
          {products.map((product) => (
            <OrderTableRow key={product._id}>
              <StyledColImage>
                <Img src={product.image} />
              </StyledColImage>

              <StyledSpan>
                <StyledNavLink
                  to={`/${
                    product.category === "multi effect"
                      ? "multiEffects"
                      : `${product.category}s`
                  }/product/${product.name.replaceAll(" ", "_")}`}
                >
                  {product.name}
                </StyledNavLink>
              </StyledSpan>
              <StyledSpanNumber>
                $ {priceConverter(product.price)}
              </StyledSpanNumber>

              <StyledSpanNumber>{product.quantity}</StyledSpanNumber>
              <StyledSpanNumber>
                $ {priceConverter(product.price * product.quantity)}
              </StyledSpanNumber>
            </OrderTableRow>
          ))}
          <OrderTableFooter>
            <StyledSpan style={{ paddingRight: "42px" }}>
              Cart price:
            </StyledSpan>
            <StyledCartPrice style={{ paddingRight: "48px" }}>
              $ {priceConverter(cartPrice)}
            </StyledCartPrice>
          </OrderTableFooter>
        </Table>
      </div>
      <PriceSummaryContainer>
        <StyledH1
          style={{
            textAlign: "center",
            padding: "12px ",
            marginBottom: "12px",
          }}
        >
          Summary
        </StyledH1>
        <CartSummary priceProp={cartPrice} />
        <OtherCostsContainer>
          Delivery cost:{" "}
          <span>
            {" "}
            {deliveryDetails.cost === 0
              ? "-"
              : `$ ${priceConverter(deliveryDetails.cost)}`}
          </span>
        </OtherCostsContainer>
        <StyledTotalPriceContainer>
          Total price: <span>$ {priceConverter(totalPrice)}</span>
        </StyledTotalPriceContainer>
        <CartButton
          disabled={deliveryDetails.cost === 0 || isOrdering}
          onClick={handleButton}
        >
          {isOrdering ? <SpinnerMini /> : "Pay and order"}
        </CartButton>
      </PriceSummaryContainer>
      <DeliveryContainer>
        <StyledH1>Delivery method</StyledH1>
        <DeliveryTable>
          <form>
            {deliveries &&
              deliveries.map((delivery) => (
                <DeliveryRow key={delivery._id}>
                  <div>
                    <input
                      type="radio"
                      name="delivery method"
                      value={delivery.supplier}
                      onChange={() =>
                        setDeliveryDetails({
                          supplier: delivery.supplier,
                          cost: delivery.cost,
                        })
                      }
                    />
                    <DeliveryCompanySpan>
                      {delivery.supplier}
                    </DeliveryCompanySpan>
                  </div>
                  <DeliverySpan style={{ fontWeight: "300" }}>
                    delivery to you in {delivery.time} business days
                  </DeliverySpan>
                  <DeliveryCostSpan>
                    $ {priceConverter(delivery.cost)}
                  </DeliveryCostSpan>
                </DeliveryRow>
              ))}
          </form>
        </DeliveryTable>
      </DeliveryContainer>
    </Wrapper>
  );
}

export default OrderOverview;
