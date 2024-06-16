import styled from "styled-components";

export const FormCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  @media (max-width: 1280px) {
    display: block;
    width: 100%;
  }
`;

export const SingleFormCol = styled(FormCol)`
  grid-template-columns: 1fr;
  @media (max-width: 1280px) {
    display: block;
    width: 100%;
  }
`;
