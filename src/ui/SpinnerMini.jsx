import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
  margin: auto;
  width: 24px;
  height: 24px;
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
