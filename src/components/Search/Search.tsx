import { colors } from "assets";
import styled from "styled-components";
import { ReactComponent as IcSearch } from "../../assets/images/search.svg";
import { ReactComponent as IcSearcHover } from "../../assets/images/search_hover.svg";

export const Search = () => {
  return (
    <Box>
      <Input placeholder="Search keyword" />
      <Icon />
    </Box>
  );
};

const Box = styled.div`
  position: relative;
  width: 560px;
  height: 48px;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: ${colors("gray50")};
  border: 2px solid ${colors("gray30")};
  border-radius: 1000px;
  padding-left: 57px;
  caret-color: ${colors("liner50")};
  transition: 400ms all;

  &::placeholder {
    font-size: 16px;
    color: ${colors("gray30")};
  }

  &:hover,
  &:focus {
    border: 2px solid ${colors("liner50")};
    /* outline: 2px solid ${colors("liner05")}; */
  }
`;

const Icon = styled(IcSearch)`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translate(0, -50%);

  & > path {
    transition: 400ms all;
  }

  ${Input}:hover, ${Input}:hover ~ & > path {
    fill: ${colors("liner50")};
  } ;
`;
