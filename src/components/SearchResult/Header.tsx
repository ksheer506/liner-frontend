import { colors, SEARCH_PAGE_HEADER_HEIGHT } from "assets";
import { PreviousButton } from "components/Buttons";
import { SearchBarWithSearch } from "components/SearchBar/SearchBar";
import styled from "styled-components";

interface HeaderProps {
  keyword?: string;
}

export const Header = ({ keyword }: HeaderProps) => {
  return (
    <HeaderBox>
      <PreviousButton />
      <StyledSearch initialValue={keyword} />
    </HeaderBox>
  );
};

const HeaderBox = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  z-index: 2;

  padding: 0px 40px;
  gap: 18px;

  width: 110%;
  height: ${SEARCH_PAGE_HEADER_HEIGHT};
  background-color: white;
  box-shadow: 0px 0px 4px ${colors("gray30")};
`;

const StyledSearch = styled(SearchBarWithSearch)`
  width: 644px;
`;
