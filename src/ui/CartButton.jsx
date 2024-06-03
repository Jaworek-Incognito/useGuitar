import styled from "styled-components";

export const CartButton = styled.button`
  font-size: 24px;
  background-color: #065ec0;
  width: 100%;
  color: #fff;
  border: none;
  outline: none;
  padding: 8px 0;
  transition: all 0.3s;
  letter-spacing: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  &:hover {
    background-color: #0654ab;
  }
  &:disabled {
    opacity: 0.5;
    background-color: #0654ab;
    cursor: not-allowed;
  }
`;
