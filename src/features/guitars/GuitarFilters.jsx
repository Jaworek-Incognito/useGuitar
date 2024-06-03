import styled, { css, keyframes } from "styled-components";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegMinusSquare } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoMdCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const slideOut = keyframes`
    from {max-height: 0;}
    to {max-height: 300px;}

`;
const slideIn = keyframes`
    from {max-height: 300px;}
    to {max-height: 0;}

`;

const HeaderWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #aaa;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  font-size: 22px;
  margin: auto;
  cursor: pointer;
`;

const StyledH1 = styled.h1`
  display: flex;
  text-transform: uppercase;
  font-size: 18px;
  padding: 14px 0 20px 0;
  flex-grow: 1;
  justify-content: flex-start;
`;

const StyledUl = styled.ul`
  list-style-type: none;
  overflow-y: auto;
  scrollbar-color: #000 #fff;
  scrollbar-width: thin;
  scrollbar-gutter: stable;

  animation: ${(props) =>
    props.animation
      ? css`
          ${slideOut} .9s forwards
        `
      : css`
          ${slideIn} .75s forwards
        `};
  /* border: 2px solid #434545; */
`;

const StyledUlScrollbarHidden = styled(StyledUl)`
  overflow-y: hidden;
  scrollbar-gutter: unset;
  animation: ${(props) =>
    props.animation
      ? css`
          ${slideOut} 1.4s forwards
        `
      : css`
          ${slideIn} .6s forwards
        `};
`;

const StyledUlCategories = styled(StyledUl)`
  overflow-y: hidden;
  scrollbar-gutter: unset;
`;

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  text-transform: uppercase;
`;

const StyledButton = styled.button`
  font-family: "Lato";
  background-color: transparent;
  border: none;
  outline: none;
  color: #434545;
  text-transform: uppercase;
  font-size: 16px;
  padding: 12px;
  font-weight: 700;
  cursor: pointer;
  width: 75%;
  text-align: left;
  transition: color 0.2s;
  flex-grow: 1;
  &:hover {
    color: #000;
  }
`;

const StyledInput = styled.input`
  background-color: #fff;
  color: #000;
  border: 1px solid #ddd;
  font-size: 16px;
  padding: 8px;
  width: 80px;
  outline: none;
  &:focus {
    border: 1px solid #555;
  }
`;

const StyledLiInput = styled.li`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-transform: uppercase;
  padding: 16px;
`;

