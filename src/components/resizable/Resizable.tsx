import { MouseEvent, ReactNode, RefObject, useRef } from "react";
import styled from "styled-components";

export type Size = { width: number; height: number };
export type Position = { x: number; y: number };

interface ResizableProps {
  readonly resizable?: boolean;
  readonly size?: Size;
  readonly position?: Position;
  readonly minWidth?: number;
  readonly minHeight?: number;
  readonly onResize?: (newSize: Size, newPosition: Position) => void;
  readonly children?: ReactNode;
  readonly ref?: RefObject<HTMLDivElement | null> | null;
  readonly isMaximized?: boolean;
}

//#region Styled components
const ResizableDiv = styled.div.attrs<{
  $width: number | string;
  $height: number | string;
  $left: number;
  $top: number;
  $minWidth: number;
  $minHeight: number;
}>((props) => ({
  style: {
    width:
      typeof props.$width === "number" ? `${props.$width}px` : props.$width,
    height:
      typeof props.$height === "number" ? `${props.$height}px` : props.$height,
    top: `${props.$top}px`,
    left: `${props.$left}px`,
    minHeight: `${props.$minWidth}px`,
    minWidth: `${props.$minHeight}px`,
  },
}))`
  position: absolute;
  background-color: var(--base-color);
`;

const ResizeHandle = styled.div`
  position: absolute;
  background-color: transparent;
  z-index: 1;
`;

const ResizeHandleTopLeft = styled(ResizeHandle).attrs<{ $resizable: boolean }>(
  (props) => ({
    style: {
      cursor: props.$resizable ? "nw-resize" : "default",
    },
  })
)`
  top: 0;
  left: 0;
  width: 5px;
  height: 5px;
  z-index: 2;
  cursor: nw-resize;
`;

const ResizeHandleTopRight = styled(ResizeHandle).attrs<{
  $resizable: boolean;
}>((props) => ({
  style: {
    cursor: props.$resizable ? "ne-resize" : "default",
  },
}))`
  top: 0;
  right: 0;
  width: 5px;
  height: 5px;
  z-index: 2;
`;

const ResizeHandleBottomLeft = styled(ResizeHandle).attrs<{
  $resizable: boolean;
}>((props) => ({
  style: {
    cursor: props.$resizable ? "sw-resize" : "default",
  },
}))`
  bottom: 0;
  left: 0;
  width: 5px;
  height: 5px;
  z-index: 2;
`;

const ResizeHandleBottomRight = styled(ResizeHandle).attrs<{
  $resizable: boolean;
}>((props) => ({
  style: {
    cursor: props.$resizable ? "se-resize" : "default",
  },
}))`
  bottom: 0;
  right: 0;
  width: 5px;
  height: 5px;
  z-index: 2;
`;

const ResizeHandleTop = styled(ResizeHandle).attrs<{ $resizable: boolean }>(
  (props) => ({
    style: {
      cursor: props.$resizable ? "n-resize" : "default",
    },
  })
)`
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  cursor: n-resize;
`;

const ResizeHandleBottom = styled(ResizeHandle).attrs<{ $resizable: boolean }>(
  (props) => ({
    style: {
      cursor: props.$resizable ? "s-resize" : "default",
    },
  })
)`
  bottom: 0;
  right: 0;
  left: 0;
  height: 5px;
  cursor: s-resize;
`;

const ResizeHandleLeft = styled(ResizeHandle).attrs<{ $resizable: boolean }>(
  (props) => ({
    style: {
      cursor: props.$resizable ? "w-resize" : "default",
    },
  })
)`
  top: 0;
  bottom: 0;
  left: 0;
  width: 5px;
  cursor: w-resize;
`;

const ResizeHandleRight = styled(ResizeHandle).attrs<{ $resizable: boolean }>(
  (props) => ({
    style: {
      cursor: props.$resizable ? "e-resize" : "default",
    },
  })
)`
  top: 0;
  bottom: 0;
  right: 0;
  width: 5px;
  cursor: e-resize;
`;
//#endregion

