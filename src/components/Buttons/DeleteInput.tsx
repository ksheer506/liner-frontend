import { colors } from "assets";
import styled from "styled-components";
import { ReactComponent as IcDelete } from "../../assets/images/ic_delete.svg";

interface DeleteInputProps {
  onDelete(): void;
}
export const DeleteInput = ({ onDelete }: DeleteInputProps) => {
  return (
    <DeleteButton onClick={onDelete}>
      <IconDelete />
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
