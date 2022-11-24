import { colors } from "assets";
import styled from "styled-components";

interface LinerStyledProps {
  text: string;
  width?: string;
  onClick(): void;
}

export const LinerStyled = ({ text, width, onClick }: LinerStyledProps) => {
  return (
    <Button width={width} onClick={onClick}>
      {text}
    </Button>
  );
};

const Button = styled.button<{ width?: string }>`
  width: ${({ width }) => width || "69px"};
  height: 42px;
  border-radius: 10px;
  border: 1px solid white;
  background-color: ${colors("liner50")};
  transition: 400ms all;

  font-size: 14px;
  font-weight: 700;
  color: white;

  &:hover {
    color: ${colors("liner50")};
    border: 1px solid ${colors("liner50")};
    background-color: white;
  }
`;
