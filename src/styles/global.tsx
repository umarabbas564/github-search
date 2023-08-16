import { injectGlobal } from "@emotion/css";

injectGlobal`
  html, body {
    overscroll-behavior-y: none;
  }
  
  body {
    font-family: "PingFang SC", sans-serif;
    color: #333333;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
  }
`;
