import styled from "styled-components";
import { StyledNavLink } from "../../ui/StyledNavLink";

const UnorderedList = styled.ul`
  margin: 0 auto;
  width: var(--page-width);
  display: flex;
  height: 100%;
  justify-content: center;
  list-style-type: none;

  @media (max-width: 900px) {
    height: fit-content;
    width: 100%;
    flex-direction: column;
    align-items: center;
    background-color: #000;
  }
`;

const ListElement = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function MenuList() {
  return (
    <UnorderedList>
      <ListElement>
        <StyledNavLink to="/guitars">Guitars</StyledNavLink>
      </ListElement>
      <ListElement>
        <StyledNavLink to="/amplifiers">Amplifiers</StyledNavLink>
      </ListElement>
      <ListElement>
        <StyledNavLink to="/pickups">Pickups</StyledNavLink>
      </ListElement>
      <ListElement>
        <StyledNavLink to="/multiEffects">Multi Effects</StyledNavLink>
      </ListElement>
    </UnorderedList>
  );
}

export default MenuList;
