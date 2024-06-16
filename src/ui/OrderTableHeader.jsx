import styled from "styled-components";

export const OrderTableHeader = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 140px 120px 180px;
  background-color: transparent;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #eee;
  height: 60px;
  width: 100%;
  @media (max-width: 1000px) {
    grid-template-columns: 80px 1fr 140px 70px 130px;
  }
  @media (max-width: 800px) {
    grid-template-columns: 35% 20% 20% 25%;
  }
`;
