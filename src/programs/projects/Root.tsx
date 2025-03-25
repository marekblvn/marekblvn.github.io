import styled from "styled-components";
import ProgramShortcut from "../../components/program-shortcut/ProgramShortcut";
import { MouseEvent } from "react";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px 0 0;
`;

interface RootProps {
  readonly items?: Array<Record<string, any>>;
  readonly onDoubleClickShortcut?: (
    event: MouseEvent,
    newAddress: string
  ) => void;
}

function Root({ items = [], onDoubleClickShortcut = () => {} }: RootProps) {
  function handleDoubleClick(event: MouseEvent, name: string) {
    onDoubleClickShortcut(event, name);
  }
  return (
    <Layout>
      {items.map((item) => {
        const { name, id } = item;
        return (
          <ProgramShortcut
            label={name}
            key={id}
            icon="folder"
            color="#000"
            onDoubleClick={(event) => handleDoubleClick(event, name)}
          />
        );
      })}
    </Layout>
  );
}

export default Root;
