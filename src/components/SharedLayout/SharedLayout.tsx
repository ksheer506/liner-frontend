import { Outlet } from "react-router";
import styled from "styled-components";

export const SharedLayout = () => {
  return (
    <Main>
      <Outlet />
    </Main>
  );
};

const Main = styled.main`
  width: 100vw;
  height: 100vh;
`;
