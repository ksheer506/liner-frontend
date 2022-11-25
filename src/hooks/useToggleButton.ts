/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";

export const useToggleButton = (initialState: boolean = false) => {
  const [state, setState] = useState(initialState);

  const showButton = useCallback(() => {
    setState(true);
  }, []);

  const hideButton = useCallback(() => {
    setState(false);
  }, []);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  const toggleOnCondition = useCallback((condition: unknown) => {
    if (Boolean(condition)) {
      showButton();
      return;
    }

    hideButton();
  }, []);

  return { state, showButton, hideButton, toggle, toggleOnCondition };
};
