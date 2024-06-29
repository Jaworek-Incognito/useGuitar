import { useSelector } from "react-redux";
import styled from "styled-components";
import { getTotalCartPrice } from "../../utilities/cartSlice";
import { priceConverter } from "../../helpers/priceConverter";

const CostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;
const StyledSpan = styled.span`
  font-size: 20px;
  letter-spacing: 1px;
  color: var(--secondary-font-color);
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
      <StyledCost>$ {priceConverter(cartPrice)}</StyledCost>
    </CostContainer>
  );
}

export default CartSummary;
