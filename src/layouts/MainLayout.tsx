/* @jsxImportSource @emotion/react */
import React from "react";
import { Suspense } from "react";
import { css } from "@emotion/react";

const rootCss = css`
  height: 100%;
  background-color: #ffffff;
  background-attachment: fixed;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div css={rootCss}>
      <div css={{ flexGrow: 1 }}>
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
};

export default MainLayout;
