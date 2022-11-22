import { colors } from "assets";
import { PreviousButton } from "components/Buttons";
import { SearchBarWithSearch } from "components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || undefined;

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

  padding: 0px 40px;
  gap: 18px;

  width: 110%;
  height: 80px;
  box-shadow: 0px 0px 4px ${colors("gray30")};
`;

const StyledSearch = styled(SearchBarWithSearch)`
  width: 644px;
`;
