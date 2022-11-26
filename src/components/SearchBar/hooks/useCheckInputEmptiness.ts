/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useCallback, useEffect, useState } from "react";

export const useCheckInputEmptiness = (
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>
) => {
  const [isEmpty, setIsEmpty] = useState(true);

  const handleIsEmpty = useCallback((value: string | undefined) => {
    const isInputEmpty = value === "";

    if (isInputEmpty) {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);
  }, []);

  const handleDelete = useCallback(() => {
    setIsEmpty(true);
  }, []);

  useEffect(() => {
    handleIsEmpty(inputRef.current?.value);
  }, []);

  return { isEmpty, handleIsEmpty, handleDelete };
};;