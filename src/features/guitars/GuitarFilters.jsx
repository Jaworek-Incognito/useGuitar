import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegMinusSquare } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoMdCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  StyledUl,
  StyledUlCategories,
  StyledUlScrollbarHidden,
  HeaderWrapper,
  IconWrapper,
  StyledH1,
  StyledLi,
  StyledButton,
  StyledLiInput,
  StyledInput,
  StyledSpan,
} from "../../ui/FiltersUI";

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
                  "var(--secondary-font-color)",
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
                  searchParams.get("subcategory") === "bass guitar" &&
                  "var(--secondary-font-color)",
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
                  "var(--secondary-font-color)",
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
                  "var(--secondary-font-color)",
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
                    color:
                      searchParams.get("body") === `${body[0]}` &&
                      "var(--secondary-font-color)",
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
                    color:
                      searchParams.get("neck") === `${neck[0]}` &&
                      "var(--secondary-font-color)",
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
                color:
                  searchParams.get("pickupsActive") === "true" &&
                  "var(--secondary-font-color)",
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
                color:
                  searchParams.get("pickupsActive") === "false" &&
                  "var(--secondary-font-color)",
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
                color:
                  searchParams.get("tremolo") === "true" &&
                  "var(--secondary-font-color)",
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
                color:
                  searchParams.get("tremolo") === "false" &&
                  "var(--secondary-font-color)",
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
                color:
                  searchParams.get("lefthanded") === "true" &&
                  "var(--secondary-font-color)",
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
                color:
                  searchParams.get("lefthanded") === "false" &&
                  "var(--secondary-font-color)",
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
                color:
                  searchParams.get("pickups") === "H" &&
                  "var(--secondary-font-color)",
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
                color:
                  searchParams.get("pickups") === "HH" &&
                  "var(--secondary-font-color)",
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
                color:
                  searchParams.get("pickups") === "HHH" &&
                  "var(--secondary-font-color)",
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
                color:
                  searchParams.get("pickups") === "S" &&
                  "var(--secondary-font-color)",
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
                color:
                  searchParams.get("pickups") === "SS" &&
                  "var(--secondary-font-color)",
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
                color:
                  searchParams.get("pickups") === "SSS" &&
                  "var(--secondary-font-color)",
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
                color:
                  searchParams.get("pickups") === "HS" &&
                  "var(--secondary-font-color)",
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
                color:
                  searchParams.get("pickups") === "HHS" &&
                  "var(--secondary-font-color)",
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
