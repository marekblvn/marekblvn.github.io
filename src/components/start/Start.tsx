import { useState, useRef, useEffect } from "react";
import StartButton from "../start-button/StartButton";
import styled from "styled-components";

const StartMenuDiv = styled.div`
  position: absolute;
  left: 0;
  bottom: 24px;
  width: 205px;
  height: 336px;
  border-width: 1px;
  border-style: solid;
  border-color: #fff #000 #000 #fff;
  display: grid;
  transform-origin: bottom;
  transform: scaleY(0);
  animation: grow 150ms ease-in-out forwards;
  @keyframes grow {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }
`;

const StartMenuDivInner = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: #dbdbdb #808080 #808080 #dbdbdb;
  display: grid;
  grid-template-columns: 21px auto;
  background-color: #bfbfbf;
`;

const StartMenuSideText = styled.div`
  background-color: #000080;
  writing-mode: sideways-lr;
  user-select: none;
  color: #ffffff;
  padding-bottom: 4px;
  font-weight: bold;
  display: flex;
  align-items: center;
  column-gap: 4px;
`;
function Start() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const startMenuRef = useRef<HTMLDivElement>(null);
  function toggleMenu(): void {
    setIsOpen((prev) => !prev);
  }
  function handleClickOutside(event: MouseEvent): void {
    if (
      startMenuRef.current &&
      !startMenuRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);
  return (
    <div
      style={{ position: "relative", padding: 0, margin: 0 }}
      ref={startMenuRef}
    >
      <StartButton onClick={toggleMenu} active={isOpen} />
      {isOpen && (
        <StartMenuDiv>
          <StartMenuDivInner>
            <StartMenuSideText>
              Marek
              <span style={{ fontWeight: "normal" }}>Balvín</span>
            </StartMenuSideText>
          </StartMenuDivInner>
        </StartMenuDiv>
      )}
    </div>
  );
}

export default Start;
