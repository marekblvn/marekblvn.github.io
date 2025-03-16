import { MouseEventHandler } from "react";
import styled from "styled-components";

const spriteOffsets = {
  minimize: "0px",
  maximize: "-12px",
  normize: "-24px",
  close: "-36px",
  help: "-48px",
} as const;

export type IconCode = keyof typeof spriteOffsets;

interface WindowControlButtonProps {
  readonly icon?: IconCode;
  readonly onClick?: MouseEventHandler;
  readonly disabled?: boolean;
  readonly margin?: string;
}

const IconDiv = styled.div<{ x: string }>`
  border-width: 1px;
  border-style: solid;
  border-color: #dbdbdb #808080 #808080 #dbdbdb;
  width: 12px;
  height: 10px;
  image-rendering: pixelated;
  padding: 0;
  background-image: url("/src/assets/sprites/window-control-icons.png");
  background-position-x: ${(props) => (props.x ? props.x : "0px")};
  background-position-y: 0px;
  user-select: none;
`;

const IconBtn = styled.button<{ $margin: string }>`
  border-width: 1px;
  border-style: solid;
  border-color: #fff #000 #000 #fff;
  width: 16px;
  height: 14px;
  padding: 0;
  margin: ${({ $margin }) => $margin};
  background-color: #bfbfbf;
  &:active:not(:disabled) {
    border-color: #000 #fff #fff #000;
  }
  &:active:not(:disabled) ${IconDiv} {
    border-color: #808080 #dbdbdb #dbdbdb #808080;
  }
  &:disabled ${IconDiv} {
    background-image: url("/src/assets/sprites/window-control-icons-greyscale.png");
  }
`;

function WindowControlButton({
  icon = "close",
  onClick = () => {},
  disabled = false,
  margin = "0px",
}: WindowControlButtonProps) {
  const iconOffset: string = spriteOffsets[icon] || "0px";
  return (
    <IconBtn onClick={onClick} disabled={disabled} $margin={margin}>
      <IconDiv x={iconOffset} />
    </IconBtn>
  );
}

export default WindowControlButton;
