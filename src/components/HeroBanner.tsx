/* @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { debounce } from "lodash";
import Input from "./Input";
import Select from "./Select";
import Avatar from "./Avatar";
import GithubLogo from "../assets/github.png";

const rootCss = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const headerCardWrapperCss = css`
  display: flex;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
`;

const avatarWrapperCss = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const cardContentCss = css`
  padding: 10px;
  h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bolder;
  }
  p {
    margin: 0;
    color: #888;
  }
`;
const searchBarWrapperCss = css`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

type DropDownOptions = {
  value: string;
  label: string;
};
type HeroBannerType = {
  onInputChange: (val: string) => void;
  onSelectChange: (val: string) => void;
  selectOptions: DropDownOptions[];
};
const HeroBanner: React.FC<HeroBannerType> = ({
  onInputChange,
  selectOptions,
  onSelectChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    selectOptions[0].label
  );
  const debouncedSearch = debounce((term) => {
    onInputChange(term);
  }, 500);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(event.target.value);
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  return (
    <div css={rootCss}>
      <div css={headerCardWrapperCss}>
        <div css={avatarWrapperCss}>
          <Avatar src={GithubLogo} alt="logo" size={"60px"} />
        </div>
        <div css={cardContentCss}>
          <h2>GitHUB Searcher</h2>
          <p>Search users or repositries below</p>
        </div>
      </div>
      <div css={searchBarWrapperCss}>
        <Input
          placeholder={"Start typing to search..."}
          onChange={handleInputChange}
        />
        <Select
          options={selectOptions}
          value={selectedOption}
          onChange={handleSelectChange}
          placeholder=""
        />
      </div>
    </div>
  );
};

export default HeroBanner;
