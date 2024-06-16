import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import Menu from "./Menu";

const StyledAppLayout = styled.div`
  background-color: #fff;
`;

const StyledNav = styled.div`
  width: 100%;
  color: #fff;
  border-top: 1px #2f3135 solid;
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
  @media (max-width: 900px) {
    padding: 40px 0 20px 0;
  }
`;

const Main = styled.main`
  margin: 0 auto;
  width: var(--page-width);
  background-color: #fff;
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
