import { useSelector } from "react-redux";
import styled from "styled-components";
import { getTotalCartPrice } from "../../utilities/cartSlice";

const CostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;
const StyledSpan = styled.span`
  font-size: 20px;
  letter-spacing: 1px;
`;

const StyledCost = styled(StyledSpan)`
  font-weight: 700;
`;

function CartSummary({ priceProp }) {
  const price = useSelector(getTotalCartPrice);
  const cartPrice = priceProp || price;

  return (
    <CostContainer>
      <StyledSpan>{priceProp ? `Cart price:` : `Estimated Total:`}</StyledSpan>
      <StyledCost>{`$ ${cartPrice}`}</StyledCost>
    </CostContainer>
  );
}

export default CartSummary;