function Resizable({
  resizable = false,
  onResize = () => {},
  minWidth = 200,
  minHeight = 200,
  position = { x: 0, y: 0 },
  size = { width: 100, height: 100 },
  children = null,
  ref = null,
  isMaximized = false,
}: ResizableProps) {
  //#region Properties
  const resizeDirection = useRef<string | null>(null);
  const startWidth = useRef<number>(0);
  const startHeight = useRef<number>(0);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const newWidth = useRef<number>(size.width);
  const newHeight = useRef<number>(size.height);
  //#endregion
  //#region Methods
  const startResize = (
    event: MouseEvent<HTMLDivElement>,
    direction: string
  ): void => {
    if (!resizable || isMaximized) return;
    event.preventDefault();
    resizeDirection.current = direction;
    startX.current = event.clientX;
    startY.current = event.clientY;
    startWidth.current = size.width;
    startHeight.current = size.height;
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResize);
  };

  const handleResize = (event: globalThis.MouseEvent): void => {
    if (!resizeDirection.current) return;
    const dx = event.clientX - startX.current;
    const dy = event.clientY - startY.current;
    let updatedWidth = startWidth.current;
    let updatedHeight = startHeight.current;
    let updatedX = position.x;
    let updatedY = position.y;

    switch (resizeDirection.current) {
      case "right":
        updatedWidth = Math.max(minWidth, startWidth.current + dx);
        break;
      case "left":
        updatedWidth = Math.max(minWidth, startWidth.current - dx);
        updatedX = position.x + size.width - updatedWidth;
        break;
      case "bottom":
        updatedHeight = Math.max(minHeight, startHeight.current + dy);
        break;
      case "top":
        updatedHeight = Math.max(minHeight, startHeight.current - dy);
        updatedY = position.y + size.height - updatedHeight;
        break;
      case "bottom-right":
        updatedWidth = Math.max(minWidth, startWidth.current + dx);
        updatedHeight = Math.max(minHeight, startHeight.current + dy);
        break;
      case "bottom-left":
        updatedWidth = Math.max(minWidth, startWidth.current - dx);
        updatedX = position.x + size.width - updatedWidth;
        updatedHeight = Math.max(minHeight, startHeight.current + dy);
        break;
      case "top-right":
        updatedWidth = Math.max(minWidth, startWidth.current + dx);
        updatedHeight = Math.max(minHeight, startHeight.current - dy);
        updatedY = position.y + size.height - updatedHeight;
        break;
      case "top-left":
        updatedWidth = Math.max(minWidth, startWidth.current - dy);
        updatedX = position.x + size.width - updatedWidth;
        updatedHeight = Math.max(minHeight, startHeight.current - dy);
        updatedY = position.y + size.height - updatedHeight;
        break;
    }

    newWidth.current = updatedWidth;
    newHeight.current = updatedHeight;

    onResize(
      { width: updatedWidth, height: updatedHeight },
      { x: updatedX, y: updatedY }
    );
  };

  const stopResize = (): void => {
    resizeDirection.current = null;
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", stopResize);
  };
  //#endregion
  //#region Render
  return (
    <ResizableDiv
      ref={ref}
      $left={isMaximized ? 0 : position.x}
      $top={isMaximized ? 0 : position.y}
      $width={isMaximized ? "100%" : newWidth.current}
      $height={isMaximized ? "calc(100% - 32px)" : newHeight.current}
      $minWidth={minWidth}
      $minHeight={minHeight}
    >
      <ResizeHandleTopLeft
        $resizable={resizable || !isMaximized}
        onMouseDown={(e) => startResize(e, "top-left")}
      />
      <ResizeHandleTopRight
        $resizable={resizable || !isMaximized}
        onMouseDown={(e) => startResize(e, "top-right")}
      />
      <ResizeHandleBottomLeft
        $resizable={resizable || !isMaximized}
        onMouseDown={(e) => startResize(e, "bottom-left")}
      />
      <ResizeHandleBottomRight
        $resizable={resizable || !isMaximized}
        onMouseDown={(e) => startResize(e, "bottom-right")}
      />
      <ResizeHandleTop
        $resizable={resizable || !isMaximized}
        onMouseDown={(e) => startResize(e, "top")}
      />
      <ResizeHandleBottom
        $resizable={resizable || !isMaximized}
        onMouseDown={(e) => startResize(e, "bottom")}
      />
      <ResizeHandleLeft
        $resizable={resizable || !isMaximized}
        onMouseDown={(e) => startResize(e, "left")}
      />
      <ResizeHandleRight
        $resizable={resizable || !isMaximized}
        onMouseDown={(e) => startResize(e, "right")}
      />
      {children}
    </ResizableDiv>
  );
  //#endregion
}

export default Resizable;
