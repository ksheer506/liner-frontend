import { colors } from "assets";
import styled from "styled-components";
import { ReactComponent as IcDelete } from "../../assets/images/delete.svg";

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
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, 0);
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
