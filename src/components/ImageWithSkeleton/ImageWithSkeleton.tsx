import { Rectangle } from "components/Skeleton/Skeleton";
import { SyntheticEvent, useCallback, useState } from "react";
import styled, { css } from "styled-components";

interface ImageWithSkeletonProps {
  image: string | undefined;
  fallbackImage: string;
  width: string;
  height: string;
}

export const ImageWithSkeleton = ({
  image,
  fallbackImage,
  width,
  height,
}: ImageWithSkeletonProps) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = useCallback(
    (e: SyntheticEvent<HTMLImageElement>, fallbackImg: string) => {
      e.currentTarget.src = fallbackImg;
    },
    []
  );

  return (
    <Box width={width} height={height}>
      {imageLoading && <Rounded width="100%" height="100%" bgColor="#F2F3F7" />}
      <Image
        src={image || fallbackImage}
        isLoading={imageLoading}
        onLoad={() => setImageLoading(false)}
        onError={(e) => handleImageError(e, fallbackImage)}
      />
    </Box>
  );
};

const Box = styled.div<Pick<ImageWithSkeletonProps, "width" | "height">>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const Rounded = styled(Rectangle)`
  border-radius: 12px;
`;

const Image = styled.img<{ isLoading: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;

  ${({ isLoading }) =>
    isLoading &&
    css`
      display: none;
    `}
`;
