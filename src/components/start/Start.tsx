import { useState, useRef, useEffect } from "react";
import StartButton from "../start-button/StartButton";
import styled from "styled-components";

const StartMenu = styled.div`
  position: absolute;
  left: 0;
  bottom: 24px;
  width: 205px;
  height: 340px;
  background-color: #bfbfbf;
  border-width: 1px;
  border-style: solid;
  border-color: #fff #000 #000 #fff;
  display: grid;
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
        <StartMenu>
          <div
            style={{
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#dbdbdb #808080 #808080 #dbdbdb",
            }}
          ></div>
        </StartMenu>
      )}
    </div>
  );
}

export default Start;
