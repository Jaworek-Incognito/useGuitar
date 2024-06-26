import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import Menu from "./Menu";

const StyledAppLayout = styled.div`
  background-color: var(--main-wrapper-bg-color);
  min-height: 100dvh;
`;

const StyledNav = styled.div`
  width: 100%;
  border-top: 1px var(--primary-border-color) solid;
`;

const StyledHeader = styled.div`
  padding: 8px 0;
  width: 100%;
`;

const StyledMenu = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  height: 230px;
  @media (max-width: 1300px) {
    max-width: 1200px;
    grid-template-rows: 160px auto;
  }
  @media (max-width: 900px) {
    grid-template-rows: 160px auto;
    height: auto;
  }
  @media (max-width: 500px) {
    grid-template-rows: 100px auto;
    height: auto;
  }
`;

const Wrapper = styled.div`
  padding: 40px 48px 0px;
  background-color: var(--main-wrapper-bg-color);
  @media (max-width: 900px) {
    padding: 40px 0 20px 0;
  }
`;

const Main = styled.main`
  margin: 0 auto;
  width: var(--page-width);
  background-color: var(--main-wrapper-bg-color);
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <StyledMenu>
        <StyledHeader>
          <Logo />
        </StyledHeader>
        <StyledNav>
          <Menu />
        </StyledNav>
      </StyledMenu>
      <Wrapper>
        <Main>
          <Outlet />
        </Main>
      </Wrapper>
    </StyledAppLayout>
  );
}

export default AppLayout;
