/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from "assets";
import { useToggleButton } from "hooks";
import { ReactNode, RefObject, useCallback } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as IcDelete } from "../../assets/images/ic_delete.svg";

interface DeleteInputProps {
  targetRef: RefObject<HTMLInputElement | HTMLTextAreaElement>;
  isShown?: boolean;
  icon?: ReactNode;
  className?: string;
  onDelete?(): void;
  position?: { top: string; left: string } | { bottom: string; right: string };
}
export const DeleteInput = ({
  targetRef,
  icon,
  isShown = true,
  onDelete,
  position,
}: DeleteInputProps) => {
  const { hideButton } = useToggleButton();

  const handleClick = useCallback(() => {
    if (!targetRef.current) return;

    targetRef.current.value = "";
    hideButton();
    onDelete?.();
  }, [targetRef, onDelete]);

  return (
    <DeleteButton onClick={handleClick} disabled={!isShown} position={position}>
      {isShown && (icon || <DefaultIcon />)}
    </DeleteButton>
  );
};

const DeleteButton = styled.button<Pick<DeleteInputProps, "position">>`
  position: relative;
  top: 50%;
  transform: translate(0, -50%);

  ${({ position }) => {
    if (!position) return;
    if ("top" in position) {
      return css`
        position: absolute;
        top: ${position.top};
        left: ${position.left};
      `;
    }
    if ("bottom" in position) {
      return css`
        position: absolute;
        bottom: ${position.bottom};
        right: ${position.right};
      `;
    }
  }}
`;

const DefaultIcon = styled(IcDelete)`
  & > path {
    fill: ${colors("gray35")};
    transition: 400ms all;
  }

  ${DeleteButton}:hover & > path {
    fill: ${colors("gray30")};
  }
`;
