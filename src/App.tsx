import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Taskbar from "./components/taskbar/Taskbar";
import ProgramShortcut from "./components/program-shortcut/ProgramShortcut";
import programs, { Program } from "./data/programs";
import { useWindowManager } from "./hooks/useWindowManager";
import { WindowData } from "./reducers/windowManagerReducer";
import Window from "./components/window/Window";
import { MouseEvent } from "react";

const Page = styled.div`
  display: grid;
  grid-template-rows: auto 31px;
  height: 100%;
`;

const Desktop = styled.div`
  width: calc(100% - 16px);
  height: 100%;
  margin: 16px 8px;
  display: grid;
  grid-gap: 2px;
  grid-template-columns: repeat(auto-fill, 75px);
  grid-template-rows: repeat(auto-fill, 75px);
  grid-auto-flow: column;
`;

function App() {
  const { state, dispatch } = useWindowManager();

  const handleDoubleClickProgramShortcut = (
    _: MouseEvent,
    program: Program
  ) => {
    if (
      !state.openedWindows.some((win: WindowData) => win.code === program.code)
    ) {
      dispatch({
        type: "OPEN_WINDOW",
        payload: {
          title: program.label,
          code: program.code,
          icon: program.icon,
          content: program.component,
        },
      });
      return;
    }
    dispatch({ type: "FOCUS_WINDOW", payload: program.code });
  };

  const handleCloseWindow = (_: MouseEvent, code: string) => {
    dispatch({ type: "CLOSE_WINDOW", payload: code });
  };

  return (
    <Page>
      <Desktop>
        {programs.map((prog) => {
          return (
            <ProgramShortcut
              key={uuidv4()}
              label={prog.label}
              icon={prog.icon}
              onDoubleClick={(e) => handleDoubleClickProgramShortcut(e, prog)}
            />
          );
        })}
      </Desktop>
      <Taskbar />
      {state.openedWindows.map((win) => {
        const { title, icon, code, content, initialPosition } = win;
        return (
          <Window
            key={code}
            title={title}
            icon={icon}
            initialPosition={initialPosition}
            code={code}
            controls={["minimize", "maximize", "close"]}
            onClose={(e) => handleCloseWindow(e, code)}
          >
            {content}
          </Window>
        );
      })}
    </Page>
  );
}

export default App;
