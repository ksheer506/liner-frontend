/* eslint-disable react-hooks/exhaustive-deps */
import { searchDocuments } from "apis";
import { SEARCH_PAGE_HEADER_HEIGHT } from "assets";
import { ContentItemSkeleton } from "components/Skeleton/ContentItemSkeleton";
import { useInfiniteScroll } from "hooks";
import { useCallback, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { DocumentItemType } from "types";
import { DocumentItem } from "./DocumentItem";

const filterDuplicatedItems = <T,>(data: T[] = []) => {
  return [...new Set(data)];
};

const matchDataToStatus = <T,>(
  data: T[] = [],
  isFetching: boolean,
  itemsPerPage: number
) => {
  // 로딩중임을 알려줄 Skeleton을 보여주기 위해 더미 배열 덧붙임
  const dummyArr = Array(itemsPerPage)
    .fill(0)
    .map((_, i) => data.length + i);
  const result: (T | number)[] = data;

  if (!isFetching) return result;

  // 1. 컴포넌트가 마운트될 때(result === undefined), 2. API 응답을 기다릴 때, 로딩중 Skeleton을 덧붙임
  return result.concat(dummyArr);
};

const mapContentItemsWithSkeleton = (
  data: (DocumentItemType | number)[] | undefined,
  isFetching: boolean,
  itemsPerPage: number
) => {
  const dataWithDummy = matchDataToStatus(data, isFetching, itemsPerPage);
  const filtered = filterDuplicatedItems(dataWithDummy);

  return filtered.map((e) => {
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
  const size = useRef(15);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const { data, isFetching, fetchNextPage } = useInfiniteQuery(
    ["documents", keyword],
    ({ pageParam = 0 }) =>
      searchDocuments({
        keyword,
        size: size.current,
        from: pageParam,
      }),
    {
      getNextPageParam: (data, allPages) => {
        const nextFrom = allPages.length * size.current;

        if (data.isLast) {
          return undefined;
        }

        return nextFrom;
      },
      select: (data) => {
        const transformedPages = data.pages
          .map(({ documents }) => documents)
          .flat();

        return { ...data, pages: transformedPages };
      },
      staleTime: 1 * 60 * 1000,
    }
  );
  const onIntersecting = useCallback(() => {
    fetchNextPage();
  }, []);
  const { bottomRef } = useInfiniteScroll({ onIntersecting });

  const { pages } = data || {};

  return (
    <>
      <ResultList>
        <>
          {mapContentItemsWithSkeleton(pages, isFetching, size.current)}
          {!isFetching && !pages?.length && <div>검색 결과가 없습니다.</div>}
        </>
      </ResultList>
      <div ref={bottomRef} />
    </>
  );
};

const ResultList = styled.ul`
  margin-top: 0;
  overflow: scroll;
  /* height: calc(100% - ${SEARCH_PAGE_HEADER_HEIGHT}); */
`;
