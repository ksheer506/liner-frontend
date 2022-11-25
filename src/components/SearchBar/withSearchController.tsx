/* eslint-disable react-hooks/exhaustive-deps */
import { useToggleButton } from "hooks";
import {
  ChangeEvent,
  ComponentType,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router";

export interface WithSearchController {
  showDelete?: boolean;
  onSearch(e: KeyboardEvent<HTMLInputElement>): void;
  onDelete(): void;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

export const withSearchController =
  <P extends object>(Component: ComponentType<P & WithSearchController>) =>
  (props: P) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { state: isShown, hideButton, toggleOnCondition } = useToggleButton();

    const handleSearch = useCallback(
      ({ currentTarget, key }: KeyboardEvent<HTMLInputElement>) => {
        if (!(currentTarget instanceof Element)) return;
        if (key !== "Enter") return;

        navigate(`/search?keyword=${currentTarget.value}`);
      },
      []
    );

    const handleDelete = useCallback(() => {
      const input = inputRef.current;

      if (!input) return;

      input.value = "";
      hideButton();
    }, []);

    const handleChange = useCallback(
      ({ target }: ChangeEvent<HTMLInputElement>) => {
        toggleOnCondition(target.value);
      },
      []
    );

    useEffect(() => {
      toggleOnCondition(inputRef.current?.value);
    }, []);

    return (
      <Component
        onSearch={handleSearch}
        onDelete={handleDelete}
        onChange={handleChange}
        showDelete={isShown}
        ref={inputRef}
        {...props}
      />
    );
  };
