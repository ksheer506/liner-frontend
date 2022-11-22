import { ReactNode } from "react";
import styled, { css } from "styled-components";

import {
  blink,
  Skelcontainer,
  SkeletonDefaultProps,
  SkelItemDefault,
} from "./styles";

type CircleProps = Partial<SkeletonDefaultProps> & {
  radius: string;
};

export interface SkeletonProps {
  width: string;
  height: string;
  bgColor?: string;
  children: ReactNode;
  animation?: "blink" | "wave";
}

export const Rectangle = styled.div<SkeletonDefaultProps>`
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  animation: ${blink} 1.5s ease infinite;

  ${({ width, height, bgColor }) =>
    css`
      width: ${width};
      height: ${height};
      background-color: ${bgColor || "#f0f0f0"};
    `}
`;

export const Circle = styled(SkelItemDefault)<CircleProps>`
  border-radius: 100%;

  ${({ radius, bgColor }) =>
    css`
      width: ${radius};
      height: ${radius};
      background-color: ${bgColor || "#f0f0f0"};
    `}
`;

export const Skeleton = ({
  width,
  height,
  children,
  animation = "blink",
}: SkeletonProps) => {
  return (
    <Skelcontainer width={width} height={height} animation={animation}>
      {children}
    </Skelcontainer>
  );
};
