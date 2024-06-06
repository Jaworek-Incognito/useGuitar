import styled from "styled-components";

export const FormCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const SingleFormCol = styled(FormCol)`
  grid-template-columns: 1fr;
`;
