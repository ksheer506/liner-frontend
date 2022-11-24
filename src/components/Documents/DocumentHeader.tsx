import { colors, SEARCH_PAGE_HEADER_HEIGHT } from "assets";
import { PreviousButton } from "components/Buttons";
import { SearchBarWithSearch } from "components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

export const DocumentHeader = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

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
  position: fixed;

  padding: 0px 40px;
  gap: 18px;

  width: 768px;
  height: ${SEARCH_PAGE_HEADER_HEIGHT};
  background-color: white;
  border-bottom: 1px solid ${colors("gray20")};
`;

const StyledSearch = styled(SearchBarWithSearch)`
  width: 644px;
`;
