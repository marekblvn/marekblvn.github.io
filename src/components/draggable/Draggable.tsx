import { MouseEvent, ReactNode, useRef } from "react";
import { Position } from "../resizable/Resizable";

interface IDraggable {
  readonly position?: Position;
  readonly canBeDragged?: boolean;
  readonly onDrag?: (newPosition: Position) => void;
  readonly children?: ReactNode;
}

function Draggable({
  position = { x: 0, y: 0 },
  canBeDragged = true,
  onDrag = () => {},
  children = null,
}: IDraggable) {
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(position.x);
  const startY = useRef<number>(position.y);

  const startDrag = (event: MouseEvent): void => {
    isDragging.current = true;
    startX.current = event.clientX;
    startY.current = event.clientY;
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", stopDrag);
  };

  const handleDrag = (event: globalThis.MouseEvent): void => {
    if (!isDragging.current || !canBeDragged) return;
    const dx = event.clientX - startX.current;
    const dy = event.clientY - startY.current;
    const newX = Math.max(0, position.x + dx);
    const newY = Math.max(0, position.y + dy);
    onDrag({ x: newX, y: newY });
  };

  const stopDrag = (): void => {
    isDragging.current = false;
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("mouseup", stopDrag);
  };

  return <div onMouseDown={startDrag}>{children}</div>;
}

export default Draggable;
