import {
  MouseEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import WindowTitleBar from "../window-title-bar/WindowTitleBar";
import WindowControlButton, {
  WindowControlIconCode,
  WindowControlProps,
} from "../window-control-button/WindowControlButton";
import { useWindowManager } from "../../hooks/useWindowManager";
import Resizable, { Position, Size } from "../resizable/Resizable";
import Focusable from "../focusable/Focusable";
import Draggable from "../draggable/Draggable";

const WindowFrame = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: var(--outer-border-colors);
  height: 100%;
  user-select: none;
`;

const WindowInnerFrame = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: var(--inner-border-colors);
  height: calc(100% - 2px);
`;

interface WindowProps {
  readonly title?: string;
  readonly children?: ReactNode;
  readonly icon?: string;
  readonly controls?: Array<WindowControlIconCode>;
  readonly controlsProps?: Record<WindowControlIconCode, WindowControlProps>;
  readonly onClose: (event: MouseEvent, code: string) => void;
  readonly onHelp?: () => void;
  readonly code?: string;
  readonly initialPosition?: { x: number; y: number };
  readonly initialSize?: Size;
  readonly fullScreenOnly?: boolean;
  readonly resizable?: boolean;
}

function Window({
  children = null,
  title = "Window",
  controls = ["minimize", "maximize", "close"],
  controlsProps = {
    close: {
      disabled: false,
      margin: "0px",
    },
    minimize: {
      disabled: false,
      margin: "0px",
    },
    maximize: {
      disabled: false,
      margin: "0px",
    },
    normize: {
      disabled: false,
      margin: "0px",
    },
    help: {
      disabled: false,
      margin: "0px",
    },
  },
  icon = "",
  code = "",
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 400, height: 300 },
  fullScreenOnly = false,
  resizable = true,
  onClose,
  onHelp = () => {},
}: Readonly<WindowProps>) {
  const { state, dispatch } = useWindowManager();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(fullScreenOnly);
  const [size, setSize] = useState(initialSize);
  const sizeRef = useRef<Size>(size);
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    if (state.focusedWindowCode === code && isMinimized) {
      setIsMinimized(false);
    }
  }, [state.focusedWindowCode, code, isMinimized]);

  const CONTROL_HANDLERS = {
    close: handleCloseWindow,
    help: onHelp,
    minimize: handleMinimizeWindow,
    maximize: handleToggleMaximizeWindow,
    normize: handleToggleMaximizeWindow,
  };

  const handleResize = (newSize: Size, newPosition: Position): void => {
    setSize((prev) =>
      prev.width !== newSize.width || prev.height !== newSize.height
        ? newSize
        : prev
    );
    setPosition((prev) =>
      prev.x !== newPosition.x || prev.y !== newPosition.y ? newPosition : prev
    );
    sizeRef.current = size;
  };

  function handleDrag(newPosition: Position): void {
    setPosition((prev) =>
      prev.x !== newPosition.x || prev.y !== newPosition.y ? newPosition : prev
    );
  }

  function regainFocus(): void {
    if (state.focusedWindowCode !== code) {
      dispatch({ type: "FOCUS_WINDOW", payload: code });
    }
  }

  function handleToggleMaximizeWindow(): void {
    if (fullScreenOnly) return;
    setIsMaximized((prev) => !prev);
  }

  function handleMinimizeWindow(): void {
    setIsMinimized(true);
    dispatch({ type: "MINIMIZE_WINDOW", payload: code });
  }

  function handleCloseWindow(event: MouseEvent): void {
    onClose(event, code);
  }

  function renderControls(): Array<ReactElement> {
    return controls.map((control) => {
      const { disabled, margin } = controlsProps[control];
      const ctrl = isMaximized && control === "maximize" ? "normize" : control;
      return (
        <WindowControlButton
          key={uuidv4()}
          icon={ctrl}
          onClick={CONTROL_HANDLERS[control] || (() => {})}
          disabled={disabled}
          margin={margin}
        />
      );
    });
  }

  return (
    <Resizable
      onResize={handleResize}
      position={position}
      size={size}
      resizable={isMaximized ? false : resizable}
      isMaximized={isMaximized}
    >
      <Focusable onFocus={regainFocus} code={code}>
        <WindowFrame>
          <WindowInnerFrame onClick={regainFocus}>
            <Draggable onDrag={handleDrag} position={position}>
              <WindowTitleBar
                isFocused={state.focusedWindowCode === code}
                title={title}
                icon={icon}
                controls={renderControls()}
                onDoubleClick={handleToggleMaximizeWindow}
              />
            </Draggable>
            {children}
          </WindowInnerFrame>
        </WindowFrame>
      </Focusable>
    </Resizable>
  );
}

export default Window;
