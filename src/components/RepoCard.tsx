/* @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Repo } from "../api/types";
import { Link } from "react-router-dom";
const cardGridCss = css`
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const repoCardWrapperCss = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  overflow: hidden;
  width: 100%;
  text-decoration: none;
  color: black;
  max-width: 100%;
  h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bolder;
    text-align: left;
    color: #4078c0;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 768px) {
      max-width: 70%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  p {
    margin: 0;
  }
`;

const descriptionCss = css`
  margin: 0;
  color: #888;
  white-space: normal;
  text-align: left;
`;
const cardMetaCss = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const cardMetaContainerCss = css`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;
type UserCardProps = {
  repos: Repo[];
};
const RepoCard: React.FC<UserCardProps> = ({ repos }) => {
  return (
    <>
      {repos.map((item: Repo, index: number) => (
        <div key={index} css={cardGridCss}>
          <Link css={repoCardWrapperCss} to={item.url}>
            <h2>{item.full_name}</h2>
            <p css={descriptionCss}>{item?.description}</p>
            <div css={cardMetaContainerCss}>
              <span css={cardMetaCss}>
                <span css={{ color: "#F1E05A" }}>●</span>
                {/* adding fallback language */}
                <span>{item.language || "Javascript"}</span>
              </span>
              <span css={cardMetaCss}>
                <span>Rating :</span>
                <span>{item.stargazers_count}</span>
              </span>
              <span css={cardMetaCss}>
                Forks :<span>{item.forks_count}</span>
              </span>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default RepoCard;
