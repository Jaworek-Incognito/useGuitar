import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useOrder } from "../../services/useOrder";
import { OrderTableHeader } from "../../ui/OrderTableHeader";
import { OrderTableFooter } from "../../ui/OrderTableFooter";
import { OrderTableRow } from "../../ui/OrderTableRow";
import { priceConverter } from "../../helpers/priceConverter";

const Wrapper = styled.div`
  margin: 40px 0 80px 0;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 900px) {
    width: 100%;
  }
  @media (max-width: 750px) {
    display: block;
  }
`;

const CustomerContainer = styled.div`
  background-color: var(--primary-bg-color);
  color: var(--primary-font-color);
  border-radius: 6px;
  padding: 20px 28px;
  width: fit-content;
  @media (max-width: 750px) {
    margin-left: 20px;
  }
`;

const StatusContainer = styled(CustomerContainer)`
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  background-color: var(--primary-bg-color);
  color: var(--secondary-font-color);
  @media (max-width: 750px) {
    margin-left: 20px;
    margin-top: 20px;
  }
`;

const StyledPar = styled.p`
  font-size: 18px;
  padding: 8px 0;
  letter-spacing: 1px;
`;

const StyledStatusPar = styled(StyledPar)`
  letter-spacing: 2px;
  font-size: 16px;
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
  @media (max-width: 500px) {
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

const StyledSpanName = styled(StyledSpan)`
  text-transform: uppercase;
`;

const StyledSpanImage = styled(StyledSpan)`
  @media (max-width: 500px) {
    display: none;
  }
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
      <StatusContainer>
        <StyledStatusPar>Order id</StyledStatusPar>
        <StyledStatusPar>{order._id}</StyledStatusPar>
        <StyledStatusPar>Status</StyledStatusPar>
        <StyledStatusPar>{order.status}</StyledStatusPar>
      </StatusContainer>
      <Table>
        <OrderTableHeader>
          <StyledSpanImage></StyledSpanImage>
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

            <StyledSpanName>{item.name}</StyledSpanName>
            <StyledSpanNumer>$ {priceConverter(item.price)}</StyledSpanNumer>

            <StyledSpanNumer>{item.quantity}</StyledSpanNumer>
            <StyledSpanNumer>
              $ {priceConverter(item.price * item.quantity)}
            </StyledSpanNumer>
          </OrderTableRow>
        ))}
        <OrderTableFooter>
          <StyledSpan style={{ paddingRight: "42px" }}>
            Total price (with delivery cost):
          </StyledSpan>
          <StyledCartPrice style={{ paddingRight: "48px" }}>
            $ {priceConverter(order.total)}
          </StyledCartPrice>
        </OrderTableFooter>
      </Table>
    </Wrapper>
  );
}

export default Order;
