import styled from "styled-components";
import { MouseEventHandler, ReactNode } from "react";

interface WindowTitleBarProps {
  readonly title?: string;
  readonly controls?: Array<ReactNode>;
  readonly icon?: string;
  readonly onMouseDown?: MouseEventHandler;
  readonly onDoubleClick?: MouseEventHandler;
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
  display: inline-flex;
`;

function WindowTitleBar({
  title = "",
  controls = [],
  icon = "",
  onMouseDown = () => {},
  onDoubleClick = () => {},
}: WindowTitleBarProps) {
  const iconAsset = icon
    ? `/src/assets/icons/16x16/${icon}.png`
    : "/src/assets/icons/16x16/empty.png";

  const controlsWidth: number = controls.length * 16 + 4;
  function renderControls() {
    return controls.map((control, index) => {
      return (
        <div
          key={index}
          style={{
            margin: index === controls.length - 1 ? "0 2px" : "0px",
          }}
        >
          {control}
        </div>
      );
    });
  }

  return (
    <TitleBar $controlsWidth={controlsWidth}>
      <Title onMouseDown={onMouseDown} onDoubleClick={onDoubleClick}>
        {icon && <Icon src={iconAsset} alt="" />}
        <TitleLabel>{title}</TitleLabel>
      </Title>
      <Controls>{renderControls()}</Controls>
    </TitleBar>
  );
}

export default WindowTitleBar;
