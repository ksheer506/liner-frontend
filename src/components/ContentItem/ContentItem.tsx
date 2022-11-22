import styled, { css } from "styled-components";
import { ReactComponent as IcBookmark } from "../../assets/images/ic_bookmark.svg";
import DefaultThumb from "../../assets/images/default_thumb.png";
import DefaultFavi from "../../assets/images/default_favi.png";
import { Link } from "react-router-dom";
import { colors } from "assets";

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
      <Image src={mainImage || DefaultThumb} />
      <ContentBox>
        <Header>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Title>{title}</Title>
          </a>
        </Header>
        <Footer>
          <Thumbnail src={faviconImage || DefaultFavi} />
          <URL>heybunny.io</URL>
        </Footer>
      </ContentBox>
      <button>
        <BookmarkIcon />
      </button>
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

  background: linear-gradient(269.93deg, #00c3cc 0%, #438dff 100%);
  opacity: 0.3;
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

const BookmarkIcon = styled(IcBookmark)`
  & > path {
    transition: 400ms all;
  }

  &:hover > path {
    fill: ${colors("liner50")};
  }
`;
