import { addToBookmark, removeFromBookmark } from "apis";
import { colors } from "assets";
import { useModal } from "components/Modal";
import { Error } from "components/Modal/ModalContent/Error";
import { useToggleButton } from "hooks";
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
    const {
      state: bookmarked,
      showButton: bookmark,
      hideButton: unBookmark,
    } = useToggleButton(isBookmarked);
    const { openModal } = useModal();
    const { mutate: addMutation } = useMutation(
      (itemId: string) => addToBookmark(itemId),
      {
        onSuccess: () => {
          bookmark();
        },
        onError: () => {
          openModal(<Error />);
        },
      }
    );
    const { mutate: removeMutation } = useMutation(
      (itemId: string) => removeFromBookmark(itemId),
      {
        onSuccess: () => {
          unBookmark();
        },
        onError: () => {
          openModal(<div>Something went wrong</div>);
        },
      }
    );

    if (bookmarked) {
      return (
        <Component
          {...props}
          onClick={(itemId: string) => removeMutation(itemId)}
          isBookmarked={bookmarked}
        />
      );
    }

    return (
      <Component
        {...props}
        onClick={(itemId: string) => addMutation(itemId)}
        isBookmarked={bookmarked}
      />
    );
  };

const ToggleBookmark = ({
  itemId,
  isBookmarked,
  onClick,
}: ToggleBookmarkProps) => {
  return (
    <Button onClick={() => onClick?.(itemId)}>
      {isBookmarked ? <Bookmarked /> : <UnBookmarked />}
    </Button>
  );
};

export const ToggleBookmarkWithBookmarkAPI = withBookmarkAPI(ToggleBookmark);

const Button = styled.button`
  flex: 0 0 max-content;
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
