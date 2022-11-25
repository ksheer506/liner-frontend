/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from "assets";
import styled from "styled-components";
import { ReactComponent as IcSearch } from "../../assets/images/ic_search.svg";
import { DeleteButton } from "components/Buttons";
import { withSearchController } from "./withSearchController";
import { useSearchBar } from "./hooks/useSearchBar";

interface SearchBarProps {
  initialValue?: string;
  className?: string;
}

export const SearchBar = ({ initialValue, className }: SearchBarProps) => {
  const { inputRef, isShown, handleSearch, handleDelete, handleChange } =
    useSearchBar();
  // FIXME: isShown, handleDelete 분리하기

  return (
    <Box className={className}>
      <Input
        defaultValue={initialValue}
        placeholder="Search keyword"
        ref={inputRef}
        onKeyUp={handleSearch}
        onChange={handleChange}
      />
      <IconSearch />
      {isShown && <DeleteButton onDelete={handleDelete} />}
    </Box>
  );
};
export const SearchBarWithSearchController = withSearchController(SearchBar);

/* const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      initialValue,
      showDelete = false,
      onSearch,
      onChange,
      onDelete,
      className,
    },
    ref
  ) => {
    return (
      <Box className={className}>
        <Input
          defaultValue={initialValue}
          placeholder="Search keyword"
          ref={ref}
          onKeyUp={onSearch}
          onChange={onChange}
        />
        <IconSearch />
        {showDelete && <DeleteButton onDelete={onDelete} />}
      </Box>
    );
  }
);

export const SearchBarWithSearchController = withSearchController(SearchBar); */

const Box = styled.div`
  position: relative;
  width: 560px;
  height: 48px;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: 1px solid ${colors("gray35")};
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
    border: 1.5px solid ${colors("liner50")};
    padding-left: 56.5px;
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
