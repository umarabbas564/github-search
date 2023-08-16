/* @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";

type ErrorScreenProps = {
  message: string;
};

const mainWrapperCss = css`
  padding-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;
const errorHeadingCss = css`
  color: red;
`;
const ErrorScreen: React.FC<ErrorScreenProps> = ({ message }) => {
  return (
    <div css={mainWrapperCss}>
      <h2 css={errorHeadingCss}>An Error Occurred</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorScreen;
