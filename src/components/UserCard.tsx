/* @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { User } from "../api/types";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

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

const userCardWrapperCss = css`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  text-decoration: none;
  color: black;
`;

const avatarWrapperCss = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const cardContentCss = css`
  flex-grow: 1;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  max-width: 100%;
  h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bolder;
    @media (max-width: 768px) {
      max-width: 70%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  p {
    margin: 0;
    color: #888;
  }
`;

type UserCardProps = {
  users: User[];
};
const UserCard: React.FC<UserCardProps> = ({ users }) => {
  return (
    <>
      {users.map((item: User, index: number) => (
        <div key={index} css={cardGridCss}>
          <Link css={userCardWrapperCss} to={item.url}>
            <div css={avatarWrapperCss}>
              <Avatar src={item.avatar_url} size={"60px"} alt="user-img" />
            </div>
            <div css={cardContentCss}>
              <h2>{item.login}</h2>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default UserCard;
