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

function AmplifiersFilters() {
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
            onClick={() => handleClick("subcategory", "electric guitar amp")}
          >
            <StyledButton
              style={{
                color:
                  searchParams.get("subcategory") === "electric guitar amp" &&
                  "#000",
              }}
            >
              electric guitar amps
            </StyledButton>
            <IconWrapper>
              {searchParams.get("subcategory") === "electric guitar amp" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi
            onClick={() => handleClick("subcategory", "bass guitar amp")}
          >
            <StyledButton
              style={{
                color:
                  searchParams.get("subcategory") === "bass guitar amp" &&
                  "#000",
              }}
            >
              bass guitar amps
            </StyledButton>
            <IconWrapper>
              {searchParams.get("subcategory") === "bass guitar amp" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi
            onClick={() => handleClick("subcategory", "acoustic guitar amp")}
          >
            <StyledButton
              style={{
                color:
                  searchParams.get("subcategory") === "acoustic guitar amp" &&
                  "#000",
              }}
            >
              acoustic guitar amps
            </StyledButton>
            <IconWrapper>
              {searchParams.get("subcategory") === "acoustic guitar amp" ? (
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
      <HeaderWrapper onClick={() => assignToStates("power")}>
        <StyledH1>power</StyledH1>
        <IconWrapper>
          {isOpen.includes("power") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("power") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("power")}
          onAnimationEnd={() => animationEndFn("power")}
        >
          <StyledLiInput>
            <StyledInput
              placeholder="min"
              type="number"
              onChange={(e) => handleChange("min-power", e.target.value)}
              value={searchParams.get("min-power") || ""}
            />
            <HiOutlineArrowNarrowRight style={{ fontSize: "30px" }} />
            <StyledInput
              placeholder="max"
              type="number"
              onChange={(e) => handleChange("max-power", e.target.value)}
              value={searchParams.get("max-power") || ""}
            />
          </StyledLiInput>
        </StyledUlScrollbarHidden>
      )}

      <HeaderWrapper onClick={() => assignToStates("channels")}>
        <StyledH1>channels</StyledH1>
        <IconWrapper>
          {isOpen.includes("channels") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("channels") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("channels")}
          onAnimationEnd={() => animationEndFn("channels")}
        >
          <StyledLiInput>
            <StyledInput
              placeholder="min"
              type="number"
              onChange={(e) => handleChange("min-channels", e.target.value)}
              value={searchParams.get("min-channels") || ""}
            />
            <HiOutlineArrowNarrowRight style={{ fontSize: "30px" }} />
            <StyledInput
              placeholder="max"
              type="number"
              onChange={(e) => handleChange("max-channels", e.target.value)}
              value={searchParams.get("max-channels") || ""}
            />
          </StyledLiInput>
        </StyledUlScrollbarHidden>
      )}

      <HeaderWrapper onClick={() => assignToStates("memorySlots")}>
        <StyledH1>memory slots</StyledH1>
        <IconWrapper>
          {isOpen.includes("memorySlots") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("memorySlots") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("memorySlots")}
          onAnimationEnd={() => animationEndFn("memorySlots")}
        >
          <StyledLiInput>
            <StyledInput
              placeholder="min"
              type="number"
              onChange={(e) => handleChange("min-memorySlots", e.target.value)}
              value={searchParams.get("min-memorySlots") || ""}
            />
            <HiOutlineArrowNarrowRight style={{ fontSize: "30px" }} />
            <StyledInput
              placeholder="max"
              type="number"
              onChange={(e) => handleChange("max-memorySlots", e.target.value)}
              value={searchParams.get("max-memorySlots") || ""}
            />
          </StyledLiInput>
        </StyledUlScrollbarHidden>
      )}

      <HeaderWrapper onClick={() => assignToStates("footSwitchConnection")}>
        <StyledH1>Foot switch connection</StyledH1>
        <IconWrapper>
          {isOpen.includes("footSwitchConnection") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("footSwitchConnection") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("footSwitchConnection")}
          onAnimationEnd={() => animationEndFn("footSwitchConnection")}
        >
          <StyledLi onClick={() => handleClick("footSwitchConnection", "true")}>
            <StyledButton
              style={{
                color:
                  searchParams.get("footSwitchConnection") === "true" && "#000",
              }}
            >
              yes
            </StyledButton>
            <IconWrapper>
              {searchParams.get("footSwitchConnection") === "true" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi
            onClick={() => handleClick("footSwitchConnection", "false")}
          >
            <StyledButton
              style={{
                color:
                  searchParams.get("footSwitchConnection") === "false" &&
                  "#000",
              }}
            >
              no
            </StyledButton>
            <IconWrapper>
              {searchParams.get("footSwitchConnection") === "false" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}
      <HeaderWrapper onClick={() => assignToStates("headphoneOutput")}>
        <StyledH1>Headphone output</StyledH1>
        <IconWrapper>
          {isOpen.includes("headphoneOutput") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("headphoneOutput") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("headphoneOutput")}
          onAnimationEnd={() => animationEndFn("headphoneOutput")}
        >
          <StyledLi onClick={() => handleClick("headphoneOutput", "true")}>
            <StyledButton
              style={{
                color: searchParams.get("headphoneOutput") === "true" && "#000",
              }}
            >
              yes
            </StyledButton>
            <IconWrapper>
              {searchParams.get("headphoneOutput") === "true" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("headphoneOutput", "false")}>
            <StyledButton
              style={{
                color:
                  searchParams.get("headphoneOutput") === "false" && "#000",
              }}
            >
              no
            </StyledButton>
            <IconWrapper>
              {searchParams.get("headphoneOutput") === "false" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}
      <HeaderWrapper onClick={() => assignToStates("effectsProcessor")}>
        <StyledH1>effect's processor</StyledH1>
        <IconWrapper>
          {isOpen.includes("effectsProcessor") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("effectsProcessor") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("effectsProcessor")}
          onAnimationEnd={() => animationEndFn("effectsProcessor")}
        >
          <StyledLi onClick={() => handleClick("effectsProcessor", "true")}>
            <StyledButton
              style={{
                color:
                  searchParams.get("effectsProcessor") === "true" && "#000",
              }}
            >
              yes
            </StyledButton>
            <IconWrapper>
              {searchParams.get("effectsProcessor") === "true" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("effectsProcessor", "false")}>
            <StyledButton
              style={{
                color:
                  searchParams.get("effectsProcessor") === "false" && "#000",
              }}
            >
              no
            </StyledButton>
            <IconWrapper>
              {searchParams.get("effectsProcessor") === "false" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}
      <HeaderWrapper onClick={() => assignToStates("recordingOutput")}>
        <StyledH1>recording output</StyledH1>
        <IconWrapper>
          {isOpen.includes("recordingOutput") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("recordingOutput") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("recordingOutput")}
          onAnimationEnd={() => animationEndFn("recordingOutput")}
        >
          <StyledLi onClick={() => handleClick("recordingOutput", "true")}>
            <StyledButton
              style={{
                color: searchParams.get("recordingOutput") === "true" && "#000",
              }}
            >
              yes
            </StyledButton>
            <IconWrapper>
              {searchParams.get("recordingOutput") === "true" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("recordingOutput", "false")}>
            <StyledButton
              style={{
                color:
                  searchParams.get("recordingOutput") === "false" && "#000",
              }}
            >
              no
            </StyledButton>
            <IconWrapper>
              {searchParams.get("recordingOutput") === "false" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}
      <HeaderWrapper onClick={() => assignToStates("reverb")}>
        <StyledH1>reverb</StyledH1>
        <IconWrapper>
          {isOpen.includes("reverb") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("reverb") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("reverb")}
          onAnimationEnd={() => animationEndFn("reverb")}
        >
          <StyledLi onClick={() => handleClick("reverb", "true")}>
            <StyledButton
              style={{
                color: searchParams.get("reverb") === "true" && "#000",
              }}
            >
              yes
            </StyledButton>
            <IconWrapper>
              {searchParams.get("reverb") === "true" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
          <StyledLi onClick={() => handleClick("reverb", "false")}>
            <StyledButton
              style={{
                color: searchParams.get("reverb") === "false" && "#000",
              }}
            >
              no
            </StyledButton>
            <IconWrapper>
              {searchParams.get("reverb") === "false" ? (
                <IoMdCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </IconWrapper>
          </StyledLi>
        </StyledUlScrollbarHidden>
      )}

      <HeaderWrapper onClick={() => assignToStates("lineInput")}>
        <StyledH1>line input</StyledH1>
        <IconWrapper>
          {isOpen.includes("lineInput") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("lineInput") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("lineInput")}
          onAnimationEnd={() => animationEndFn("lineInput")}
        >
          <StyledLiInput>
            <StyledInput
              placeholder="min"
              type="number"
              onChange={(e) => handleChange("min-lineInput", e.target.value)}
              value={searchParams.get("min-lineInput") || ""}
            />
            <HiOutlineArrowNarrowRight style={{ fontSize: "30px" }} />
            <StyledInput
              placeholder="max"
              type="number"
              onChange={(e) => handleChange("max-lineInput", e.target.value)}
              value={searchParams.get("max-lineInput") || ""}
            />
          </StyledLiInput>
        </StyledUlScrollbarHidden>
      )}

      <HeaderWrapper onClick={() => assignToStates("weight")}>
        <StyledH1>weight</StyledH1>
        <IconWrapper>
          {isOpen.includes("weight") ? (
            <FaRegMinusSquare />
          ) : (
            <FaRegSquarePlus />
          )}
        </IconWrapper>
      </HeaderWrapper>
      {isOpen.includes("weight") && (
        <StyledUlScrollbarHidden
          animation={isMounted.includes("weight")}
          onAnimationEnd={() => animationEndFn("weight")}
        >
          <StyledLiInput>
            <StyledInput
              placeholder="min"
              type="number"
              onChange={(e) => handleChange("min-weight", e.target.value)}
              value={searchParams.get("min-weight") || ""}
            />
            <HiOutlineArrowNarrowRight style={{ fontSize: "30px" }} />
            <StyledInput
              placeholder="max"
              type="number"
              onChange={(e) => handleChange("max-weight", e.target.value)}
              value={searchParams.get("max-weight") || ""}
            />
          </StyledLiInput>
        </StyledUlScrollbarHidden>
      )}
    </>
  );
}

export default AmplifiersFilters;
