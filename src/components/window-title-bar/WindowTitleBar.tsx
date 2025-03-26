import styled from "styled-components";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import emptyIcon from "../../assets/icons/16x16/empty.png";

interface WindowTitleBarProps {
  readonly title?: string;
  readonly controls?: Array<ReactNode>;
  readonly icon?: string;
  readonly onMouseDown?: MouseEventHandler;
  readonly onDoubleClick?: MouseEventHandler;
  readonly isFocused?: boolean;
}

const TitleLabel = styled.span`
  font-weight: bold;
  font-size: 11px;
  padding-left: 4px;
`;

const TitleBar = styled.div<{ $controlsWidth: number; $isFocused: boolean }>`
  width: 100%;
  min-width: 120px;
  height: 18px;
  background: ${({ $isFocused }) =>
    $isFocused
      ? "linear-gradient(to right, #00007b, #1085d2)"
      : "linear-gradient(to right, #808080, #b5b5b5)"};
  display: grid;
  align-items: center;
  grid-template-columns: ${({ $controlsWidth }) => `auto ${$controlsWidth}px`};
  column-gap: 8px;
  ${TitleLabel} {
    color: ${({ $isFocused }) => ($isFocused ? "#fff" : "#c0c0c0")};
  }
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
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
  isFocused = true,
}: WindowTitleBarProps) {
  const [iconSrc, setIconSrc] = useState<string | undefined>(undefined);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (icon) {
          const res = await import(`../../assets/icons/16x16/${icon}.png`);
          setIconSrc(res.default);
        } else {
          setIconSrc(emptyIcon);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchImage();
  }, [icon]);

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
    <TitleBar $controlsWidth={controlsWidth} $isFocused={isFocused}>
      <Title onMouseDown={onMouseDown} onDoubleClick={onDoubleClick}>
        {icon && <Icon src={iconSrc} alt="" />}
        <TitleLabel>{title}</TitleLabel>
      </Title>
      <Controls>{renderControls()}</Controls>
    </TitleBar>
  );
}

export default WindowTitleBar;
