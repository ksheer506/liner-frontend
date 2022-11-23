import { DocumentHeader, DocumentList } from "components";
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
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  /* height: 100vh; */
  /* overflow: hidden; */
`;
