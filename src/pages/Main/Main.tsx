import { SearchBar } from "components";
import styled from "styled-components";
import { ReactComponent as Liner } from "../../assets/images/logo.svg";

export const Main = () => {
  return (
    <Box>
      <Liner />
      <SearchBar />
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  row-gap: 80px;
`;
