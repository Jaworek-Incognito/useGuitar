import styled from "styled-components";

export const Select = styled.select`
  font-family: "Lato";
  font-size: 18px;
  padding: 10px;
  margin-top: 8px;
  border-radius: 6px;
  font-weight: 300;
  outline: none;
  border: 1px solid #ddd;
  background-color: transparent;
  letter-spacing: 1px;
  &:disabled {
    opacity: 0.5;
    background-color: #ddd;
    cursor: not-allowed;
  }
  @media (max-width: 1280px) {
    width: 100%;
    padding: 10px 16px;
  }
`;
