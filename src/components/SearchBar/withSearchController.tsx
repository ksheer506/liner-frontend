/* eslint-disable react-hooks/exhaustive-deps */
import { ComponentType, KeyboardEvent, useCallback, useRef } from "react";
import { useNavigate } from "react-router";

export interface WithSearchController {
  onSearch(e: KeyboardEvent<HTMLInputElement>): void;
  onDelete(): void;
}

export const withSearchController =
  <P extends object>(Component: ComponentType<P & WithSearchController>) =>
  (props: P) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSearch = useCallback(
      ({ currentTarget, key }: KeyboardEvent<HTMLInputElement>) => {
        if (!(currentTarget instanceof Element)) return;
        if (key !== "Enter") return;

        navigate(`/search?keyword=${currentTarget.value}`);
      },
      []
    );

    const handleDelete = useCallback(() => {
      if (!inputRef.current) return;

      inputRef.current.value = "";
    }, []);

    return (
      <Component
        onSearch={handleSearch}
        onDelete={handleDelete}
        ref={inputRef}
        {...props}
      />
    );
  };