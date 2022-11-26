import { colors, SEARCH_PAGE_HEADER_HEIGHT } from "assets";
import styled from "styled-components";

export const NoResult = () => {
  return (
    <Box>
      <Title>검색 결과가 없습니다.</Title>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(95vh - ${SEARCH_PAGE_HEADER_HEIGHT});
`;

const Title = styled.h1`
  color: ${colors("gray35")};
  font-weight: 700;
  font-size: 22px;
`;
