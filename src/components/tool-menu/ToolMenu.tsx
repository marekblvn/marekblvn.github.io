import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { Submenu } from "../../data/menu-data";

const Menu = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  background-color: var(--base-color);
`;

const MenuItem = styled.div<{ $disabled: boolean }>`
  display: grid;
  min-width: 144px;
  grid-template-columns: 16px auto 64px 16px;
  grid-template-rows: 1fr;
  grid-template-areas: "icon label label label key key submenu";
  justify-content: start;
  padding: 2px;
  margin: 1px;
  font-size: 11px;
  line-height: 12px;
  ${({ $disabled }) =>
    $disabled
      ? {
          color: "#808080",
          textShadow: "1px 1px #fff",
          cursor: "default",
        }
      : {
          color: "#000",
          textShadow: "none",
          "&:hover": {
            backgroundColor: "#000080",
            color: "#fff",
            cursor: "default",
          },
        }}
`;

const Divider = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: #808080 transparent #fff transparent;
  margin: 2px 0;
  margin-left: 2px;
  width: 95%;
`;

interface ToolMenuProps {
  readonly items?: Array<Submenu>;
}

function ToolMenu({ items = [] }: ToolMenuProps) {
  function renderItems() {
    return items.map((item) => {
      const { label, isDisabled, isDivider, keyShortcut, icon } = item;
      if (isDivider) {
        return <Divider key={uuidv4()} />;
      }
      return (
        <MenuItem key={uuidv4()} $disabled={isDisabled || false}>
          <div style={{ gridArea: "icon", textAlign: "center" }}>{icon}</div>
          <div style={{ gridArea: "label" }}>{label}</div>
          <div style={{ gridArea: "key" }}>{keyShortcut ?? " "}</div>
          <div style={{ gridArea: "submenu" }}></div>
        </MenuItem>
      );
    });
  }
  return <Menu>{renderItems()}</Menu>;
}

export default ToolMenu;
