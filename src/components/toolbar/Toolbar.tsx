import { ReactNode } from "react";
import styled from "styled-components";

const ToolbarDiv = styled.div`
  height: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--base-color);
  image-rendering: pixelated;
  padding: 1px;
  margin-bottom: 1px;
  overflow: hidden;
`;

const DragHandleDiv = styled.div`
  width: 8px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
`;

const DragHandleInnerDiv = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: var(--inner-border-colors);
  height: 15px;
  width: 2px;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

interface ToolbarProps {
  readonly children?: ReactNode;
  readonly withHandle?: boolean;
}

function Toolbar({ children = null, withHandle = false }: ToolbarProps) {
  return (
    <ToolbarDiv>
      {withHandle && (
        <DragHandleDiv>
          <DragHandleInnerDiv />
        </DragHandleDiv>
      )}
      {children}
    </ToolbarDiv>
  );
}

export default Toolbar;
