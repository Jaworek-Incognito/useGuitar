import styled from "styled-components";

import { useSearchParams } from "react-router-dom";

const InputContainer = styled.div`
  margin: 0 0 40px 0;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ddd;
`;

const StyledInput = styled.input`
  background-color: #fff;
  color: #000;
  border: 1px solid #ddd;
  font-size: 16px;
  padding: 16px;
  width: 1000px;
  outline: none;
  margin-bottom: 40px;
  &:focus {
    border: 1px solid #555;
  }
`;

function ProductsOperations() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (name, value) => {
    searchParams.set(name, value);
    if (!value) searchParams.delete(name);
    setSearchParams(searchParams);
  };

  return (
    <>
      <InputContainer>
        <StyledInput
          type="text"
          placeholder="Search for products..."
          onChange={(e) => {
            handleChange("name", e.target.value);
          }}
        />
      </InputContainer>
    </>
  );
}

export default ProductsOperations;
