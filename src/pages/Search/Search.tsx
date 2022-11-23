import {
  DocumentHeader,
  DocumentList,
} from "components";
import styled from "styled-components";

export const Search = () => {
  return (
    <Box>
      <DocumentHeader />
      <DocumentList />
    </Box>
  );
};

const Box = styled.div`
  /* height: 100vh; */
  /* overflow: hidden; */
`;


