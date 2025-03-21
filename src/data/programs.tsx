import { ReactElement } from "react";
import Projects from "../programs/Projects";
import { v4 as uuidv4 } from "uuid";

export interface Program {
  label: string;
  icon: string;
  component: ReactElement;
  code: string;
}

export default [
  {
    label: "Projects",
    icon: "folder",
    component: <Projects />,
    code: uuidv4(),
  },
  {
    label: "Game of Life",
    icon: "executable",
    component: <Projects />,
    code: uuidv4(),
  },
  {
    label: "Langton's Ant",
    icon: "executable",
    component: <Projects />,
    code: uuidv4(),
  },
] as Array<Program>;
