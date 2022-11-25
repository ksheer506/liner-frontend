import { documentsKeys, searchDocuments } from "apis";
import { useModal } from "components/Modal";
import { SEARCH_PARAM } from "constant";
import { useGetQueryParam } from "hooks";
import { useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { Error } from "components/Modal/ModalContent/Error";

export const useDocumentsAPI = () => {
  const size = useRef(15);
  const keyword = useGetQueryParam(SEARCH_PARAM);
  const { openModal } = useModal();

  const { data, fetchNextPage, isFetching, isError, hasNextPage } =
    useInfiniteQuery(
      documentsKeys.list(keyword),
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

  return {
    data,
    fetchNextPage,
    isFetching,
    isError,
    hasNextPage,
    size: size.current,
  };
};
