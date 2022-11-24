/* eslint-disable react-hooks/exhaustive-deps */
import { searchDocuments } from "apis";
import { colors, SEARCH_PAGE_HEADER_HEIGHT } from "assets";
import { useModal } from "components/Modal";
import { Error } from "components/Modal/ModalContent/Error";
import { ContentItemSkeleton } from "components/Skeleton/ContentItemSkeleton";
import { SEARCH_PARAM } from "constant";
import { useGetQueryParam, useInfiniteScroll } from "hooks";
import { useCallback, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import { DocumentItemType, Identified } from "types";
import { DocumentItem } from "./DocumentItem";

const filterDuplicatedItems = <T extends Identified>(data: T[] = []) => {
  const idMap = new Map(data.map(({ id }) => [id, 0]));

  return data.filter(({ id }) => {
    const firstAppearance = idMap.get(id) === 0;

    if (firstAppearance) {
      idMap.set(id, 1);

      return true;
    }
    return false;
  });
};

const matchDataToStatus = <T,>(
  data: (T | number)[] = [],
  isFetching: boolean,
  itemsPerPage: number
) => {
  // 로딩중임을 알려줄 Skeleton을 보여주기 위해 더미 배열 덧붙임
  const dummyArr = Array(itemsPerPage)
    .fill(0)
    .map((_, i) => data.length + i);

  if (!isFetching) return data;

  // 1. 컴포넌트가 마운트될 때(result === undefined), 2. API 응답을 기다릴 때, 로딩중 Skeleton을 덧붙임
  return data.concat(dummyArr);
};

const mapItemsWithSkeleton = (
  data: DocumentItemType[] | undefined,
  isFetching: boolean,
  itemsPerPage: number
) => {
  const filtered = filterDuplicatedItems(data);
  const dataWithDummy = matchDataToStatus(filtered, isFetching, itemsPerPage);

  return dataWithDummy.map((e) => {
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
  const keyword = useGetQueryParam(SEARCH_PARAM);
  const { openModal } = useModal();

  const { data, fetchNextPage, isFetching, isError, hasNextPage } =
    useInfiniteQuery(
      ["documents", keyword],
      ({ pageParam = 0 }) =>
        searchDocuments({
          keyword,
          size: size.current,
          from: pageParam,
        }),
      {
        getNextPageParam: ({ isLast }, allPages) => {
          const nextFrom = allPages.length * size.current;

          if (isLast) {
            return undefined;
          }

          return nextFrom;
        },
        onError: () => {
          openModal(<Error />);
        },
        select: (data) => {
          const transformedPages = data.pages
            .map(({ documents }) => documents)
            .flat();

          return { ...data, pages: transformedPages };
        },
        staleTime: Infinity,
        cacheTime: 0,
        retry: 2,
      }
    );
  const onIntersecting = useCallback(() => {
    if (!hasNextPage) return;

    fetchNextPage();
  }, [hasNextPage]);
  const { bottomRef } = useInfiniteScroll({ onIntersecting });

  const { pages } = data || {};
  /* console.log(pages, isError); */

  return (
    <section>
      <ResultList>
        {mapItemsWithSkeleton(pages, isFetching, size.current)}
      </ResultList>
      {!hasNextPage && !!pages?.length && (
        <DeadEnd>더이상 결과가 없습니다.</DeadEnd>
      )}
      {!isError && !pages?.length && <NoResult>검색 결과가 없습니다.</NoResult>}
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

const NoResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(95vh - ${SEARCH_PAGE_HEADER_HEIGHT});

  color: ${colors("gray35")};
  font-weight: 700;
  font-size: 22px;
`;
