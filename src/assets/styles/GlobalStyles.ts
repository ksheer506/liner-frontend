import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'SF Pro Display', sans-serif;
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
`;

export default GlobalStyles;
