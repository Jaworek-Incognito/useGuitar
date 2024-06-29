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
    @media (max-width: 900px) {
      font-size: 36px;
      color: #fff;
    }
  }
  &:hover {
    color: #e9e9e9;
    @media (max-width: 900px) {
      color: #e9e9e9;
    }
  }
  &.${activeclass} {
    color: #e9e9e9;
    border-bottom: 2px #afb0b2 solid;
    @media (max-width: 900px) {
      color: #e9e9e9;
      border-bottom: none;
    }
  }
`;
