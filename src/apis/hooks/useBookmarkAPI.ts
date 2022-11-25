import { addToBookmark, removeFromBookmark } from "apis/bookmark";
import { useMutation } from "react-query";

interface UseBookmarkAPIProps {
  onMutate(): void;
  onError(): void;
}

export const useBookmarkAPI = ({ onMutate, onError }: UseBookmarkAPIProps) => {
  const { mutate: addMutation } = useMutation(
    (itemId: string) => addToBookmark(itemId),
    {
      onMutate,
      onError,
    }
  );
  const { mutate: removeMutation } = useMutation(
    (itemId: string) => removeFromBookmark(itemId),
    {
      onMutate,
      onError,
    }
  );

  return { addMutation, removeMutation };
};
