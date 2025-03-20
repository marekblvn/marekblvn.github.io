import { MouseEventHandler } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

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

const TaskItem = styled.div<{ $active: boolean }>`
  background-color: var(--base-color);
  height: 22px;
  display: flex;
  flex-shrink: 2;
  flex-grow: 1;
  max-width: 180px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ $active }) =>
    $active
      ? "var(--outer-border-colors-inverted)"
      : "var(--outer-border-colors)"};
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
  readonly code?: string;
  readonly onClick?: MouseEventHandler;
}

function Task({
  label = "Window",
  icon = "folder",
  code = uuidv4(),
  onClick = () => {},
}: TaskProps) {
  const iconSrc = `/src/assets/icons/16x16/${icon}.png`;
  return (
    <TaskItem $active={false} onClick={onClick}>
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
