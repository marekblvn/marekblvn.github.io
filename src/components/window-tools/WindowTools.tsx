import { Children, ReactNode } from "react";
import styled from "styled-components";
import Toolbar from "../toolbar/Toolbar";

const WindowToolGrid = styled.div<{ $multiple: boolean }>`
  display: grid;
  margin: 1px;
  padding-top: 1px;
  border: ${({ $multiple }) => ($multiple ? "solid 1px #808080" : "none")};
  box-shadow: ${({ $multiple }) =>
    $multiple ? "0 1px 0 #fff, 0 1px 0 #fff inset" : "none"};
`;

const ToolbarDivider = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: #808080 transparent #fff transparent;
  margin: 0 1px;
`;

interface WindowToolsProps {
  readonly children?: ReactNode;
}

function WindowTools({ children = null }: WindowToolsProps) {
  const childrenCount = Children.count(children);

  return (
    <WindowToolGrid $multiple={childrenCount > 1}>
      {Children.map(children, (child, index) => {
        const isLast = index === childrenCount - 1;
        return (
          <>
            <Toolbar withHandle={childrenCount > 1}>{child}</Toolbar>
            {!isLast && <ToolbarDivider />}
          </>
        );
      })}
    </WindowToolGrid>
  );
}

export default WindowTools;
