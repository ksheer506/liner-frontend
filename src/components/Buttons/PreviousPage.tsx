/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from "assets";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { ReactComponent as PrevArrow } from "../../assets/images/ic_arrow back.svg";

interface PreviousPageProps {
  to?: string;
}

export const PreviousPage = ({ to = "/" }: PreviousPageProps) => {
  const navigate = useNavigate();

  const handlePrev = useCallback(() => {
    navigate(`${to}`);
  }, [to]);

  return (
    <Button onClick={handlePrev}>
      <Prev />
    </Button>
  );
};

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  transition: 400ms all;

  &:hover {
    background-color: ${colors("gray10")};
  }
`;

const Prev = styled(PrevArrow)`
  width: 21px;

  & > path {
    fill: ${colors("gray50")};
  }
`;
