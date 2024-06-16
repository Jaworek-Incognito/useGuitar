import styled from "styled-components";

export const FormRow = styled.div`
  display: grid;
  grid-template-rows: 1fr auto 16px;
  @media (max-width: 1280px) {
    display: block;
    width: 100%;
  }
`;
