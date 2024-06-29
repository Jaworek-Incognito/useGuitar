import styled from "styled-components";

export const Select = styled.select`
  font-family: "Lato";
  font-size: 18px;
  padding: 10px;
  margin-top: 8px;
  border-radius: 6px;
  font-weight: 300;
  outline: none;
  border: 1px solid var(--primary-border-color);
  background-color: transparent;
  letter-spacing: 1px;
  color: var(--secondary-font-color);
  &:disabled {
    opacity: 0.5;
    background-color: #000;
    cursor: not-allowed;
  }
  @media (max-width: 1280px) {
    width: 100%;
    padding: 10px 16px;
  }
`;
