import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useOrder } from "../../services/useOrder";
import { OrderTableHeader } from "../../ui/OrderTableHeader";
import { OrderTableFooter } from "../../ui/OrderTableFooter";
import { OrderTableRow } from "../../ui/OrderTableRow";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  margin: 40px 0 80px 0;
  width: 80%;
`;

const CustomerContainer = styled.div`
  background-color: #ddd;
  border-radius: 6px;
  padding: 20px 28px;
  width: max-content;
  position: relative;
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

const StyledCartPrice = styled(StyledSpan)`
  font-weight: 700;
  letter-spacing: 1px;
`;

const StyledSpanNumer = styled(StyledSpan)`
  padding: 0 0 0 40px;
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

const StyledNavLink = styled(NavLink)`
  display: flex;
  color: #000;
  align-items: center;
  min-height: 40px;
`;

function Order() {
  const { order, isLoading: isLoadingOrder } = useOrder();

  if (isLoadingOrder) return <Spinner />;
  const { orderItems } = order;

  return (
    <Wrapper>
      <CustomerContainer>
        <StyledPar>{`${order.firstName} ${order.lastName}`}</StyledPar>
        <StyledPar>{`${order.address} ${order.postCode} ${order.city} `}</StyledPar>
        <StyledPar>{`${order.phoneNumber} ${order.country} `}</StyledPar>
      </CustomerContainer>
      <Table>
        <OrderTableHeader>
          <StyledSpan></StyledSpan>
          <StyledSpan>Name</StyledSpan>
          <StyledSpan>Unit price</StyledSpan>
          <StyledSpan>Amount</StyledSpan>
          <StyledSpan>Total price</StyledSpan>
        </OrderTableHeader>
        {orderItems.map((item) => (
          <OrderTableRow key={item._id}>
            <StyledColImage>
              <Img src={item.image} />
            </StyledColImage>

            <StyledSpan>{item.name}</StyledSpan>
            <StyledSpanNumer>$ {item.price}</StyledSpanNumer>

            <StyledSpanNumer>{item.quantity}</StyledSpanNumer>
            <StyledSpanNumer>$ {item.price * item.quantity}</StyledSpanNumer>
          </OrderTableRow>
        ))}
        <OrderTableFooter>
          <StyledSpan style={{ paddingRight: "42px" }}>
            Total price (with delivery cost):
          </StyledSpan>
          <StyledCartPrice style={{ paddingRight: "48px" }}>
            $ {order.total}
          </StyledCartPrice>
        </OrderTableFooter>
      </Table>
    </Wrapper>
  );
}

export default Order;
