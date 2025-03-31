import { ReactElement } from "react";
import { WindowControlIconCode } from "../components/window-control-button/WindowControlButton";

export interface WindowData {
  readonly code: string;
  readonly title: string;
  readonly icon: string;
  readonly content: ReactElement;
  readonly initialPosition: { x: number; y: number };
  readonly controls: Array<WindowControlIconCode>;
  minimized: boolean;
  readonly fullScreenOnly: boolean;
  readonly resizable: boolean;
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
        controls: Array<WindowControlIconCode>;
        fullScreenOnly: boolean;
        resizable: boolean;
      };
    };

export const windowManagerReducer = (
  state: WindowManagerState,
  action: WindowManagerAction
): WindowManagerState => {
  switch (action.type) {
    case "OPEN_WINDOW": {
      const {
        title,
        icon,
        code,
        content,
        controls,
        fullScreenOnly,
        resizable,
      } = action.payload;
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
        controls: controls,
        fullScreenOnly: fullScreenOnly,
        resizable: resizable,
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
