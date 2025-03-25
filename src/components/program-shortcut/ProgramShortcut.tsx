import {
  FunctionComponent,
  MouseEvent,
  MouseEventHandler,
  useState,
} from "react";
import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const ProgramIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const ProgramLabel = styled.div`
  width: 73px;
  font-weight: normal;
  font-size: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: break-spaces;
  text-align: center;
  white-space: normal;
  word-break: break-word;
`;

const ProgramShortcutDiv = styled.div<{
  $selected: boolean;
  $labelColor: string;
}>`
  width: 75px;
  height: 75px;
  display: grid;
  grid-template-rows: 37px 37px;
  row-gap: 1px;
  align-items: start;
  justify-items: center;
  ${ProgramIcon} {
    filter: ${({ $selected }) =>
      $selected
        ? "sepia(100%) saturate(600%) hue-rotate(180deg) brightness(60%) contrast(200%)"
        : "none"};
  }
  ${ProgramLabel} {
    padding: ${($selected) => ($selected ? "0px" : "1px")};
    -webkit-line-clamp: ${({ $selected }) => ($selected ? 6 : 3)};
    background-color: ${({ $selected }) =>
      $selected ? "var(--blue-color)" : "transparent"};
    border: ${({ $selected }) => ($selected ? "dotted 1px #ffffff" : "none")};
    color: ${({ $selected, $labelColor }) =>
      $selected ? "#fff" : $labelColor};
  }
`;

interface ProgramShortcutProps {
  label?: string;
  icon?: string;
  onDoubleClick?: MouseEventHandler;
  color?: string;
}

const ProgramShortcut: FunctionComponent<ProgramShortcutProps> = ({
  label = "Program",
  icon = "folder",
  onDoubleClick = () => {},
  color = "#fff",
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const iconAsset = icon
    ? `/src/assets/icons/32x32/${icon}.png`
    : "/src/assets/icons/32x32/empty.png";

  const handleClick = () => {
    setIsSelected(true);
  };
  const handleDoubleClick = (event: MouseEvent) => {
    onDoubleClick(event);
    setIsSelected(false);
  };
  const handleClickOutside = () => {
    setIsSelected(false);
  };
  const outsideClickRef = useOutsideClick(handleClickOutside);
  return (
    <ProgramShortcutDiv
      $labelColor={color}
      $selected={isSelected}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      ref={outsideClickRef}
    >
      <ProgramIcon src={iconAsset} alt="" />
      <ProgramLabel>{label}</ProgramLabel>
    </ProgramShortcutDiv>
  );
};

export default ProgramShortcut;
