import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  ul, li, ol {
    list-style: none;
    padding: 0;
  }

  a {
    text-decoration: none;

    &:focus, &:visited, &:active {
      color: black;
    }
  }

  div.Toastify__toast-container--top-right {
    top: 70px;
    font-size: 14px;
  }
`;

export default GlobalStyles;
