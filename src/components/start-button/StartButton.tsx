import { MouseEventHandler } from "react";
import styled from "styled-components";
import startIcon from "../../assets/icons/16x16/start.png";

const ControlledButton = styled.button.attrs<{ $active: boolean }>(
  ({ $active }) => ({
    style: {
      borderColor: $active
        ? "var(--outer-border-colors-inverted)"
        : "var(--outer-border-colors)",
      background: $active
        ? "repeating-conic-gradient(#f0f0f0 0deg 90deg, #dbdbdb 90deg 180deg)"
        : "var(--base-color)",
      backgroundSize: $active ? "4px 4px" : "cover",
    },
  })
)`
  border-width: 1px;
  border-style: solid;
  padding: 0;
`;

const InnerButtonDiv = styled.div.attrs<{ $active: boolean }>(
  ({ $active }) => ({
    style: {
      borderColor: $active
        ? "var(--inner-border-colors-inverted)"
        : "var(--inner-border-colors)",
    },
  })
)`
  border-width: 1px;
  border-style: solid;
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
    <ControlledButton onClick={onClick} $active={active}>
      <InnerButtonDiv $active={active}>
        <img src={startIcon} alt="" width="16px" height="14px" />
        <b>Start</b>
      </InnerButtonDiv>
    </ControlledButton>
  );
}

export default StartButton;
