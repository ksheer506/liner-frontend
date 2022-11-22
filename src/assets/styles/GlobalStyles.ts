import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  #root {
    display: flex;
    justify-content: center;
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

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    padding: 0;
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
  }

  /* div.Toastify__toast-container--top-right {
    top: 70px;
    font-size: 14px;
  } */
`;

export default GlobalStyles;
