/* @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { User, Repo } from "../api/types";
import UserCard from "./UserCard";
import RepoCard from "./RepoCard";
import { EntityType } from "../api/types";
import Loader from "./Loader";

const gridContainerCss = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding-top: 20px;
  width: 100%;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

type CardGridProps = {
  selectedEntity: string;
  userList: User[];
  repoList: Repo[];
  showLoaderAtBottom: boolean;
};
const CardGrid: React.FC<CardGridProps> = ({
  selectedEntity,
  userList,
  repoList,
  showLoaderAtBottom,
}) => {
  return (
    <>
      <div css={gridContainerCss}>
        {selectedEntity == EntityType.Users && <UserCard users={userList} />}
        {selectedEntity == EntityType.Repos && <RepoCard repos={repoList} />}
      </div>
      {showLoaderAtBottom && <Loader css={{ paddingTop: 18 }} />}
    </>
  );
};

export default CardGrid;
