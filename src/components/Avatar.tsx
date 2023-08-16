/* @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

interface AvatarProps {
  src: string;
  alt: string;
  size: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size }) => {
  const containerCss = css`
    width: ${size};
    height: ${size};
    border-radius: 50%;
    overflow: hidden;
    @media (max-width: 768px) {
      width: 30px;
      height: 30px;
    }
  `;
  const avatarCss = css`
    width: 100%;
    height: 100%;
    border-radius: "50%";
    object-fit: "cover";
  `;

  return (
    <div css={containerCss}>
      <img src={src} alt={alt} css={avatarCss} />
    </div>
  );
};

export default Avatar;
