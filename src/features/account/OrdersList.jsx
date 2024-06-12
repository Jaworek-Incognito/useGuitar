import styled from "styled-components";
import useUserOrders from "../../services/useUserOrders";
import Spinner from "../../ui/Spinner";
import { NavLink } from "react-router-dom";
import { priceConverter } from "../../helpers/priceConverter";

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px 200px 240px;
  margin: 0 auto;
  min-width: 800px;
  width: 940px;
  font-size: 20px;
  letter-spacing: 2px;
  font-weight: 300;
  text-transform: uppercase;
  border-bottom: 1px solid #aaa;
  padding: 10px 40px 10px 0;
`;

const StyledNav = styled(NavLink)`
  color: #000;
  &:visited {
    color: #000;
  }
  &:active {
    color: #000;
  }
`;

const Table = styled.div`
  width: 1200px;
  margin-top: 60px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px 200px 240px;
  min-width: 800px;
  margin: 0 auto;
  width: 940px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 26px 40px 26px 0;
  border-bottom: 1px solid #eee;
  transition: all 0.18s;
  &:hover {
    background-color: #eee;
  }
`;

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function OrdersList({ user }) {
  const { _id: id } = user;

  const { orders, isLoading } = useUserOrders(id);

  if (isLoading) return <Spinner />;

  return (
    <Table>
      <TableHeader>
        <StyledSpan>order id</StyledSpan>
        <StyledSpan>total price</StyledSpan>
        <StyledSpan>status</StyledSpan>
        <StyledSpan>order accepted</StyledSpan>
      </TableHeader>
      {orders.map((order) => (
        <StyledNav key={order._id} to={`order/${order._id}`}>
          <TableRow>
            <StyledSpan>{order._id}</StyledSpan>
            <StyledSpan>$ {priceConverter(order.total)}</StyledSpan>
            <StyledSpan>{order.status}</StyledSpan>
            <StyledSpan>{order.createdAt.split("T")[0]}</StyledSpan>
          </TableRow>
        </StyledNav>
      ))}
    </Table>
  );
}

export default OrdersList;
