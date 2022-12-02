/* eslint-disable react-hooks/exhaustive-deps */
import { documentsKeys, searchDocuments } from "apis";
import { useModal } from "components/Modal";
import { useCallback, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Error } from "components/Modal/ModalContent/Error";
import { filterDuplicatedItems, infiniteQueryStatusFactory } from "utils";

const getNextFrom = (isLast: boolean, size: number, allPages: unknown[]) => {
  const nextFrom = allPages.length * size;

  if (isLast) {
    return undefined;
  }

  return nextFrom;
};

export const useDocumentsAPI = (keyword: string, length: number = 15) => {
  const [size, setSize] = useState(length);
  const { openModal } = useModal();

  const { data, fetchNextPage, isFetching, isError, hasNextPage } =
    useInfiniteQuery(
      documentsKeys.list(keyword),
      ({ pageParam = 0 }) =>
        searchDocuments({
          keyword,
          size,
          from: pageParam,
        }),
      {
        getNextPageParam: ({ isLast }, allPages) =>
          getNextFrom(isLast, size, allPages),
        onError: () => {
          openModal(<Error />);
        },
        select: (data) => {
          const transformedPages = data.pages.flatMap(
            ({ documents }) => documents
          );
          const filtered = filterDuplicatedItems(transformedPages);

          return { ...data, pages: filtered };
        },
        staleTime: Infinity,
        cacheTime: 0,
        retry: 2,
      }
    );

  const fetchNextPageWhenAvailable = useCallback(() => {
    if (!hasNextPage) return;

    fetchNextPage();
  }, [hasNextPage]);

  const { pages } = data || {};

  const result = infiniteQueryStatusFactory(pages?.length, {
    isFetching,
    isError,
    hasNextPage,
  });
  const hasNoResult = result === "noResult";
  const isEndOfResult = result === "endOfResult";

  return {
    data: pages,
    isFetching,
    isError,
    isEndOfResult,
    hasNoResult,
    hasNextPage,
    fetchNextPage: fetchNextPageWhenAvailable,
    size,
    setSize,
  };
};
