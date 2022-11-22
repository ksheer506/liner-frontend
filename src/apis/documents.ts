import { DocumentsResponse } from "types/documents";
import { axiosInstance } from "utils";

interface queryDocumentsPayload {
  keyword: string;
  size: number;
  from: number | null;
}

export const searchDocuments = async ({
  keyword,
  size,
  from,
}: queryDocumentsPayload) => {
  const { data } = await axiosInstance.get<DocumentsResponse>(
    `/search/documents?query=${keyword}&size=${size}&from=${from}`
  );

  console.log(data);

  return { ...data };
};
