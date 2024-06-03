import styled from "styled-components";

const MessageConatiner = styled.div`
  margin: 100px auto 0 auto;
  font-size: 32px;
  text-align: center;
`;

function EmptyCart() {
  return <MessageConatiner>Your cart is empty :(</MessageConatiner>;
}

export default EmptyCart;
