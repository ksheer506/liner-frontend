import styled, { css, keyframes } from "styled-components";
import { SkeletonProps } from "./Skeleton";

export type SkeletonDefaultProps = Omit<SkeletonProps, "children">;

export const blink = keyframes`
  0% {
      opacity: 0.5;
    }
  50% {
      opacity: 1;
  }
  100% {
      opacity: 0.5;
  }
`;

export const wave = keyframes`
  0% {
      left: 0%;
    }
  50% {
      left: 50%;
  }
  100% {
      left: 100%;
  }
`;

export const Skelcontainer = styled.div<SkeletonDefaultProps>`
  display: flex;
  position: relative;
  flex-flow: column nowrap;
  row-gap: 5px;
  justify-content: center;

  ${({ width, height }) =>
    width &&
    height &&
    css`
      width: ${width};
      height: ${height};
    `}
`;

export const SkelItemDefault = styled.div<SkeletonDefaultProps>`
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
  animation: ${blink} 0.5s ease infinite;

  /* ${({ animation }) =>
    animation === "blink"
      ? css`
          animation: ${blink} 0.5s ease infinite;
        `
      : css`
          &::before {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #f0f0f0;
          }
        `} */
`;
