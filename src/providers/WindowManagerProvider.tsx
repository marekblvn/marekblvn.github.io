import { FunctionComponent, ReactNode, useMemo, useReducer } from "react";
import {
  windowManagerReducer,
  WindowManagerState,
} from "../reducers/windowManagerReducer";
import { WindowManagerContext } from "../contexts/WindowManagerContext";

const initialState: WindowManagerState = { openedWindows: [] };

const WindowManagerProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(windowManagerReducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <WindowManagerContext.Provider value={contextValue}>
      {children}
    </WindowManagerContext.Provider>
  );
};

export default WindowManagerProvider;
