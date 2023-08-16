/* @jsxImportSource @emotion/react */
import React, { ChangeEvent } from "react";
import { css } from "@emotion/react";

interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  options: Option[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
}

const selectCss = css`
  border-radius: 5px;
  padding: 12px;
  background-color: #ffffff;
  border: 1px solid #d6d0d0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 0.5em;
  text-align: inherit;
  white-space: nowrap;
  select {
    border: none;
    padding-right: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Select: React.FC<SelectBoxProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div css={selectCss}>
      <select value={value} onChange={onChange}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
