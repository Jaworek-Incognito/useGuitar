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

function PickupsFilters() {
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
    } else {
      searchParams.set(name, value);
      setSearchParams(searchParams);
    }
  }

  function handleChange(name, value) {
    searchParams.set(name, value);
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
            onClick={() => handleClick("subcategory", "electric guitar pickup")}
          >
            <StyledButton
              style={{
                color:
                  searchParams.get("subcategory") ===
                    "electric guitar pickup" && "#000",
              }}
            >
              electric guitar pickups
            </StyledButton>
            <IconWrapper>
              {searchParams.get("subcategory") === "electric guitar pickup" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi
            onClick={() => handleClick("subcategory", "bass guitar pickup")}
          >
            <StyledButton
              style={{
                color:
                  searchParams.get("subcategory") === "bass guitar pickup" &&
                  "#000",
              }}
            >
              bass guitar pickups
            </StyledButton>
            <IconWrapper>
              {searchParams.get("subcategory") === "bass guitar pickup" ? (
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

      <HeaderWrapper onClick={() => assignToStates("pickup")}>
        <StyledH1>pickup type</StyledH1>
        <IconWrapper>
          {isOpen.includes("pickup") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("pickup") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("pickup")}
          onAnimationEnd={() => animationEndFn("pickup")}
        >
          <StyledLi onClick={() => handleClick("pickup", "humbucker")}>
            <StyledButton
              style={{
                color: searchParams.get("pickup") === "humbucker" && "#000",
              }}
            >
              humbucker
            </StyledButton>
            <IconWrapper>
              {searchParams.get("pickup") === "humbucker" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("pickup", "single coil")}>
            <StyledButton
              style={{
                color: searchParams.get("pickup") === "single coil" && "#000",
              }}
            >
              single coil
            </StyledButton>
            <IconWrapper>
              {searchParams.get("pickup") === "single coil" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}

      <HeaderWrapper onClick={() => assignToStates("output")}>
        <StyledH1>output</StyledH1>
        <IconWrapper>
          {isOpen.includes("output") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("output") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("output")}
          onAnimationEnd={() => animationEndFn("output")}
        >
          <StyledLi onClick={() => handleClick("output", "high")}>
            <StyledButton
              style={{
                color: searchParams.get("output") === "high" && "#000",
              }}
            >
              high
            </StyledButton>
            <IconWrapper>
              {searchParams.get("output") === "high" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("output", "medium")}>
            <StyledButton
              style={{
                color: searchParams.get("output") === "medium" && "#000",
              }}
            >
              medium
            </StyledButton>
            <IconWrapper>
              {searchParams.get("output") === "medium" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("output", "low")}>
            <StyledButton
              style={{
                color: searchParams.get("output") === "low" && "#000",
              }}
            >
              low
            </StyledButton>
            <IconWrapper>
              {searchParams.get("output") === "low" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}

      <HeaderWrapper onClick={() => assignToStates("pickupStringsNumber")}>
        <StyledH1>Pickup strings number</StyledH1>
        <IconWrapper>
          {isOpen.includes("pickupStringsNumber") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("pickupStringsNumber") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("pickupStringsNumber")}
          onAnimationEnd={() => animationEndFn("pickupStringsNumber")}
        >
          <StyledLiInput>
            <StyledInput
              placeholder="min"
              type="number"
              onChange={(e) =>
                handleChange("min-pickupStringsNumber", e.target.value)
              }
              value={searchParams.get("min-pickupStringsNumber") || ""}
            />
            <HiOutlineArrowNarrowRight style={{ fontSize: "30px" }} />
            <StyledInput
              placeholder="max"
              type="number"
              onChange={(e) =>
                handleChange("max-pickupStringsNumber", e.target.value)
              }
              value={searchParams.get("max-pickupStringsNumber") || ""}
            />
          </StyledLiInput>
        </StyledUlScrollbarHidden>
      )}

      <HeaderWrapper onClick={() => assignToStates("active")}>
        <StyledH1>active</StyledH1>
        <IconWrapper>
          {isOpen.includes("active") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("active") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("active")}
          onAnimationEnd={() => animationEndFn("active")}
        >
          <StyledLi onClick={() => handleClick("active", "true")}>
            <StyledButton
              style={{
                color: searchParams.get("active") === "true" && "#000",
              }}
            >
              yes
            </StyledButton>
            <IconWrapper>
              {searchParams.get("active") === "true" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("active", "false")}>
            <StyledButton
              style={{
                color: searchParams.get("active") === "false" && "#000",
              }}
            >
              no
            </StyledButton>
            <IconWrapper>
              {searchParams.get("active") === "false" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}

      <HeaderWrapper onClick={() => assignToStates("kappe")}>
        <StyledH1>kappe</StyledH1>
        <IconWrapper>
          {isOpen.includes("kappe") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("kappe") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("kappe")}
          onAnimationEnd={() => animationEndFn("kappe")}
        >
          <StyledLi onClick={() => handleClick("kappe", "true")}>
            <StyledButton
              style={{
                color: searchParams.get("kappe") === "true" && "#000",
              }}
            >
              yes
            </StyledButton>
            <IconWrapper>
              {searchParams.get("kappe") === "true" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("kappe", "false")}>
            <StyledButton
              style={{
                color: searchParams.get("kappe") === "false" && "#000",
              }}
            >
              no
            </StyledButton>
            <IconWrapper>
              {searchParams.get("kappe") === "false" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}
    </>
  );
}

export default PickupsFilters;
