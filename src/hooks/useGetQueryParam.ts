import { useSearchParams } from "react-router-dom";

export const useGetQueryParam = (queryParam: string) => {
  const [searchParams] = useSearchParams();

  return searchParams.get(queryParam) || "";
};
