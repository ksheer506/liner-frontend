/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from "assets";
import styled from "styled-components";
import { ReactComponent as IcSearch } from "../../assets/images/ic_search.svg";

import { forwardRef } from "react";
import { DeleteButton } from "components/Buttons";
import { withSearchController } from "./withSearchController";
import type { WithSearchController } from "./withSearchController";

type SearchBarProps = WithSearchController & {
  initialValue?: string;
  className?: string;
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

export const SearchBarWithSearch = withSearchController(SearchBar);

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
