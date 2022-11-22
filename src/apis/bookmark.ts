import { axiosInstance } from "utils";

export const addToBookmark = async (itemId: string) => {
const { data } = await axiosInstance.post(`/collection/document/${itemId}`);
};

export const removeFromBookmark = async (itemId: string) => {

};
