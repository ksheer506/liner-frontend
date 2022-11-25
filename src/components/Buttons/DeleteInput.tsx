/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from "assets";
import { useToggleButton } from "hooks";
import { RefObject, useCallback } from "react";
import styled from "styled-components";
import { ReactComponent as IcDelete } from "../../assets/images/ic_delete.svg";

interface DeleteInputProps {
  targetRef: RefObject<HTMLInputElement | HTMLTextAreaElement>;
  isShown?: boolean;
  onDelete?(): void;
}
export const DeleteInput = ({
  targetRef,
  isShown = true,
  onDelete,
}: DeleteInputProps) => {
  const { hideButton } = useToggleButton();

  const handleClick = useCallback(() => {
    if (!targetRef.current) return;

    targetRef.current.value = "";
    hideButton();
    onDelete?.();
  }, [targetRef, onDelete]);

  return (
    <DeleteButton onClick={handleClick} disabled={!isShown}>
      {isShown && <IconDelete />}
    </DeleteButton>
  );
};

const DeleteButton = styled.button`
  position: absolute;
  top: 50%;
  right: 18px;
  transform: translate(0, -50%);
`;

const IconDelete = styled(IcDelete)`
  & > path {
    fill: ${colors("gray35")};
    transition: 400ms all;
  }

  ${DeleteButton}:hover & > path {
    fill: ${colors("gray30")};
  }
`;
