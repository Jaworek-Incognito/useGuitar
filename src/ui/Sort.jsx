import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const SortWrapper = styled.div`
  display: flex;
  width: 62vw;
  justify-content: flex-end;
  gap: 10px;
  align-items: center;
  @media (max-width: 900px) {
    margin: 0 auto;
    justify-content: center;
    padding-top: 22px;
  }
`;

const Select = styled.select`
  font-size: 16px;
  padding: 4px 8px;
  border-radius: 4px;
  outline: none;
  border: 1px solid var(--primary-border-color);
  background-color: var(--primary-bg-color);
  color: #afb0b2;
`;

function Sort() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(name, value) {
    searchParams.set(name, value);
    if (!value) searchParams.delete(name);
    setSearchParams(searchParams);
  }
  return (
    <SortWrapper>
      <label htmlFor="sort"></label>
      <Select
        id="sort"
        onChange={(e) => handleChange("sortBy", e.target.value)}
      >
        <option value="createdAt">Default</option>
        <option value="name">Name (A-Z)</option>
        <option value="-name">Name (Z-A)</option>
        <option value="price">Price (low-high)</option>
        <option value="-price">Price (high-low)</option>
        <option value="-featured">Featured first</option>
        <option value="-numOfReviews">Popularity</option>
      </Select>
    </SortWrapper>
  );
}

export default Sort;
