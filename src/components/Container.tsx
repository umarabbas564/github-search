/* @jsxImportSource @emotion/react */
import * as React from "react";
import { css } from "@emotion/react";
import { forwardRef } from "react";

const containerCss = css`
  padding-left: 60px;
  padding-right: 60px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

interface ContainerProps<T extends React.ElementType> {
  as?: T;
}

const Container = forwardRef(
  <T extends React.ElementType = "div">(
    {
      as,
      ...props
    }: ContainerProps<T> &
      Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>,
    ref?: React.ComponentPropsWithRef<T>["ref"]
  ) => {
    const Component = as || "div";
    return <Component css={containerCss} {...props} ref={ref} />;
  }
);

export default Container;
