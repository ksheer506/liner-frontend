import styled from "styled-components";
import { Rectangle } from "./Skeleton";

export const ContentItemSkeleton = () => {
  return (
    <List>
      <Rounded width="72px" height="72px" bgColor="#F2F3F7" />
      <ContentBox>
        <Header>
          <Rectangle width="457px" height="20px" bgColor="#F2F3F7" />
        </Header>
        <Footer>
          <Rectangle width="160px" height="14px" bgColor="#F2F3F7" />
        </Footer>
      </ContentBox>
    </List>
  );
};

const Rounded = styled(Rectangle)`
  border-radius: 12px;
`;

const List = styled.li`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  width: 100%;
  height: 104px;
  padding: 0px 40px;
  gap: 16px;
`;

const ContentBox = styled.section`
  display: flex;
  flex-flow: column nowrap;

  width: 536px;
  height: 72px;
  gap: 14px;
`;

const Header = styled.header`
  display: flex;
  flex-flow: column nowrap;
  gap: 3px;
  width: 100%;
  height: 40px;
`;

const Footer = styled.footer`
  display: flex;
  flex-flow: row nowrap;

  gap: 6px;
`;
