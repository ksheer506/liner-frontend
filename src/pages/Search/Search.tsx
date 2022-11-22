import { SEARCH_PAGE_HEADER_HEIGHT } from "assets";
import { ContentItem, SearchPageHeader } from "components";
import styled from "styled-components";

export const Search = () => {
  return (
    <Box>
      <SearchPageHeader />
      <ResultList>
        {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((e, i) => (
          <ContentItem
            title="The Pitfalls of Using Google Ngram to Study Language | The Pitfalls of Using Google Ngram to Study Language Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
            url="https://www.naver.com"
            isBookmarked
            key={i}
          />
        ))}
      </ResultList>
    </Box>
  );
};

const Box = styled.div`
  height: 100vh;
  overflow: hidden;
`;

const ResultList = styled.ul`
  margin-top: 0;
  overflow: scroll;
  height: calc(100% - ${SEARCH_PAGE_HEADER_HEIGHT});
`;
