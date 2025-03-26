import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import arrowDownIcon from "../../assets/svg/arrow-down.svg";
import windowToolIcons from "../../assets/sprites/window-control-icons.png";
import windowToolsIconsGreyscale from "../../assets/sprites/window-tool-icons-greyscale.png";

const Tools = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
  margin: 0;
  background-color: var(--base-color);
  white-space: nowrap;
  width: calc(100% - 12px);
`;

const ToolIcon = styled.div<{ $positionX: number }>`
  width: 20px;
  height: 20px;
  background-image: url(${windowToolIcons});
  background-position-y: 0px;
  background-position-x: ${({ $positionX }) => `${$positionX}px`};
  image-rendering: pixelated;
`;

const ToolLabel = styled.div`
  text-align: center;
  height: 12px;
  font-family: "MS Sans Serif", sans-serif;
  font-size: 11px;
  line-height: 11px;
  color: #000;
  text-shadow: none;
  margin-top: 2px;
  text-transform: capitalize;
  justify-items: center;
`;

const ToolButton = styled.button`
  display: grid;
  width: 54px;
  height: 40px;
  justify-items: center;
  justify-content: center;
  align-items: center;
  background-color: var(--base-color);
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  &:disabled {
    ${ToolLabel} {
      color: #808080;
      text-shadow: 1px 1px #fff;
    }
    ${ToolIcon} {
      background-image: url(${windowToolsIconsGreyscale});
    }
  }
  &:hover:not(:disabled) {
    border-width: 1px;
    border-style: solid;
    border-color: var(--inner-border-colors);
  }
  &:active:not(:disabled) {
    border-color: var(--inner-border-colors-inverted);
  }
`;

const Divider = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: transparent #fff transparent #808080;
  height: 50%;
  margin: 1px;
`;

const DropdownButton = styled.button<{ $active: boolean }>`
  width: 18px;
  height: 40px;
  padding: 0;
  margin: 0;
  background-color: var(--base-color);
  border-width: 1px;
  border-style: solid;
  border-color: var(--base-color);
  justify-content: center;
  ${({ $active }) =>
    $active
      ? {
          borderColor: "var(--inner-border-colors-inverted)",
        }
      : {
          "&:hover": {
            borderColor: "var(--inner-border-colors)",
          },
        }};
`;

const Dropdown = styled.div`
  position: fixed;
  z-index: 2;
  background-color: var(--base-color);
  border-width: 1px;
  border-style: solid;
  border-color: var(--outer-border-colors);
`;

const DropdownInnerDiv = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: var(--inner-border-colors);
  display: flex;
  flex-direction: row;
`;

const ICONS_OFFSET: Record<string, number> = {
  back: 0,
  forward: -20,
  up: -880,
  cut: -420,
  copy: -440,
  paste: -460,
  undo: -480,
  delete: -520,
  properties: -620,
  views: -760,
};

const ICONS = [
  "back",
  "forward",
  "up",
  "|",
  "cut",
  "copy",
  "paste",
  "|",
  "undo",
  "|",
  "delete",
  "properties",
  "|",
  "views",
];

const DISABLED_ICONS = [
  //TODO: Remove when all buttons have functionality.
  "back",
  "forward",
  "up",
  "cut",
  "copy",
  "paste",
  "undo",
  "delete",
  "properties",
  "views",
];

function DirectoryToolbar() {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [visibleIcons, setVisibleIcons] = useState<Array<string>>(ICONS);
  const [overflowIcons, setOverflowIcons] = useState<Array<string>>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      if (!toolbarRef.current) return;
      const containerWidth = toolbarRef.current.clientWidth;
      let totalWidth = 0;
      const newVisible: Array<string> = [];
      const newOverflow: Array<string> = [];

      for (const icon of ICONS) {
        if (icon === "|") {
          totalWidth += 4;
        } else {
          totalWidth += 50;
        }
        if (totalWidth < containerWidth) {
          newVisible.push(icon);
        } else {
          newOverflow.push(icon);
        }
      }

      setVisibleIcons(newVisible);
      setOverflowIcons(newOverflow);
    };

    const observer = new ResizeObserver(updateVisibility);
    if (toolbarRef.current) observer.observe(toolbarRef.current);
    return () => observer.disconnect();
  }, []);

  function renderDropDown() {
    if (!isDropdownOpen) return null;
    return (
      <Dropdown
        style={{
          marginTop: "42px",
          marginRight: "-4px",
        }}
      >
        <DropdownInnerDiv>
          {overflowIcons
            .filter((icon) => icon !== "|")
            .map((icon) => {
              return (
                <ToolButton
                  key={uuidv4()}
                  disabled={DISABLED_ICONS.includes(icon)}
                >
                  <ToolIcon $positionX={ICONS_OFFSET[icon]} />
                  <ToolLabel>{icon}</ToolLabel>
                </ToolButton>
              );
            })}
        </DropdownInnerDiv>
      </Dropdown>
    );
  }

  return (
    <Tools ref={toolbarRef}>
      {visibleIcons.map((icon, index) => {
        if (icon === "|") {
          if (index === visibleIcons.length - 1) return null;
          return <Divider key={uuidv4()} />;
        }
        return (
          <ToolButton key={uuidv4()} disabled={DISABLED_ICONS.includes(icon)}>
            <ToolIcon $positionX={ICONS_OFFSET[icon]} />
            <ToolLabel>{icon}</ToolLabel>
          </ToolButton>
        );
      })}
      {overflowIcons.length > 0 && (
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "24px",
            justifyContent: "end",
          }}
        >
          <DropdownButton
            $active={isDropdownOpen}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src={arrowDownIcon}
              alt=""
              width="16px"
              height="16px"
              style={{ marginTop: "4px" }}
            />
          </DropdownButton>
          {renderDropDown()}
        </div>
      )}
    </Tools>
  );
}

export default DirectoryToolbar;
