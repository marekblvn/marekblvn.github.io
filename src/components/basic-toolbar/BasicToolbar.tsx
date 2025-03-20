import { RefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Menu } from "../../data/menu-data";
import ToolMenu from "../tool-menu/ToolMenu";
import { v4 as uuidv4 } from "uuid";

const Popover = styled.div`
  position: fixed;
  background-color: var(--base-color);
  border-width: 1px;
  border-style: solid;
  border-color: var(--outer-border-colors);
  z-index: 100;
`;

const PopoverInnerDiv = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: var(--inner-border-colors);
  display: grid;
  grid-template-columns: 1fr;
`;

const ToolButton = styled.button<{ $popoverOpened: boolean }>`
  height: 100%;
  border: none;
  background-color: var(--base-color);
  font-family: "MS Sans Serif", sans-serif;
  font-size: 11px;
  margin: 1px;
  ${({ $popoverOpened }) =>
    $popoverOpened
      ? {
          margin: "0",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "var(--inner-border-colors-inverted)",
        }
      : {}};
  &:active:not(:disabled) {
    margin: 0;
    border-width: 1px;
    border-style: solid;
    border-color: var(--inner-border-colors-inverted);
  }
  &:hover:not(:active):not(:disabled) {
    ${({ $popoverOpened }) =>
      $popoverOpened
        ? {}
        : {
            margin: "0",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "var(--inner-border-colors)",
          }};
  }
  &:disabled {
    color: #808080;
    text-shadow: 1px 1px #fff;
  }
  & > span {
    text-decoration: underline;
  }
`;

interface BasicToolbarProps {
  readonly menuItems: Array<Menu>;
}

type PopoverType = string | null;
type ButtonRefs = Record<string, RefObject<HTMLButtonElement>>;

function BasicToolbar({ menuItems = [] }: BasicToolbarProps) {
  const [activePopover, setActivePopover] = useState<PopoverType>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!activePopover) return;
      const popoverElements = document.querySelectorAll(".popover");
      const clickedInsidePopover = Array.from(popoverElements).some((popover) =>
        popover.contains(event.target as Node)
      );
      if (!clickedInsidePopover) {
        closePopover();
      }
    };

    if (activePopover) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activePopover]);

  const buttonRefs: ButtonRefs = menuItems.reduce((acc, item) => {
    if (item.label) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      acc[item.label] = useRef<HTMLButtonElement>(null!);
    }
    return acc;
  }, {} as ButtonRefs);

  const togglePopover = (button: Exclude<PopoverType, null>) => {
    setActivePopover(button);
  };

  const closePopover = () => {
    setActivePopover(null);
  };

  const getPopoverPosition = (
    buttonRef: RefObject<HTMLButtonElement | null>
  ) => {
    if (!buttonRef.current) return { top: 0, left: 0 };
    const rect = buttonRef.current.getBoundingClientRect();
    return { top: rect.bottom, left: rect.left };
  };

  return (
    <>
      {menuItems.map((menu) => (
        <ToolButton
          key={menu.label}
          disabled={menu.isDisabled}
          $popoverOpened={activePopover === menu.label}
          onClick={() => menu.label && togglePopover(menu.label)}
          ref={menu.label ? buttonRefs[menu.label] : undefined}
        >
          <span>{menu.label?.charAt(0).toUpperCase()}</span>
          {menu.label?.slice(1)}
        </ToolButton>
      ))}
      {activePopover && (
        <Popover style={getPopoverPosition(buttonRefs[activePopover])}>
          <PopoverInnerDiv>
            <ToolMenu
              key={uuidv4()}
              items={
                menuItems.find((menu) => menu.label === activePopover)?.children
              }
            />
          </PopoverInnerDiv>
        </Popover>
      )}
    </>
  );
}

export default BasicToolbar;
