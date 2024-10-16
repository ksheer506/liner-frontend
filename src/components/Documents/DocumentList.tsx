/* eslint-disable react-hooks/exhaustive-deps */
import { useDocumentsAPI } from "apis";
import { colors, SEARCH_PAGE_HEADER_HEIGHT } from "assets";
import { NoResult } from "components/NoResult/NoResult";
import { ContentItemSkeleton } from "components/Skeleton/ContentItemSkeleton";
import { SEARCH_PARAM } from "constant";
import {
  useGetQueryParam,
  useInfiniteScroll,
  useScrollRestoration,
  useScrollTo,
} from "hooks";
import { useEffect } from "react";
import styled from "styled-components";
import { DocumentItemType } from "types";
import { DocumentItem } from "./DocumentItem";

const concatDummyDataOnFetch = <T,>(
  data: (T | number)[] = [],
  itemsPerPage: number,
  isFetching: boolean,
  isError: boolean
) => {
  // 로딩중임을 알려줄 Skeleton을 보여주기 위해 더미 배열 덧붙임
  const dummyArr = Array(itemsPerPage)
    .fill(0)
    .map((_, i) => data.length + i);

  if (!isFetching && !isError) return data;

  // 1. 컴포넌트가 마운트될 때(result === undefined), 2. API 응답을 기다릴 때, 로딩중 Skeleton을 덧붙임
  return data.concat(dummyArr);
};

const mapItemsWithSkeleton = (data: (DocumentItemType | number)[] = []) => {
  return data.map((e) => {
    if (typeof e !== "number") {
      const { title, url, imageUrl, faviconUrl, isSaved, id } = e;

      return (
        <DocumentItem
          title={title}
          url={url}
          mainImage={imageUrl}
          faviconImage={faviconUrl}
          isBookmarked={isSaved}
          id={id}
          key={id}
        />
      );
    }

    return <ContentItemSkeleton key={e} />;
  });
};

export const DocumentList = () => {
  const keyword = useGetQueryParam(SEARCH_PARAM);
  const {
    data,
    size,
    setSize,
    fetchNextPage,
    isFetching,
    isError,
    isEndOfResult,
    hasNoResult,
  } = useDocumentsAPI(keyword);
  const { bottomRef } = useInfiniteScroll({ onIntersecting: fetchNextPage });

  useScrollTo(0, [keyword]);
  const [recordY] = useScrollRestoration({
    storageKey: "search",
    beforeScroll: () => setSize(20),
  });

  const dataWithDummy = concatDummyDataOnFetch(data, size, isFetching, isError);
  console.log(dataWithDummy);
  return (
    <section onClickCapture={() => recordY()}>
      <ResultList>{mapItemsWithSkeleton(dataWithDummy)}</ResultList>
      {isEndOfResult && <DeadEnd>더이상 결과가 없습니다.</DeadEnd>}
      {hasNoResult && <NoResult />}
      <div ref={bottomRef} />
    </section>
  );
};

const ResultList = styled.ul`
  margin: 0;
  overflow: scroll;
  padding-top: calc(${SEARCH_PAGE_HEADER_HEIGHT} + 10px);
`;

const DeadEnd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;

  color: ${colors("gray35")};
  font-weight: 700;
  font-size: 14px;
`;
