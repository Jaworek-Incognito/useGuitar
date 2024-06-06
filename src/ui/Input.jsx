import styled from "styled-components";

export const Input = styled.input`
  font-family: "Lato";
  font-size: 18px;
  padding: 10px 16px;
  margin-top: 8px;
  border-radius: 6px;
  font-weight: 300;
  outline: none;
  border: 1px solid #ddd;
  background-color: transparent;
  letter-spacing: 1px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:disabled {
    opacity: 0.5;
    background-color: #ddd;
    cursor: not-allowed;
  }
`;
