/* @jsxImportSource @emotion/react */
import * as React from "react";
import { forwardRef, useCallback, useRef, useState } from "react";
import { css } from "@emotion/react";

const rootCss = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 65%;
`;

const wrapperCss = css`
  display: flex;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #d6d0d0;
`;

const disabledWrapperCss = css`
  background-color: #fafafa;
`;

const dangerCss = css`
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.06), 0 0 0 1px #fd3c3a inset;
`;

const inputCss = css`
  border: none;
  padding: 12px 20px;
  background-color: transparent;
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  resize: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::placeholder {
    font-size: 0.875em;
    color: #bebebe;
  }
`;

const compactCss = css`
  padding-top: 8px;
  padding-bottom: 8px;
`;

const limitCss = css`
  display: flex;
  align-items: center;
  align-self: flex-end;
  padding-right: 12px;
  color: #999999;
  font-size: 0.85em;
  height: 45px;
`;

interface InputCustomProps<T extends React.ElementType = "input"> {
  as?: T;
  label?: string;
  startSection?: any;
  endSection?: any;
  limit?: number;
  compact?: boolean;
  color?: "danger" | "default";
}

export type InputProps<
  T extends React.ElementType = "input"
> = InputCustomProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof InputCustomProps<T>>;

const Input = forwardRef(
  <T extends React.ElementType = "input">(
    {
      as,
      label,
      startSection,
      endSection,
      limit,
      compact,
      color = "default",
      disabled,
      readOnly,
      onChange,
      value,
      defaultValue,
      ...rest
    }: InputProps<T>,
    ref?: React.ComponentPropsWithRef<T>["ref"]
  ) => {
    const isControlled = useRef(onChange || value);
    const Component = as || "input";
    const [innerValue, setInnerValue] = useState<string>(
      value || defaultValue || ""
    );
    const inputValue = (isControlled ? value : innerValue) as string;

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        if (limit) {
          e.target.value = e.target.value.slice(0, limit);
          setInnerValue(e.target.value);
        }
        onChange && onChange(e);
      },
      [onChange, limit]
    );

    return (
      <div css={rootCss}>
        {/* If input have label it will append thier */}
        {label && <label>{label}</label>}
        <div
          css={[
            wrapperCss,
            (disabled || readOnly) && disabledWrapperCss,
            color === "danger" && dangerCss,
          ]}
        >
          {/* If input should have start section like search icon or any other it will append thier */}
          {startSection}
          <Component
            css={[inputCss, compact && compactCss]}
            onChange={isControlled.current && handleChange}
            value={isControlled.current && inputValue}
            {...{ disabled, readOnly, ...rest }}
            ref={ref}
          />
          {/* If input should have end section like search icon or any other it will append thier */}
          {endSection}
          {/* If input should have limit it will append thier */}
          {limit !== undefined && (
            <div css={limitCss}>
              {inputValue.length}/{limit}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
