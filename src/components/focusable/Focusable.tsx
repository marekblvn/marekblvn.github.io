import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import { useWindowManager } from "../../hooks/useWindowManager";

interface IFocusable {
  readonly onFocus?: () => void;
  readonly children?: ReactNode;
  readonly code?: string;
}

const FocusableDiv = styled.div`
  width: 100%;
  height: 100%;
`;

function Focusable({
  onFocus = () => {},
  children = null,
  code = "",
}: IFocusable) {
  const { state, dispatch } = useWindowManager();
  const focusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        focusRef.current &&
        !focusRef.current.contains(event.target as Node) &&
        state.focusedWindowCode === code
      ) {
        dispatch({ type: "UNFOCUS_WINDOW", payload: null });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [state.focusedWindowCode, code, dispatch]);

  return (
    <FocusableDiv ref={focusRef} onClick={onFocus}>
      {children}
    </FocusableDiv>
  );
}

export default Focusable;
