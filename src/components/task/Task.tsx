import { MouseEventHandler } from "react";
import styled from "styled-components";

const TaskItemInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
  flex-shrink: 1;
  border-width: 1px;
  border-style: solid;
  padding: 0 4px;
  width: 100%;
`;

const TaskLabel = styled.span`
  font-size: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TaskItem = styled.div.attrs<{ $active: boolean }>(({ $active }) => ({
  style: {
    background: $active
      ? "repeating-conic-gradient(#f0f0f0 0deg 90deg, #dbdbdb 90deg 180deg)"
      : "var(--base-color)",
    backgroundSize: $active ? "4px 4px" : "cover",
    borderColor: $active
      ? "var(--outer-border-colors-inverted)"
      : "var(--outer-border-colors)",
  },
}))`
  height: 22px;
  display: flex;
  flex-shrink: 2;
  flex-grow: 1;
  max-width: 180px;
  border-width: 1px;
  border-style: solid;
  ${TaskItemInner} {
    border-color: ${({ $active }) =>
      $active
        ? "var(--inner-border-colors-inverted)"
        : "var(--inner-border-colors)"};
  }
  ${TaskLabel} {
    font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  }
`;

const TaskIcon = styled.div`
  flex-shrink: 0;
  width: 16px;
  height: 16px;
`;

interface TaskProps {
  readonly label?: string;
  readonly icon?: string;
  readonly onClick?: MouseEventHandler;
  readonly active?: boolean;
}

function Task({
  label = "Window",
  icon = "folder",
  active = false,
  onClick = () => {},
}: TaskProps) {
  const iconSrc = `/src/assets/icons/16x16/${icon}.png`;
  return (
    <TaskItem $active={active} onClick={onClick}>
      <TaskItemInner>
        <TaskIcon>
          <img src={iconSrc} alt="" width="16px" height="16px" />
        </TaskIcon>
        <TaskLabel>{label}</TaskLabel>
      </TaskItemInner>
    </TaskItem>
  );
}

export default Task;
