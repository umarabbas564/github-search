/* @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { keyframes } from "@emotion/css";

const loadKeyframe = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const loaderCss = css`
  &,
  &:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
  }

  position: relative;
  text-indent: -9999em;
  border-top: 0.11em solid transparent;
  border-right: 0.11em solid transparent;
  border-bottom: 0.11em solid transparent;
  border-left: 0.11em solid currentColor;
  transform: translateZ(0);
  animation: ${loadKeyframe} 1.1s infinite linear;
`;

const loaderWrapperCss = css`
  width: 1em;
`;

const Loader: React.FC<
  Omit<React.HTMLAttributes<HTMLDivElement>, "children">
> = (props) => (
  <div css={loaderWrapperCss} {...props}>
    <div css={loaderCss} />
  </div>
);

export default Loader;
