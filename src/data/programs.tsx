import { ReactElement } from "react";
import Projects from "../programs/projects";
import GameOfLife from "../programs/game-of-life";
import LangtonsAnt from "../programs/langtons-ant";
import { v4 as uuidv4 } from "uuid";
import { WindowControlIconCode } from "../components/window-control-button/WindowControlButton";

export interface Program {
  label: string;
  icon: string;
  component: ReactElement;
  code: string;
  controls: Array<WindowControlIconCode>;
  fullScreenOnly: boolean;
  resizable: boolean;
}

export default [
  {
    label: "Projects",
    icon: "folder",
    component: <Projects />,
    code: uuidv4(),
    controls: ["minimize", "maximize", "close"],
    fullScreenOnly: false,
    resizable: true,
  },
  {
    label: "Game of Life",
    icon: "executable",
    component: <GameOfLife />,
    code: uuidv4(),
    controls: ["minimize", "close"],
    fullScreenOnly: true,
    resizable: false,
  },
  {
    label: "Langton's Ant",
    icon: "executable",
    component: <LangtonsAnt />,
    controls: ["minimize", "close"],
    code: uuidv4(),
    fullScreenOnly: true,
    resizable: false,
  },
] as Array<Program>;
