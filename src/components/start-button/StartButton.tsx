import { MouseEventHandler } from "react";
import styled from "styled-components";
import startIcon from "../../assets/icons/start.png";

const ControlledButton = styled.button<{ active: boolean }>`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ active }) =>
    active ? "#000 #fff #fff #000" : "#fff #000 #000 #fff"};
  padding: 0;
  background: ${({ active }) =>
    active
      ? "repeating-conic-gradient(#f0f0f0 0deg 90deg, #dbdbdb 90deg 180deg)"
      : "#bfbfbf"};
  background-size: ${({ active }) => (active ? "5px 5px" : "cover")};
`;

const InnerButtonDiv = styled.div<{ active: boolean }>`
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.active
      ? "#808080 #dbdbdb #dbdbdb #808080"
      : "#dbdbdb #808080 #808080 #dbdbdb"};
  display: flex;
  align-items: center;
  padding: 2px 4px;
  height: 16px;
  column-gap: 3px;
  font-family: "MS Sans Serif", sans-serif;
`;

interface StartButtonProps {
  readonly active: boolean;
  readonly onClick: MouseEventHandler<HTMLButtonElement>;
}

function StartButton({ onClick = () => {}, active = false }: StartButtonProps) {
  return (
    <ControlledButton onClick={onClick} active={active}>
      <InnerButtonDiv active={active}>
        <img src={startIcon} alt="" width="16px" height="14px" />
        <b>Start</b>
      </InnerButtonDiv>
    </ControlledButton>
  );
}

export default StartButton;
