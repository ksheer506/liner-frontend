import styled from "styled-components";

import DefaultThumb from "../../assets/images/default_thumb.png";
import DefaultFavi from "../../assets/images/default_favi.png";
import { colors } from "assets";
import { ToggleBookmark } from "components/Buttons";
import { sliceURL } from "utils";
import { memo } from "react";
import { ImageWithSkeleton } from "components/ImageWithSkeleton/ImageWithSkeleton";
import { ExternalLink } from "components/ExternalLink/ExternalLink";

interface DocumentItemProps {
  title: string;
  url: string;
  mainImage?: string;
  faviconImage?: string;
  isBookmarked: boolean;
  id: string;
}

export const DocumentItem = memo(
  ({
    title,
    url,
    mainImage,
    faviconImage,
    isBookmarked,
    id,
  }: DocumentItemProps) => {
    return (
      <List>
        <ExternalLink link={url}>
          <ImageWithSkeleton
            image={mainImage || DefaultThumb}
            defaultImage={DefaultThumb}
            width="72px"
            height="72px"
          />
        </ExternalLink>

        <ContentBox>
          <Header>
            <ExternalLink link={url}>
              <Title>{title}</Title>
            </ExternalLink>
          </Header>
          <Footer>
            <ImageWithSkeleton
              image={faviconImage || DefaultFavi}
              defaultImage={DefaultFavi}
              width="14px"
              height="14px"
            />
            <URL>{sliceURL(url)}</URL>
          </Footer>
        </ContentBox>
        <ToggleBookmark itemId={id} isBookmarked={isBookmarked} />
      </List>
    );
  }
);

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

const URL = styled.p`
  font-size: 13px;
  color: ${colors("gray35")};
  margin: 0px;
`;
