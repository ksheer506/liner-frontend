import { addToBookmark, removeFromBookmark } from "apis";
import { colors } from "assets";
import { queryClient } from "index";
import { ComponentType, useState } from "react";
import { useMutation } from "react-query";
import styled, { css } from "styled-components";
import { ReactComponent as IcBookmark } from "../../assets/images/ic_bookmark.svg";
import { ReactComponent as IcBookmarked } from "../../assets/images/ic_bookmarked.svg";

interface ToggleBookmarkProps {
  itemId: string;
  isBookmarked: boolean;
  onClick?(itemId: string): void;
}

type Bookmark = Omit<ToggleBookmarkProps, "onClick">;

const withBookmarkAPI =
  <P extends Bookmark>(Component: ComponentType<P>) =>
  (props: P) => {
    const { isBookmarked } = props;
    const { mutate: addMutation } = useMutation(
      (itemId: string) => addToBookmark(itemId),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["documents"]);
        },
      }
    );
    const { mutate: removeMutation } = useMutation(
      (itemId: string) => removeFromBookmark(itemId),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["documents"]);
        },
      }
    );

    if (isBookmarked) {
      return (
        <Component
          onClick={(itemId: string) => removeMutation(itemId)}
          {...props}
        />
      );
    }

    return (
      <Component onClick={(itemId: string) => addMutation(itemId)} {...props} />
    );
  };

const ToggleBookmark = ({
  itemId,
  isBookmarked,
  onClick,
}: ToggleBookmarkProps) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleClick = () => {
    onClick?.(itemId);
    setBookmarked((prev) => !prev);
  };

  return (
    <Button onClick={handleClick}>
      {bookmarked ? <Bookmarked /> : <UnBookmarked />}
    </Button>
  );
};

export const ToggleBookmarkWithBookmarkAPI = withBookmarkAPI(ToggleBookmark);

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  transition: 400ms all;

  &:hover {
    background-color: ${colors("gray20")};
  }
`;

const defaultBookmark = css`
  width: 100%;
  height: 100%;
  padding: 7px;
`;

const Bookmarked = styled(IcBookmarked)`
  ${defaultBookmark}
`;

const UnBookmarked = styled(IcBookmark)`
  ${defaultBookmark}

  & > path {
    transition: 400ms all;
  }

  &:hover path {
    fill: ${colors("liner50")};
  }
`;
