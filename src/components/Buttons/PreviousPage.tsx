import { colors } from "assets";
import styled from "styled-components";
import { ReactComponent as PrevArrow } from "../../assets/images/ic_arrow back.svg";

export const PreviousPage = () => {
  return (
    <Button>
      <Prev />
    </Button>
  );
};

const Button = styled.button`
  
`

const Prev = styled(PrevArrow)`
  width: 21px;

  & > path {
    fill: ${colors("gray50")};
  }
`;
