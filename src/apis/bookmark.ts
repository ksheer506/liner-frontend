import { axiosInstance } from "utils";

export const addToBookmark = async (itemId: string) => {
  const { data, status } = await axiosInstance.post<string>(
    `/collection/document/${itemId}`
  );

  return { data, status };
};

export const removeFromBookmark = async (itemId: string) => {
  const { data, status } = await axiosInstance.delete<string>(
    `/collection/document/${itemId}`
  );

  return { data, status };
};
