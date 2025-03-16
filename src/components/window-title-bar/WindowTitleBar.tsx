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
  readonly icon?: string;
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
  display: inline-flex;
  align-items: center;
`;

const TitleLabel = styled.span`
  color: #ffffff;
  font-weight: bold;
  font-size: 12px;
  padding-left: 4px;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 2px;
`;

const Controls = styled.div`
  display: inline-block;
`;

function WindowTitleBar({
  title = "",
  controls = ["minimize", "maximize", "close"],
  icon = "",
}: WindowTitleBarProps) {
  const iconAsset = icon
    ? `/src/assets/icons/${icon}.png`
    : "/src/assets/icons/empty.png";

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
        {icon && <Icon src={iconAsset} alt="" />}
        <TitleLabel>{title}</TitleLabel>
      </Title>
      <Controls>{renderControls()}</Controls>
    </TitleBar>
  );
}

export default WindowTitleBar;
