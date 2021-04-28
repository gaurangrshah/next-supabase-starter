import { useCallback, useMemo, useRef } from "react";

// unused
export const useFocus = () => {
  const htmlElRef = useRef(null);

  const setFocus = useCallback(() => {
    if (!htmlElRef.current) return;

    htmlElRef.current.focus();
  }, [htmlElRef]);

  return useMemo(() => [htmlElRef, setFocus], [htmlElRef, setFocus]);
};
