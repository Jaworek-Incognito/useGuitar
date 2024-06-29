import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const InputContainer = styled.div`
  margin: 0 0 40px 0;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--primary-border-color);
`;

const StyledInput = styled.input`
  background-color: var(--primary-bg-color);
  color: #afb0b2;
  border: 1px solid var(--primary-border-color);
  font-size: 16px;
  padding: 16px;
  width: 75%;
  outline: none;
  margin-bottom: 40px;
  &:focus {
    border: 1px solid #555;
  }
`;

function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (name, value) => {
    searchParams.set(name, value);
    if (!value) searchParams.delete(name);
    setSearchParams(searchParams);
  };

  return (
    <InputContainer>
      <StyledInput
        type="text"
        placeholder="Search for products..."
        onChange={(e) => {
          handleChange("name", e.target.value);
        }}
      />
    </InputContainer>
  );
}

export default SearchInput;
