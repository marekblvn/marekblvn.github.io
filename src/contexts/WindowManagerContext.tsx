import { createContext, Dispatch } from "react";
import {
  WindowManagerAction,
  WindowManagerState,
} from "../reducers/windowManagerReducer";

export const WindowManagerContext = createContext<
  | { state: WindowManagerState; dispatch: Dispatch<WindowManagerAction> }
  | undefined
>(undefined);
