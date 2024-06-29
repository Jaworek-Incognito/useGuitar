import styled, { css, keyframes } from "styled-components";

export const StyledH1 = styled.h1`
  display: flex;
  text-transform: uppercase;
  font-size: 18px;
  padding: 14px 0 20px 0;
  flex-grow: 1;
  justify-content: flex-start;
  color: var(--primary-font-color);
`;

export const IconWrapper = styled.div`
  font-size: 22px;
  margin: auto;
  cursor: pointer;
  color: var(--primary-font-color);
`;

export const HeaderWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid var(--primary-border-color);
  cursor: pointer;
`;

export const StyledUl = styled.ul`
  list-style-type: none;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-gutter: stable;
  scrollbar-color: var(--primary-font-color) var(--primary-bg-color);
  animation: ${(props) =>
    props.animation
      ? css`
          ${slideOut} .9s forwards
        `
      : css`
          ${slideIn} .75s forwards
        `};
`;
const slideIn = keyframes`
    from {max-height: 300px;}
    to {max-height: 0;}

`;

const slideOut = keyframes`
    from {max-height: 0;}
    to {max-height: 300px;}

`;

export const StyledUlScrollbarHidden = styled(StyledUl)`
  overflow-y: hidden;
  scrollbar-gutter: unset;

  animation: ${(props) =>
    props.animation
      ? css`
          ${slideOut} 1.4s forwards
        `
      : css`
          ${slideIn} .6s forwards
        `};
`;

export const StyledUlCategories = styled(StyledUl)`
  overflow-y: hidden;
  scrollbar-gutter: unset;
`;

export const StyledLi = styled.li`
  display: flex;
  align-items: center;
  text-transform: uppercase;
`;

export const StyledButton = styled.button`
  font-family: "Lato";
  background-color: transparent;
  border: none;
  outline: none;
  color: var(--primary-font-color);
  text-transform: uppercase;
  font-size: 16px;
  padding: 12px;
  font-weight: 700;
  cursor: pointer;
  width: 75%;
  text-align: left;
  transition: color 0.2s;
  flex-grow: 1;
  &:hover {
    color: var(--secondary-font-color);
  }
`;

export const StyledInput = styled.input`
  background-color: var(--primary-bg-color);
  color: var(--primary-font-color);
  border: 1px solid var(--primary-border-color);
  font-size: 16px;
  padding: 8px;
  width: 80px;
  outline: none;
  &:focus {
    border: 1px solid #555;
  }
`;

export const StyledLiInput = styled.li`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-transform: uppercase;
  padding: 16px;
  color: var(--primary-border-color);
`;

export const StyledSpan = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #aaa;
`;
