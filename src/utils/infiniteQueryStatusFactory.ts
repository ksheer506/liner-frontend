interface QueryStatus {
  isFetching: boolean;
  isError: boolean;
  hasNextPage: boolean | undefined;
}

export const infiniteQueryStatusFactory = (
  dataLength: number | undefined,
  queryStatus: QueryStatus
) => {
  const { isFetching, isError, hasNextPage } = queryStatus;
  const L = dataLength || 0;

  if (isFetching) return "fetching";
  if (isError) return "error";
  if (!hasNextPage && L > 0) return "endOfResult";
  if (L <= 0) return "noResult";

  return "success";
};
