import { ReactElement } from "react";

interface WindowData {
  code: string;
  title: string;
  content: ReactElement;
  lastPosition: { x: number; y: number };
  minimized: boolean;
}

interface WindowManagerState {
  openedWindow: WindowData[];
}
