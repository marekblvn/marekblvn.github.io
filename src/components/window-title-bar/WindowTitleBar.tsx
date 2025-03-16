import styled from "styled-components";
import WindowControlButton, {
  IconCode,
} from "../window-control-button/WindowControlButton";
import { ReactNode } from "react";

interface WindowTitleBarProps {
  readonly title?: string;
  readonly controls?:
    | [IconCode, IconCode, IconCode]
    | [IconCode, IconCode]
    | [IconCode];
}

const TitleBar = styled.div<{ $controlsWidth: number }>`
  width: 100%;
  min-width: 120px;
  height: 18px;
  background: linear-gradient(to right, #00007b, #1085d2);
  display: grid;
  align-items: center;
  grid-template-columns: ${({ $controlsWidth }) => `auto ${$controlsWidth}px`};
  column-gap: 8px;
`;

const Title = styled.div`
  display: inline-block;
`;

const TitleLabel = styled.span`
  color: #ffffff;
  font-weight: bold;
  font-size: 12px;
  padding-left: 4px;
`;

const Icon = styled.img``;

const Controls = styled.div`
  display: inline-block;
`;

function WindowTitleBar({
  title = "",
  controls = ["minimize", "maximize", "close"],
}: WindowTitleBarProps) {
  const controlsWidth: number = controls.length * 16 + 4;
  function renderControls(): Array<ReactNode> {
    return controls.map((control, index) => {
      return (
        <WindowControlButton
          margin={index === controls.length - 1 ? "0 2px" : "0px"}
          key={index}
          icon={control}
        />
      );
    });
  }

  return (
    <TitleBar $controlsWidth={controlsWidth}>
      <Title>
        <TitleLabel>{title}</TitleLabel>
      </Title>
      <Controls>{renderControls()}</Controls>
    </TitleBar>
  );
}

export default WindowTitleBar;
