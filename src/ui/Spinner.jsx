import styled, { css, keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const StyledSpinner = styled.div`
  margin: 48px auto;

  width: 64px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #000 94%, #0000) top/10px 10px
      no-repeat,
    conic-gradient(#0000 30%, #000);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
  ${(props) =>
    props.variation === "white" &&
    css`
      background: radial-gradient(farthest-side, #fff 94%, #0000) top/10px 10px
          no-repeat,
        conic-gradient(#0000 30%, #fff);
      -webkit-mask: radial-gradient(
        farthest-side,
        #0000 calc(100% - 10px),
        #000 0
      );
    `}
`;

function Spinner({ variation }) {
  return <StyledSpinner variation={variation} />;
}

export default Spinner;
