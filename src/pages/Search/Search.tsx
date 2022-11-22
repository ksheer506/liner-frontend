import { ContentItem, SearchPageHeader } from "components";
import styled from "styled-components";

export const Search = () => {
  return (
    <>
      <SearchPageHeader />
      <ResultList />
      <ContentItem
        title="The Pitfalls of Using Google Ngram to Study Language | The Pitfalls of Using Google Ngram to Study Language Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
        url="https://www.naver.com"
        isBookmarked
      />
    </>
  );
};

const ResultList = styled.ul``;
