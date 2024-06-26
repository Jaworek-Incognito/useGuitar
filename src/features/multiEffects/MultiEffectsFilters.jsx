import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegMinusSquare } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoMdCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  HeaderWrapper,
  IconWrapper,
  StyledButton,
  StyledH1,
  StyledInput,
  StyledLi,
  StyledLiInput,
  StyledUlCategories,
  StyledUlScrollbarHidden,
} from "../../ui/FiltersUI";

function MultiEffectsFilters() {
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
            onClick={() => handleClick("subcategory", "guitar multi effect")}
          >
            <StyledButton
              style={{
                color:
                  searchParams.get("subcategory") === "guitar multi effect" &&
                  "#000",
              }}
            >
              guitar multi effects
            </StyledButton>
            <IconWrapper>
              {searchParams.get("subcategory") === "guitar multi effect" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi
            onClick={() => handleClick("subcategory", "bass multi effect")}
          >
            <StyledButton
              style={{
                color:
                  searchParams.get("subcategory") === "bass multi effect" &&
                  "#000",
              }}
            >
              bass multi effects
            </StyledButton>
            <IconWrapper>
              {searchParams.get("subcategory") === "bass multi effect" ? (
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

      <HeaderWrapper onClick={() => assignToStates("effects")}>
        <StyledH1>effects</StyledH1>
        <IconWrapper>
          {isOpen.includes("effects") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("effects") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("effects")}
          onAnimationEnd={() => animationEndFn("effects")}
        >
          <StyledLi onClick={() => handleClick("effects", "true")}>
            <StyledButton
              style={{
                color: searchParams.get("effects") === "true" && "#000",
              }}
            >
              yes
            </StyledButton>
            <IconWrapper>
              {searchParams.get("effects") === "true" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("effects", "false")}>
            <StyledButton
              style={{
                color: searchParams.get("effects") === "false" && "#000",
              }}
            >
              no
            </StyledButton>
            <IconWrapper>
              {searchParams.get("effects") === "false" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}

      <HeaderWrapper onClick={() => assignToStates("ampModeling")}>
        <StyledH1>amp modeling</StyledH1>
        <IconWrapper>
          {isOpen.includes("ampModeling") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("ampModeling") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("ampModeling")}
          onAnimationEnd={() => animationEndFn("ampModeling")}
        >
          <StyledLi onClick={() => handleClick("ampModeling", "true")}>
            <StyledButton
              style={{
                color: searchParams.get("ampModeling") === "true" && "#000",
              }}
            >
              yes
            </StyledButton>
            <IconWrapper>
              {searchParams.get("ampModeling") === "true" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("ampModeling", "false")}>
            <StyledButton
              style={{
                color: searchParams.get("ampModeling") === "false" && "#000",
              }}
            >
              no
            </StyledButton>
            <IconWrapper>
              {searchParams.get("ampModeling") === "false" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}

      <HeaderWrapper onClick={() => assignToStates("drumComputer")}>
        <StyledH1>drum computer</StyledH1>
        <IconWrapper>
          {isOpen.includes("drumComputer") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("drumComputer") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("drumComputer")}
          onAnimationEnd={() => animationEndFn("drumComputer")}
        >
          <StyledLi onClick={() => handleClick("drumComputer", "true")}>
            <StyledButton
              style={{
                color: searchParams.get("drumComputer") === "true" && "#000",
              }}
            >
              yes
            </StyledButton>
            <IconWrapper>
              {searchParams.get("drumComputer") === "true" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("drumComputer", "false")}>
            <StyledButton
              style={{
                color: searchParams.get("drumComputer") === "false" && "#000",
              }}
            >
              no
            </StyledButton>
            <IconWrapper>
              {searchParams.get("drumComputer") === "false" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}

      <HeaderWrapper onClick={() => assignToStates("usbPort")}>
        <StyledH1>usb port</StyledH1>
        <IconWrapper>
          {isOpen.includes("usbPort") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("usbPort") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("usbPort")}
          onAnimationEnd={() => animationEndFn("usbPort")}
        >
          <StyledLi onClick={() => handleClick("usbPort", "true")}>
            <StyledButton
              style={{
                color: searchParams.get("usbPort") === "true" && "#000",
              }}
            >
              yes
            </StyledButton>
            <IconWrapper>
              {searchParams.get("usbPort") === "true" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("usbPort", "false")}>
            <StyledButton
              style={{
                color: searchParams.get("usbPort") === "false" && "#000",
              }}
            >
              no
            </StyledButton>
            <IconWrapper>
              {searchParams.get("usbPort") === "false" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}

      <HeaderWrapper onClick={() => assignToStates("auxPort")}>
        <StyledH1>aux port</StyledH1>
        <IconWrapper>
          {isOpen.includes("auxPort") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("auxPort") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("auxPort")}
          onAnimationEnd={() => animationEndFn("auxPort")}
        >
          <StyledLi onClick={() => handleClick("auxPort", "true")}>
            <StyledButton
              style={{
                color: searchParams.get("auxPort") === "true" && "#000",
              }}
            >
              yes
            </StyledButton>
            <IconWrapper>
              {searchParams.get("auxPort") === "true" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("auxPort", "false")}>
            <StyledButton
              style={{
                color: searchParams.get("auxPort") === "false" && "#000",
              }}
            >
              no
            </StyledButton>
            <IconWrapper>
              {searchParams.get("auxPort") === "false" ? (
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

export default MultiEffectsFilters;
