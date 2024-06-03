import { NavLink } from "react-router-dom";
import styled from "styled-components";

const activeclass = "active";

export const StyledNavLink = styled(NavLink).attrs({ activeclass })`
  &:link,
  &:visited {
    display: flex;
    padding: 20px 30px;
    color: #7c7b7b;
    text-decoration: none;
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 4px;
    border-bottom: none;
    transition: color 0.2s;
  }
  &:hover {
    color: #2f3135;
  }
  &.${activeclass} {
    color: #000;
    border-bottom: 2px #2f3135 solid;
  }
`;
