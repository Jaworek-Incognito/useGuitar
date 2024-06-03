import styled from "styled-components";

const StyledSpan = styled.span`
  color: ${(props) => (props.color ? props.color : "#000")};
  padding: ${(props) => (props.padding ? props.padding : "0 0 0 0")};

  font-size: ${(props) => (props.fontSize ? props.fontSize : "inherit")};
`;

function Span({
  children,
  color,
  padding,

  fontSize,
}) {
  return (
    <StyledSpan color={color} padding={padding} fontSize={fontSize}>
      {children}
    </StyledSpan>
  );
}

export default Span;
