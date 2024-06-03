import styled from "styled-components";

const StyledButton = styled.button`
  outline: none;
  cursor: pointer;
  transition: all 0.2s;

  border: ${(props) => (props.border ? props.border : "none")};

  background-color: #065ec0;
  color: ${(props) => (props.color ? props.color : "#fff")};
  padding: ${(props) => (props.padding ? props.padding : "0 0 0 0")};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "0")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "inherit")};
  &:hover {
    background-color: #0654ab;
  }
`;

function Button({
  children,
  onClick,
  padding,
  color,
  fontSize,
  borderRadius,
  border,
}) {
  return (
    <StyledButton
      onClick={onClick}
      padding={padding}
      fontSize={fontSize}
      color={color}
      borderRadius={borderRadius}
      border={border}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
