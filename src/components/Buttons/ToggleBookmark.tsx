/* eslint-disable react-hooks/exhaustive-deps */
import { addToBookmark, removeFromBookmark, useBookmarkAPI } from "apis";
import { colors } from "assets";
import { useModal } from "components/Modal";
import { Error } from "components/Modal/ModalContent/Error";
import { useToggleButton } from "hooks";
import { ComponentType, ReactNode, useCallback } from "react";
import { useMutation } from "react-query";
import styled, { css } from "styled-components";
import { ReactComponent as IcBookmark } from "../../assets/images/ic_bookmark.svg";
import { ReactComponent as IcBookmarked } from "../../assets/images/ic_bookmarked.svg";

/* interface Bookmark {
  isBookmarked: boolean;
}

interface ToggleBookmarkExternalProps extends Bookmark {
  itemId: string;
  onClick?(itemId: string): void;
}

interface WithBookmarkAPIProps {
  children: ReactNode;
} */

/* const withBookmarkAPI =
  <P extends Bookmark>(Component: ComponentType<P & WithBookmarkAPIProps>) =>
  (props: P) => {
    const { isBookmarked } = props;
    const { state: bookmarked, toggle: toggleBookmark } =
      useToggleButton(isBookmarked);
    const { openModal } = useModal();

    const onMutate = useCallback(() => {
      toggleBookmark();
    }, []);
    const onError = useCallback(() => {
      openModal(<Error />);
    }, []);

    const { addMutation, removeMutation } = useBookmarkAPI({
      onMutate,
      onError,
    });

    if (bookmarked) {
      return (
        <Component
          {...props}
          onClick={(itemId: string) => removeMutation(itemId)}
          isBookmarked={bookmarked}
        >
          <Bookmarked />
        </Component>
      );
    }

    return (
      <Component
        {...props}
        onClick={(itemId: string) => addMutation(itemId)}
        isBookmarked={bookmarked}
      >
        <UnBookmarked />
      </Component>
    );
  };

const ToggleBookmark = ({ itemId, onClick, children }: ToggleBookmarkProps) => {
  return <Button onClick={() => onClick?.(itemId)}>{children}</Button>;
}; */

interface ToggleBookmarkProps {
  itemId: string;
  onClick?(itemId: string): void;
  isBookmarked: boolean;
}

export const ToggleBookmark = ({
  itemId,
  isBookmarked,
}: ToggleBookmarkProps) => {
  const { openModal } = useModal();
  const { state: bookmarked, toggle } = useToggleButton(isBookmarked);
  const { addMutation, removeMutation } = useBookmarkAPI({
    onMutate: () => toggle(),
    onError: () => openModal(<Error />),
  });

  const handleClick = () => {
    if (!bookmarked) {
      addMutation(itemId);
      return;
    }

    removeMutation(itemId);
  };

  return (
    <Button onClick={handleClick}>
      {bookmarked ? <Bookmarked /> : <UnBookmarked />}
    </Button>
  );
};

/* export const ToggleBookmarkWithBookmarkAPI = withBookmarkAPI(ToggleBookmark); */

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
