import { useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Arrow = styled.span`
  font-size: 20px;
  cursor: pointer;
`;

const Li = styled.li`
  font-size: 18px;
  list-style: none;
  margin: 6px;
  cursor: pointer;
  color: ${(props) => (props.active === "true" ? "#000" : "#ddd")};
`;

function Pagination({ productsCount, currPage, setCurrPage }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = 12;
  const pagesCount = Math.floor(productsCount / limit + 1);

  const pagesArray = [];
  for (let i = 1; i <= pagesCount; i++) {
    pagesArray.push(i);
  }

  useEffect(() => {
    searchParams.set("page", currPage);
    setSearchParams(searchParams);
  }, [currPage, searchParams, setSearchParams]);

  return (
    <>
      {pagesArray.length > 1 && (
        <Wrapper>
          <Arrow
            onClick={() => {
              setCurrPage(currPage > 1 ? currPage - 1 : currPage);
            }}
          >
            <IoIosArrowBack />
          </Arrow>
          {pagesArray.map((page) => (
            <Li
              key={page}
              onClick={() => {
                setCurrPage(page);
              }}
              active={currPage === page && "true"}
            >
              {page}
            </Li>
          ))}
          <Arrow
            onClick={() => {
              setCurrPage(currPage < pagesCount ? currPage + 1 : currPage);
            }}
          >
            <IoIosArrowForward />
          </Arrow>
        </Wrapper>
      )}
    </>
  );
}

export default Pagination;
