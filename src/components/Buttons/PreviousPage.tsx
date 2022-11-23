/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from "assets";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { ReactComponent as PrevArrow } from "../../assets/images/ic_arrow back.svg";


export const PreviousPage = () => {
  const navigate = useNavigate();

  const handlePrev = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <button onClick={handlePrev}>
      <Prev />
    </button>
  );
};

const Button = styled.button``;

const Prev = styled(PrevArrow)`
  width: 21px;

  & > path {
    fill: ${colors("gray50")};
  }
`;