const StyledSpan = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #aaa;
`;

function GuitarFilters({ productsNeck, productsBody, setCurrPage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let params = [];
  for (let entry of searchParams.entries()) {
    if (entry[0].includes("-")) {
      params.push(entry[0].split("-")[1]);
    } else {
      params.push(entry[0]);
    }
  }

  const [isOpen, setIsOpen] = useState(params || []);
  const [isMounted, setIsMounted] = useState(params || []);

  function handleClick(name, value) {
    if (searchParams.get(name) === value) {
      searchParams.set(name, value);
      searchParams.delete(name);
      setSearchParams(searchParams);
      setCurrPage(1);
    } else {
      searchParams.set(name, value);
      setSearchParams(searchParams);
      setCurrPage(1);
    }
  }

  function handleChange(name, value) {
    searchParams.set(name, value);
    setCurrPage(1);
    if (!value) searchParams.delete(name);
    setSearchParams(searchParams);
  }

  function assignToStates(name) {
    if (isMounted.includes(name)) {
      const index = isMounted.indexOf(name);
      setIsMounted(isMounted.filter((el) => el !== isMounted[index]));
    } else if (!isMounted.includes(name)) {
      setIsMounted([...isMounted, name]);
    }
    if (!isOpen.includes(name)) {
      setIsOpen([...isOpen, name]);
    }
  }

  function animationEndFn(name) {
    if (!isMounted.includes(name)) {
      const index = isOpen.indexOf(name);
      setIsOpen(isOpen.filter((el) => el !== isOpen[index]));
    }
  }

  return (
    <>
      <HeaderWrapper onClick={() => assignToStates("subcategory")}>
        <StyledH1>categories</StyledH1>
        <IconWrapper>
          {isOpen.includes("subcategory") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("subcategory") && (
        <StyledUlCategories
          animation={isMounted.includes("subcategory")}
          onAnimationEnd={() => animationEndFn("subcategory")}
        >
          <StyledLi
            onClick={() => handleClick("subcategory", "electric guitar")}
          >
            <StyledButton
              style={{
                color:
                  searchParams.get("subcategory") === "electric guitar" &&
                  "#000",
              }}
            >
              electric guitars
            </StyledButton>
            <IconWrapper>
              {searchParams.get("subcategory") === "electric guitar" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("subcategory", "bass guitar")}>
            <StyledButton
              style={{
                color:
                  searchParams.get("subcategory") === "bass guitar" && "#000",
              }}
            >
              bass guitars
            </StyledButton>
            <IconWrapper>
              {searchParams.get("subcategory") === "bass guitar" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi
            onClick={() => handleClick("subcategory", "acoustic guitar")}
          >
            <StyledButton
              style={{
                color:
                  searchParams.get("subcategory") === "acoustic guitar" &&
                  "#000",
              }}
            >
              acoustic guitars
            </StyledButton>
            <IconWrapper>
              {searchParams.get("subcategory") === "acoustic guitar" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi
            onClick={() => handleClick("subcategory", "classical guitar")}
          >
            <StyledButton
              style={{
                color:
                  searchParams.get("subcategory") === "classical guitar" &&
                  "#000",
              }}
            >
              classical guitars
            </StyledButton>
            <IconWrapper>
              {searchParams.get("subcategory") === "classical guitar" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlCategories>
      )}

      <HeaderWrapper onClick={() => assignToStates("price")}>
        <StyledH1>price</StyledH1>
        <IconWrapper>
          {isOpen.includes("price") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("price") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("price")}
          onAnimationEnd={() => animationEndFn("price")}
        >
          <StyledLiInput>
            <StyledInput
              placeholder="min"
              type="number"
              onChange={(e) => handleChange("min-price", e.target.value)}
              value={searchParams.get("min-price") || ""}
            />
            <HiOutlineArrowNarrowRight style={{ fontSize: "30px" }} />
            <StyledInput
              placeholder="max"
              type="number"
              onChange={(e) => handleChange("max-price", e.target.value)}
              value={searchParams.get("max-price") || ""}
            />
          </StyledLiInput>
        </StyledUlScrollbarHidden>
      )}
      <HeaderWrapper onClick={() => assignToStates("body")}>
        <StyledH1>Body</StyledH1>
        <IconWrapper>
          {isOpen.includes("body") ? <FaRegMinusSquare /> : <FaRegSquarePlus />}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("body") && (
        <StyledUl
          animation={isMounted.includes("body")}
          onAnimationEnd={() => animationEndFn("body")}
        >
          {Array.isArray(productsBody) &&
            productsBody.map((body) => (
              <StyledLi
                onClick={() => handleClick("body", `${body[0]}`)}
                key={body[0]}
              >
                <StyledButton
                  style={{
                    color: searchParams.get("body") === `${body[0]}` && "#000",
                  }}
                >
                  {
                    <>
                      {body[0]} <StyledSpan>{`(${body[1]})`}</StyledSpan>
                    </>
                  }
                </StyledButton>
                <IconWrapper>
                  {searchParams.get("body") === `${body[0]}` ? (
                    <IoMdCheckbox />
                  ) : (
                    <MdCheckBoxOutlineBlank />
                  )}
                </IconWrapper>
              </StyledLi>
            ))}
        </StyledUl>
      )}

      <HeaderWrapper onClick={() => assignToStates("neck")}>
        <StyledH1>Neck</StyledH1>
        <IconWrapper>
          {isOpen.includes("neck") ? <FaRegMinusSquare /> : <FaRegSquarePlus />}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("neck") && (
        <StyledUl
          animation={isMounted.includes("neck")}
          onAnimationEnd={() => animationEndFn("neck")}
        >
          {Array.isArray(productsNeck) &&
            productsNeck.map((neck) => (
              <StyledLi
                onClick={() => handleClick("neck", `${neck[0]}`)}
                key={neck[0]}
              >
                <StyledButton
                  style={{
                    color: searchParams.get("neck") === `${neck[0]}` && "#000",
                  }}
                >
                  {
                    <>
                      {neck[0]} <StyledSpan>{`(${neck[1]})`}</StyledSpan>
                    </>
                  }
                </StyledButton>
                <IconWrapper>
                  {searchParams.get("neck") === `${neck[0]}` ? (
                    <IoMdCheckbox />
                  ) : (
                    <MdCheckBoxOutlineBlank />
                  )}
                </IconWrapper>
              </StyledLi>
            ))}
        </StyledUl>
      )}

      <HeaderWrapper onClick={() => assignToStates("fretsNumber")}>
        <StyledH1>Frets</StyledH1>
        <IconWrapper>
          {isOpen.includes("fretsNumber") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("fretsNumber") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("fretsNumber")}
          onAnimationEnd={() => animationEndFn("fretsNumber")}
        >
          <StyledLiInput>
            <StyledInput
              placeholder="min"
              type="number"
              onChange={(e) => handleChange("min-fretsNumber", e.target.value)}
              value={searchParams.get("min-fretsNumber") || ""}
            />
            <HiOutlineArrowNarrowRight style={{ fontSize: "30px" }} />
            <StyledInput
              placeholder="max"
              type="number"
              onChange={(e) => handleChange("max-fretsNumber", e.target.value)}
              value={searchParams.get("max-fretsNumber") || ""}
            />
          </StyledLiInput>
        </StyledUlScrollbarHidden>
      )}
      <HeaderWrapper onClick={() => assignToStates("stringsNumber")}>
        <StyledH1>Strings</StyledH1>
        <IconWrapper>
          {isOpen.includes("stringsNumber") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("stringsNumber") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("stringsNumber")}
          onAnimationEnd={() => animationEndFn("stringsNumber")}
        >
          <StyledLiInput>
            <StyledInput
              placeholder="min"
              type="number"
              onChange={(e) =>
                handleChange("min-stringsNumber", e.target.value)
              }
              value={searchParams.get("min-stringsNumber") || ""}
            />
            <HiOutlineArrowNarrowRight style={{ fontSize: "30px" }} />
            <StyledInput
              placeholder="max"
              type="number"
              onChange={(e) =>
                handleChange("max-stringsNumber", e.target.value)
              }
              value={searchParams.get("max-stringsNumber") || ""}
            />
          </StyledLiInput>
        </StyledUlScrollbarHidden>
      )}

      <HeaderWrapper onClick={() => assignToStates("pickupsActive")}>
        <StyledH1>Pickups active</StyledH1>
        <IconWrapper>
          {isOpen.includes("pickupsActive") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("pickupsActive") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("pickupsActive")}
          onAnimationEnd={() => animationEndFn("pickupsActive")}
        >
          <StyledLi onClick={() => handleClick("pickupsActive", "true")}>
            <StyledButton
              style={{
                color: searchParams.get("pickupsActive") === "true" && "#000",
              }}
            >
              yes
            </StyledButton>
            <IconWrapper>
              {searchParams.get("pickupsActive") === "true" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("pickupsActive", "false")}>
            <StyledButton
              style={{
                color: searchParams.get("pickupsActive") === "false" && "#000",
              }}
            >
              no
            </StyledButton>
            <IconWrapper>
              {searchParams.get("pickupsActive") === "false" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}

      <HeaderWrapper onClick={() => assignToStates("tremolo")}>
        <StyledH1>Tremolo</StyledH1>
        <IconWrapper>
          {isOpen.includes("tremolo") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("tremolo") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("tremolo")}
          onAnimationEnd={() => animationEndFn("tremolo")}
        >
          <StyledLi onClick={() => handleClick("tremolo", "true")}>
            <StyledButton
              style={{
                color: searchParams.get("tremolo") === "true" && "#000",
              }}
            >
              yes
            </StyledButton>
            <IconWrapper>
              {searchParams.get("tremolo") === "true" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("tremolo", "false")}>
            <StyledButton
              style={{
                color: searchParams.get("tremolo") === "false" && "#000",
              }}
            >
              no
            </StyledButton>
            <IconWrapper>
              {searchParams.get("tremolo") === "false" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}
      <HeaderWrapper onClick={() => assignToStates("lefthanded")}>
        <StyledH1>Lefthanded</StyledH1>
        <IconWrapper>
          {isOpen.includes("lefthanded") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("lefthanded") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("lefthanded")}
          onAnimationEnd={() => animationEndFn("lefthanded")}
        >
          <StyledLi onClick={() => handleClick("lefthanded", "true")}>
            <StyledButton
              style={{
                color: searchParams.get("lefthanded") === "true" && "#000",
              }}
            >
              yes
            </StyledButton>
            <IconWrapper>
              {searchParams.get("lefthanded") === "true" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("lefthanded", "false")}>
            <StyledButton
              style={{
                color: searchParams.get("lefthanded") === "false" && "#000",
              }}
            >
              no
            </StyledButton>
            <IconWrapper>
              {searchParams.get("lefthanded") === "false" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}
      <HeaderWrapper onClick={() => assignToStates("pickups")}>
        <StyledH1>pickups</StyledH1>
        <IconWrapper>
          {isOpen.includes("pickups") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("pickups") && (
        <StyledUl
          animation={isMounted.includes("pickups")}
          onAnimationEnd={() => animationEndFn("pickups")}
        >
          <StyledLi onClick={() => handleClick("pickups", "H")}>
            <StyledButton
              style={{
                color: searchParams.get("pickups") === "H" && "#000",
              }}
            >
              H
            </StyledButton>
            <IconWrapper>
              {searchParams.get("pickups") === "H" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("pickups", "HH")}>
            <StyledButton
              style={{
                color: searchParams.get("pickups") === "HH" && "#000",
              }}
            >
              HH
            </StyledButton>
            <IconWrapper>
              {searchParams.get("pickups") === "HH" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("pickups", "HHH")}>
            <StyledButton
              style={{
                color: searchParams.get("pickups") === "HHH" && "#000",
              }}
            >
              HHH
            </StyledButton>
            <IconWrapper>
              {searchParams.get("pickups") === "HHH" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("pickups", "S")}>
            <StyledButton
              style={{
                color: searchParams.get("pickups") === "S" && "#000",
              }}
            >
              S
            </StyledButton>
            <IconWrapper>
              {searchParams.get("pickups") === "S" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("pickups", "SS")}>
            <StyledButton
              style={{
                color: searchParams.get("pickups") === "SS" && "#000",
              }}
            >
              SS
            </StyledButton>
            <IconWrapper>
              {searchParams.get("pickups") === "SS" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("pickups", "SSS")}>
            <StyledButton
              style={{
                color: searchParams.get("pickups") === "SSS" && "#000",
              }}
            >
              SSS
            </StyledButton>
            <IconWrapper>
              {searchParams.get("pickups") === "SSS" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("pickups", "HS")}>
            <StyledButton
              style={{
                color: searchParams.get("pickups") === "HS" && "#000",
              }}
            >
              HS
            </StyledButton>
            <IconWrapper>
              {searchParams.get("pickups") === "HS" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("pickups", "HHS")}>
            <StyledButton
              style={{
                color: searchParams.get("pickups") === "HHS" && "#000",
              }}
            >
              HHS
            </StyledButton>
            <IconWrapper>
              {searchParams.get("pickups") === "HHS" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUl>
      )}
    </>
  );
}

export default GuitarFilters;
