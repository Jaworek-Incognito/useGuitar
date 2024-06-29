import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getCurrentUserApi } from "../../services/apiUser";
import { useUser } from "../../services/useUser";

const StyledLogo = styled.header`
  margin: 0 auto;
  width: var(--page-width);
`;

const StyledImage = styled.img`
  object-fit: cover;
  width: 300px;
  aspect-ratio: 4/2;
  @media (max-width: 500px) {
    width: 180px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 33%;
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 33%;
  gap: 26px;
  @media (max-width: 500px) {
    gap: 8px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 40px;
`;

const StyledSpan = styled.span`
  font-size: 40px;
  cursor: pointer;
`;

const CartIconContainer = styled.div`
  position: relative;
  background-color: #065ec0;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartLengthContainer = styled.div`
  position: absolute;
  right: 2px;
  bottom: 5px;
  background-color: #fff;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 16px;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;
function Logo() {
  const curCart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  async function handleClick() {
    const response = await getCurrentUserApi();

    if (response !== 401) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  }
  return (
    <StyledLogo>
      <Wrapper>
        <Container></Container>
        <Container>
          <NavLink to="/">
            <StyledImage src="https://res.cloudinary.com/dlartwnnr/image/upload/v1715989024/logo-white-no-background_yb7i1k.svg" />
          </NavLink>
        </Container>
        <IconsContainer>
          <StyledSpan title="Account" onClick={handleClick}>
            <MdOutlineAccountCircle style={{ color: "#e9e9e9" }} />
          </StyledSpan>
          <StyledNavLink to={"cart"} title="Cart">
            <CartIconContainer>
              <IoCartOutline style={{ color: "#e9e9e9" }} />

              <CartLengthContainer>
                {curCart?.length > 9 ? "9+" : curCart?.length || "0"}
              </CartLengthContainer>
            </CartIconContainer>
          </StyledNavLink>
        </IconsContainer>
      </Wrapper>
    </StyledLogo>
  );
}

export default Logo;
