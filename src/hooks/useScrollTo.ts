/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, useEffect, useState } from "react";

export const useScrollTo = (positionY: number, deps: DependencyList = []) => {
  const [Y, setY] = useState(positionY);

  useEffect(() => {
    console.log(Y);
    window.scrollTo({ top: Y });
  }, [...deps, Y]);

  return [setY];
};
