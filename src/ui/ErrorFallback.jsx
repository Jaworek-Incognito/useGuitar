import { NavLink } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";

const Wrapper = styled.div`
  min-height: 100dvh;
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #0f131b;
  color: #e9e9e9;
  text-transform: uppercase;
  font-size: 26px;
  letter-spacing: 2px;
  gap: 20px;
`;

const StyledNavLink = styled(NavLink)`
  width: fit-content;
  height: fit-content;

  color: var(--secondary-font-color);
`;

const Img = styled.img`
  object-fit: cover;
  aspect-ratio: 4/3;
  width: 400px;
`;

const Container = styled.div`
  padding-bottom: 240px;
`;

function ErrorFallback({ error }) {
  console.log(error);
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <StyledNavLink to={"/"}>
          <Img src="https://res.cloudinary.com/dlartwnnr/image/upload/v1715989024/logo-white-no-background_yb7i1k.svg" />
        </StyledNavLink>
        <Container>Something went wrong :(</Container>
      </Wrapper>
    </>
  );
}

export default ErrorFallback;
