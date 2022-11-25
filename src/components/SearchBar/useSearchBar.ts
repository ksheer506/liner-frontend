/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router";

export const useSearchBar = (
  path: string,
  searchParam: string,
  onSearch?: (value: string) => void
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const navigate = useNavigate();

  const handleIsEmpty = useCallback((value: string | undefined) => {
    const isInputEmpty = value === "";

    if (isInputEmpty) {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);
  }, []);

  const handleSearch = useCallback(
    ({ currentTarget, key }: KeyboardEvent<HTMLInputElement>) => {
      if (!(currentTarget instanceof Element)) return;
      if (key !== "Enter") return;

      const searchKeyword = currentTarget.value;
      
      onSearch?.(searchKeyword);
      navigate(`${path}?${searchParam}=${searchKeyword}`);
    },
    [path, searchParam]
  );

  const handleDelete = useCallback(() => {
    setIsEmpty(true);
  }, []);

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      handleIsEmpty(target.value);
    },
    [isEmpty]
  );

  useEffect(() => {
    handleIsEmpty(inputRef.current?.value);
  }, []);

  return { inputRef, isEmpty, handleSearch, handleDelete, handleChange };
};
