import { useEffect, useRef } from "react";

export const useOutsideClick = (callback: (e: MouseEvent) => void) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current !== null && !ref.current.contains(event.target as Node))
        callback(event);
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return ref;
};
