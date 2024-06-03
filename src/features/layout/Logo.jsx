import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { GetCurrentUserApi } from "../../services/apiUser";

const StyledLogo = styled.header`
  margin: 0 auto;
  width: var(--page-width);
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #fff;
`;

const StyledImage = styled.img`
  object-fit: cover;
  width: 300px;
  aspect-ratio: 4/2;
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
  color: #000;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 40px;
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
    const user = await GetCurrentUserApi();
    if (user) {
      navigate("/account");
    }
  }
  return (
    <StyledLogo>
      <Wrapper>
        <Container></Container>
        <Container>
          <NavLink to="/">
            <StyledImage src="https://res.cloudinary.com/dlartwnnr/image/upload/v1714754997/logo-black_wiuzhy.svg" />
          </NavLink>
        </Container>
        <IconsContainer>
          <StyledNavLink title="Account" onClick={handleClick}>
            <MdOutlineAccountCircle style={{ color: "#000" }} />
          </StyledNavLink>
          <StyledNavLink to={"cart"} title="Cart">
            <CartIconContainer>
              <IoCartOutline style={{ color: "#fff" }} />

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
