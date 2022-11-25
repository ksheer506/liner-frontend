/* eslint-disable react-hooks/exhaustive-deps */
import { useBookmarkAPI } from "apis";
import { colors } from "assets";
import { useModal } from "components/Modal";
import { Error } from "components/Modal/ModalContent/Error";
import { useToggleButton } from "hooks";
import styled, { css } from "styled-components";
import { ReactComponent as IcBookmark } from "../../assets/images/ic_bookmark.svg";
import { ReactComponent as IcBookmarked } from "../../assets/images/ic_bookmarked.svg";

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
