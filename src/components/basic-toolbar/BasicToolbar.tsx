import { RefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Popover = styled.div`
  position: fixed;
  background-color: var(--base-color);
  border-width: 1px;
  border-style: solid;
  border-color: var(--outer-border-colors);
  width: 120px;
  z-index: 100;
`;

const PopoverInnerDiv = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: var(--inner-border-colors);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(20px, auto);
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
  &:active {
    margin: 0;
    border-width: 1px;
    border-style: solid;
    border-color: var(--inner-border-colors-inverted);
  }
  &:hover:not(:active) {
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
  & > span {
    text-decoration: underline;
  }
`;

type PopoverType =
  | "file"
  | "edit"
  | "view"
  | "go"
  | "favorites"
  | "tools"
  | "help"
  | null;

type ButtonRefs = {
  [key in Exclude<PopoverType, null>]: RefObject<HTMLButtonElement | null>;
};

function BasicToolbar() {
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

  const buttonRefs: ButtonRefs = {
    file: useRef<HTMLButtonElement>(null),
    edit: useRef<HTMLButtonElement>(null),
    view: useRef<HTMLButtonElement>(null),
    go: useRef<HTMLButtonElement>(null),
    favorites: useRef<HTMLButtonElement>(null),
    tools: useRef<HTMLButtonElement>(null),
    help: useRef<HTMLButtonElement>(null),
  };

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
      {Object.keys(buttonRefs).map((button) => (
        <ToolButton
          key={button}
          $popoverOpened={activePopover === button}
          onClick={() => togglePopover(button as Exclude<PopoverType, null>)}
          ref={buttonRefs[button as Exclude<PopoverType, null>]}
        >
          <span>{button.charAt(0).toUpperCase()}</span>
          {button.slice(1)}
        </ToolButton>
      ))}
      {activePopover && (
        <Popover style={getPopoverPosition(buttonRefs[activePopover])}>
          <PopoverInnerDiv></PopoverInnerDiv>
        </Popover>
      )}
    </>
  );
}

export default BasicToolbar;
