import { Search } from "components/Search/Search";
import styled from "styled-components";
import { ReactComponent as Liner } from "../../assets/images/logo.svg";

export const Main = () => {
  return (
    <MainBox>
      <Liner />
      <Search />
    </MainBox>
  );
};

const MainBox = styled.main`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  row-gap: 80px;
`;
