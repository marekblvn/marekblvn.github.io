import { ReactElement } from "react";

export interface WindowData {
  code: string;
  title: string;
  icon: string;
  content: ReactElement;
  initialPosition: { x: number; y: number };
  minimized: boolean;
}

export interface WindowManagerState {
  openedWindows: Array<WindowData>;
  focusedWindowCode: string | null;
}

export type WindowManagerAction =
  | { type: "FOCUS_WINDOW"; payload: string }
  | { type: "UNFOCUS_WINDOW"; payload: null }
  | { type: "CLOSE_WINDOW"; payload: string }
  | { type: "MINIMIZE_WINDOW"; payload: string }
  | {
      type: "OPEN_WINDOW";
      payload: {
        title: string;
        icon: string;
        code: string;
        content: ReactElement;
      };
    };

export const windowManagerReducer = (
  state: WindowManagerState,
  action: WindowManagerAction
): WindowManagerState => {
  switch (action.type) {
    case "OPEN_WINDOW": {
      const { title, icon, code, content } = action.payload;
      const initialPosition = { x: 100, y: 100 };
      state.openedWindows.forEach(() => {
        initialPosition.x += 20;
        initialPosition.y += 20;
      });
      const newWindow: WindowData = {
        title: title,
        icon: icon,
        code: code,
        content: content,
        minimized: false,
        initialPosition: initialPosition,
      };
      return {
        openedWindows: [...state.openedWindows, newWindow],
        focusedWindowCode: code,
      };
    }

    case "FOCUS_WINDOW": {
      const index = state.openedWindows.findIndex(
        (win) => win.code === action.payload
      );
      const updatedWindows = [...state.openedWindows];
      if (index && updatedWindows[index]) {
        updatedWindows[index].minimized = false;
        return {
          openedWindows: updatedWindows,
          focusedWindowCode: action.payload,
        };
      }
      return {
        openedWindows: [...state.openedWindows],
        focusedWindowCode: action.payload,
      };
    }

    case "CLOSE_WINDOW":
      return {
        openedWindows: state.openedWindows.filter(
          (_window) => _window.code !== action.payload
        ),
        focusedWindowCode: null,
      };

    case "MINIMIZE_WINDOW": {
      const index = state.openedWindows.findIndex(
        (win) => win.code === action.payload
      );
      const updatedWindows = [...state.openedWindows];
      if (index && updatedWindows[index]) {
        updatedWindows[index].minimized = true;
        return {
          openedWindows: updatedWindows,
          focusedWindowCode: null,
        };
      }
      return {
        openedWindows: [...state.openedWindows],
        focusedWindowCode: null,
      };
    }

    case "UNFOCUS_WINDOW":
      return {
        openedWindows: [...state.openedWindows],
        focusedWindowCode: null,
      };

    default:
      return state;
  }
};
