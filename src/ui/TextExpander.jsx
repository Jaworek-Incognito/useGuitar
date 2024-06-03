import { useState } from "react";
import styled from "styled-components";

const P = styled.p`
  border-top: 1px solid #ddd;
  width: fit-content;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
  color: #065ec0;
  transition: 0.2s all;
  margin: 14px 0;
  padding: 4px 0;
`;

function TextExpander({
  children,
  collapsedNumWords = 100,
  collapseButtonText = "Show More",
  expandedButtonText = "Show Less",
  expanded = false,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const childrenArr = children.split(" ");

  if (childrenArr.length <= collapsedNumWords) return <>{children}</>;

  function childrenCollapse() {
    let wordsArr = [];
    for (let i = 0; i < collapsedNumWords; i++) {
      wordsArr.push(` ${childrenArr[i]}`);
    }
    wordsArr[wordsArr.length - 1] += "...";

    return wordsArr;
  }

  return (
    <>
      {isExpanded ? children : childrenCollapse()}
      <P onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? expandedButtonText : collapseButtonText}
      </P>
    </>
  );
}

export default TextExpander;
