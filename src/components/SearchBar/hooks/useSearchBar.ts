/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, KeyboardEvent, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { useCheckInputEmptiness } from "./useCheckInputEmptiness";

export const useSearchBar = (
  path: string,
  searchParam: string,
  onSearch?: (value: string) => void
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isEmpty, handleIsEmpty, handleDelete } =
    useCheckInputEmptiness(inputRef);
  const navigate = useNavigate();

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

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      handleIsEmpty(target.value);
    },
    [isEmpty]
  );

  return { inputRef, isEmpty, handleSearch, handleDelete, handleChange };
};
