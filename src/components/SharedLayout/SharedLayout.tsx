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
  width: 768px;
  height: 100vh;
  overflow-x: hidden;
`;
