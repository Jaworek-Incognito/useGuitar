import { useState } from "react";
import styled from "styled-components";
import Delivery from "../../pages/Delivery";
import ChangePassword from "./ChangePassword";
import { LogoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import OrdersList from "./OrdersList";
import { useUser } from "../../services/useUser";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 3fr;
  @media (max-width: 900px) {
    display: block;
  }
`;

const MenuWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin-top: 160px;
  @media (max-width: 900px) {
    margin-top: 0px;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 40px;
`;

const StyledUl = styled.ul`
  list-style-type: none;
`;

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  font-size: 18px;
  border-bottom: 1px solid var(--primary-border-color);
  cursor: pointer;
  padding: 14px 0 20px 0;
  color: var(--primary-font-color);
  transition: color 0.2s;
  &:hover {
    color: var(--secondary-font-color);
  }
  @media (max-width: 900px) {
    justify-content: center;
  }
`;

function Account() {
  const [isOpen, setIsOpen] = useState("shipment");
  const navigate = useNavigate();
  const { user } = useUser();

  async function handleClick() {
    const response = await LogoutApi();
    navigate("/");
    toast.success(response);
  }
  return (
    <Wrapper>
      <MenuWrapper>
        <StyledUl>
          <StyledLi
            style={{
              color: isOpen === "shipment" && "var(--secondary-font-color)",
            }}
            onClick={() => setIsOpen("shipment")}
          >
            shipment details
          </StyledLi>
          <StyledLi
            style={{
              color: isOpen === "password" && "var(--secondary-font-color)",
            }}
            onClick={() => setIsOpen("password")}
          >
            change password
          </StyledLi>
          <StyledLi
            style={{
              color: isOpen === "orders" && "var(--secondary-font-color)",
            }}
            onClick={() => setIsOpen("orders")}
          >
            my orders
          </StyledLi>
          <StyledLi onClick={handleClick}>logout</StyledLi>
        </StyledUl>
      </MenuWrapper>
      <ContentWrapper>
        {isOpen === "shipment" && <Delivery isAccountPage={true} />}
        {isOpen === "password" && <ChangePassword />}
        {isOpen === "orders" && <OrdersList user={user} />}
      </ContentWrapper>
    </Wrapper>
  );
}

export default Account;
