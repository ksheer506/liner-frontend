/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from "assets";
import styled from "styled-components";
import { ReactComponent as IcSearch } from "../../assets/images/search.svg";

import { KeyboardEvent, useCallback } from "react";
import { forwardRef } from "react";
import { useRef } from "react";
import { ComponentType } from "react";
import { useNavigate } from "react-router";
import { DeleteButton } from "components/Buttons";

interface WithSearch {
  onSearch(e: KeyboardEvent<HTMLInputElement>): void;
  onDelete(): void;
}

type SearchBarProps = WithSearch & {
  initialValue?: string;
  className?: string;
};

const withSearch =
  <P extends object>(Component: ComponentType<P & WithSearch>) =>
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

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ initialValue, onSearch, onDelete, className }, ref) => {
    return (
      <Box className={className}>
        <Input
          defaultValue={initialValue}
          placeholder="Search keyword"
          ref={ref}
          onKeyUp={onSearch}
        />
        <IconSearch />
        <DeleteButton onDelete={onDelete} />
      </Box>
    );
  }
);

export const SearchBarWithSearch = withSearch(SearchBar);

const Box = styled.div`
  position: relative;
  width: 560px;
  height: 48px;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: 2px solid ${colors("gray30")};
  border-radius: 1000px;
  padding-left: 57px;
  color: ${colors("gray50")};
  caret-color: ${colors("liner50")};
  outline: 0;
  transition: 400ms all;

  &::placeholder {
    font-size: 16px;
    color: ${colors("gray30")};
  }

  &:hover,
  &:focus {
    border: 2px solid ${colors("liner50")};
  }
`;

const IconSearch = styled(IcSearch)`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translate(0, -50%);

  & > path {
    transition: 400ms all;
  }

  ${Input}:is(:hover,:focus) ~ & > path {
    fill: ${colors("liner50")};
  } ;
`;
