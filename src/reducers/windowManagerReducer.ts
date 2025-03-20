import { ReactElement } from "react";

export interface WindowData {
  code: string;
  title: string;
  icon: string;
  content: ReactElement;
  lastPosition: { x: number; y: number };
  minimized: boolean;
}

export interface WindowManagerState {
  openedWindows: Array<WindowData>;
}

export type WindowManagerAction =
  | { type: "OPEN_WINDOW"; payload: WindowData }
  | { type: "CLOSE_WINDOW"; payload: string };

export const windowManagerReducer = (
  state: WindowManagerState,
  action: WindowManagerAction
): WindowManagerState => {
  switch (action.type) {
    case "OPEN_WINDOW":
      return { openedWindows: [...state.openedWindows, action.payload] };

    case "CLOSE_WINDOW":
      return {
        openedWindows: state.openedWindows.filter(
          (_window) => _window.code !== action.payload
        ),
      };

    default:
      return state;
  }
};
