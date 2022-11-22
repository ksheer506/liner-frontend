import { addToBookmark, removeFromBookmark } from "apis";
import { colors } from "assets";
import { useMutation } from "react-query";
import styled from "styled-components";
import { ReactComponent as IcBookmark } from "../../assets/images/ic_bookmark.svg";

interface ToggleBookmarkProps {
  isBookmarked: boolean;
}

const toggleRequest = (isBookmarked: boolean) => {
  if (isBookmarked) return removeFromBookmark;

  return addToBookmark;
};

export const ToggleBookmark = ({ isBookmarked }: ToggleBookmarkProps) => {
  const { mutate } = useMutation(toggleRequest(isBookmarked));
  return (
    <button onClick={() => mutate("a787c36f-586c-3551-8d2f-7efab493c2fc")}>
      <BookmarkIcon />
    </button>
  );
};

const BookmarkIcon = styled(IcBookmark)`
  & > path {
    transition: 400ms all;
  }

  &:hover > path {
    fill: ${colors("liner50")};
  }
`;
