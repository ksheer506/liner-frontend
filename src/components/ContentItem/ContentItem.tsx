import styled from "styled-components";

import DefaultThumb from "../../assets/images/default_thumb.png";
import DefaultFavi from "../../assets/images/default_favi.png";
import { colors } from "assets";
import { ToggleBookmark } from "components/Buttons";
import { sliceURL } from "utils";

interface ContentItemProps {
  title: string;
  url: string;
  mainImage?: string;
  faviconImage?: string;
  isBookmarked: boolean;
}

export const ContentItem = ({
  title,
  url,
  mainImage,
  faviconImage,
  isBookmarked,
}: ContentItemProps) => {
  return (
    <List>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Image src={mainImage || DefaultThumb} />
      </a>
      <ContentBox>
        <Header>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Title>{title}</Title>
          </a>
        </Header>
        <Footer>
          <Thumbnail src={faviconImage || DefaultFavi} />
          <URL>{sliceURL(url)}</URL>
        </Footer>
      </ContentBox>
      <ToggleBookmark isBookmarked={isBookmarked} />
    </List>
  );
};

const List = styled.li`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  width: 100%;
  height: 104px;
  padding: 0px 40px;
  gap: 16px;
`;

const Image = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 15px;
  object-fit: cover;
`;

const ContentBox = styled.section`
  display: flex;
  flex-flow: column nowrap;

  width: 536px;
  height: 72px;
  gap: 14px;
`;

const Header = styled.header`
  width: 100%;
  height: 40px;
`;

const Title = styled.h1`
  font-size: 15px;
  color: ${colors("gray50")};
  margin: 0px;
  width: 100%;
  height: 100%;
  line-height: 20px;

  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: break-spaces;
`;

const Footer = styled.footer`
  display: flex;
  flex-flow: row nowrap;

  gap: 6px;
`;

const Thumbnail = styled.img`
  width: 14px;
  height: 14px;
`;

const URL = styled.p`
  font-size: 13px;
  color: ${colors("gray35")};
  margin: 0px;
`;
