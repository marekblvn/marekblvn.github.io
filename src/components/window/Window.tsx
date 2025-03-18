import React, {
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import styled, { css } from "styled-components";
import WindowTitleBar from "../window-title-bar/WindowTitleBar";
import WindowControlButton, {
  IconCode,
} from "../window-control-button/WindowControlButton";
import WindowTools from "../window-tools/WindowTools";

const INITIAL_DIMENSIONS = { width: 400, height: 300 };
const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;

const Resizable = styled.div<{
  $width: string;
  $height: string;
  $left: number;
  $top: number;
  $isAnimating: boolean;
}>`
  position: relative;
  min-height: 300px;
  min-width: 400px;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  top: ${({ $top }) => `${$top}px`};
  left: ${({ $left }) => `${$left}px`};
  ${({ $isAnimating }) =>
    $isAnimating &&
    css`
      transition: all 150ms ease-in-out;
    `}
`;

const ResizeHandle = styled.div`
  position: absolute;
  background-color: transparent;
  z-index: 1;
`;

const ResizeHandleTopLeft = styled(ResizeHandle)`
  top: 0;
  left: 0;
  width: 5px;
  height: 5px;
  z-index: 2;
  cursor: nw-resize;
`;

const ResizeHandleTopRight = styled(ResizeHandle)`
  top: 0;
  right: 0;
  width: 5px;
  height: 5px;
  z-index: 2;
  cursor: ne-resize;
`;

const ResizeHandleBottomLeft = styled(ResizeHandle)`
  bottom: 0;
  left: 0;
  width: 5px;
  height: 5px;
  z-index: 2;
  cursor: sw-resize;
`;

const ResizeHandleBottomRight = styled(ResizeHandle)`
  bottom: 0;
  right: 0;
  width: 5px;
  height: 5px;
  z-index: 2;
  cursor: se-resize;
`;

const ResizeHandleTop = styled(ResizeHandle)`
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  cursor: n-resize;
`;

const ResizeHandleBottom = styled(ResizeHandle)`
  bottom: 0;
  right: 0;
  left: 0;
  height: 5px;
  cursor: s-resize;
`;

const ResizeHandleLeft = styled(ResizeHandle)`
  top: 0;
  bottom: 0;
  left: 0;
  width: 5px;
  cursor: w-resize;
`;

const ResizeHandleRight = styled(ResizeHandle)`
  top: 0;
  bottom: 0;
  right: 0;
  width: 5px;
  cursor: e-resize;
`;

const WindowFrame = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: var(--outer-border-colors);
  background-color: var(--base-color);
  height: 100%;
`;

const WindowInnerFrame = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: var(--inner-border-colors);
  height: calc(100% - 2px);
`;

const WindowGrid = styled.div`
  height: calc(100% - 1px);
  display: grid;
  grid-template-rows: 18px auto;
`;

const WindowContent = styled.div`
  padding: 4px;
`;

interface WindowProps {
  readonly title?: string;
  readonly children?: ReactNode;
  readonly icon?: string;
  readonly controls?: Array<IconCode>;
  readonly onClose?: () => void;
  readonly onHelp?: () => void;
  readonly toolbars?: Array<ReactNode>;
}

function Window({
  children = null,
  title = "Window",
  controls = [],
  icon = "",
  onClose = () => {},
  onHelp = () => {},
  toolbars = [],
}: WindowProps) {
  const [size, setSize] = useState(INITIAL_DIMENSIONS);
  const [position, setPosition] = useState({ x: 120, y: 120 });
  const isResizing = useRef<null | string>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startWidth = useRef(0);
  const startHeight = useRef(0);
  const newWidth = useRef(0);
  const newHeight = useRef(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const CONTROL_HANDLERS: Record<string, MouseEventHandler> = {
    minimize: () => setIsMinimized(true),
    maximize: () => setIsMaximized(true),
    normize: () => setIsMaximized(false),
    close: () => onClose(),
    help: () => onHelp(),
  };

  function startResize(
    event: React.MouseEvent<HTMLDivElement>,
    direction: string
  ): void {
    event.preventDefault();
    isResizing.current = direction;
    startX.current = event.clientX;
    startY.current = event.clientY;
    startWidth.current = size.width;
    startHeight.current = size.height;
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResize);
  }

  function startDrag(event: React.MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    isDragging.current = true;
    startX.current = event.clientX;
    startY.current = event.clientY;
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", stopDrag);
  }

  function handleResize(event: globalThis.MouseEvent): void {
    if (!isResizing.current || isMaximized) return;
    const dx = event.clientX - startX.current;
    const dy = event.clientY - startY.current;
    let updatedWidth = startWidth.current;
    let updatedHeight = startHeight.current;
    let updatedX = position.x;
    let updatedY = position.y;

    switch (isResizing.current) {
      case "right":
        updatedWidth = Math.max(MIN_WIDTH, startWidth.current + dx);
        break;
      case "left":
        updatedWidth = Math.max(MIN_WIDTH, startWidth.current - dx);
        updatedX = position.x + size.width - updatedWidth;
        break;
      case "bottom":
        updatedHeight = Math.max(MIN_HEIGHT, startHeight.current + dy);
        break;
      case "top":
        updatedHeight = Math.max(MIN_HEIGHT, startHeight.current - dy);
        updatedY = position.y + size.height - updatedHeight;
        break;
      case "bottom-right":
        updatedWidth = Math.max(MIN_WIDTH, startWidth.current + dx);
        updatedHeight = Math.max(MIN_HEIGHT, startHeight.current + dy);
        break;
      case "bottom-left":
        updatedWidth = Math.max(MIN_WIDTH, startWidth.current - dx);
        updatedX = position.x + size.width - updatedWidth;
        updatedHeight = Math.max(MIN_HEIGHT, startHeight.current + dy);
        break;
      case "top-right":
        updatedWidth = Math.max(MIN_WIDTH, startWidth.current + dx);
        updatedHeight = Math.max(MIN_HEIGHT, startHeight.current - dy);
        updatedY = position.y + size.height - updatedHeight;
        break;
      case "top-left":
        updatedWidth = Math.max(MIN_WIDTH, startWidth.current - dy);
        updatedX = position.x + size.width - updatedWidth;
        updatedHeight = Math.max(MIN_HEIGHT, startHeight.current - dy);
        updatedY = position.y + size.height - updatedHeight;
        break;
    }

    newWidth.current = updatedWidth;
    newHeight.current = updatedHeight;

    setSize((prev) =>
      prev.width !== updatedWidth || prev.height !== updatedHeight
        ? { width: updatedWidth, height: updatedHeight }
        : prev
    );
    setPosition((prev) =>
      prev.x !== updatedX || prev.y !== updatedY
        ? { x: updatedX, y: updatedY }
        : prev
    );
  }

  function handleDrag(event: globalThis.MouseEvent): void {
    if (!isDragging.current || isMaximized) return;
    const dx = event.clientX - startX.current;
    const dy = event.clientY - startY.current;
    const newX = Math.max(0, position.x + dx);
    const newY = Math.max(0, position.y + dy);
    setPosition((prev) =>
      prev.x !== newX || prev.y !== newY ? { x: newX, y: newY } : prev
    );
  }

  function stopResize(): void {
    isResizing.current = null;
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", stopResize);
  }

  function stopDrag(): void {
    isDragging.current = false;
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("mouseup", stopDrag);
  }

  function renderControls(): Array<ReactElement> {
    return controls.map((control) => {
      const ctrl = isMaximized && control === "maximize" ? "normize" : control;
      return (
        <WindowControlButton
          key={uuidv4()}
          icon={ctrl}
          onClick={CONTROL_HANDLERS[ctrl]}
        />
      );
    });
  }

  return (
    <Resizable
      $left={isMaximized ? 0 : position.x}
      $top={isMaximized ? 0 : position.y}
      $width={isMaximized ? "100%" : `${newWidth.current}px`}
      $height={isMaximized ? "calc(100% - 2px)" : `${newHeight.current}px`}
      $isAnimating={isMaximized}
      style={{
        visibility: isMinimized ? "hidden" : "visible",
      }}
    >
      <ResizeHandleTopLeft onMouseDown={(e) => startResize(e, "top-left")} />
      <ResizeHandleTopRight onMouseDown={(e) => startResize(e, "top-right")} />
      <ResizeHandleBottomLeft
        onMouseDown={(e) => startResize(e, "bottom-left")}
      />
      <ResizeHandleBottomRight
        onMouseDown={(e) => startResize(e, "bottom-right")}
      />
      <ResizeHandleTop onMouseDown={(e) => startResize(e, "top")} />
      <ResizeHandleBottom onMouseDown={(e) => startResize(e, "bottom")} />
      <ResizeHandleLeft onMouseDown={(e) => startResize(e, "left")} />
      <ResizeHandleRight onMouseDown={(e) => startResize(e, "right")} />
      <WindowFrame>
        <WindowInnerFrame>
          <WindowGrid>
            <WindowTitleBar
              title={title}
              icon={icon}
              controls={renderControls()}
              onMouseDown={startDrag}
              onDoubleClick={() => setIsMaximized((prev) => !prev)}
            />
            <div>
              <WindowTools>{toolbars}</WindowTools>
              <WindowContent>{children}</WindowContent>
            </div>
          </WindowGrid>
        </WindowInnerFrame>
      </WindowFrame>
    </Resizable>
  );
}

export default Window;
