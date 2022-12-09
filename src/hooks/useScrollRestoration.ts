/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { useScrollTo } from "./useScrollTo";

interface ScrollRestorationProps {
  storageKey: string;
  beforeScroll?(positionY: number): void;
}

export const useScrollRestoration = ({
  storageKey,
  beforeScroll,
}: ScrollRestorationProps) => {
  const [setScrollY] = useScrollTo(0, [storageKey]);

  useEffect(() => {
    const positionY: number = JSON.parse(
      sessionStorage.getItem(`scrollY@${storageKey}`) || "0"
    );

    beforeScroll?.(positionY);
    setScrollY(positionY);
    /* console.log(positionY); */
    /* window.scrollTo({ top: positionY }); */
  }, [storageKey, beforeScroll]);

  const recordScrollY = useCallback(() => {
    sessionStorage.setItem(
      `scrollY@${storageKey}`,
      JSON.stringify(window.scrollY)
    );
  }, [storageKey]);

  return [recordScrollY];
};
