import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100vh;
    font-family: 'Roboto Slab', serif;
    background-color: #121212;
    color: #fff;
    overflow: hidden; /* Impede rolagem no body */
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    color: #d35400;
  }

  p {
    line-height: 1.6;
    color: #b8b8b8;
  }

  img {
    border: 2px solid #d35400;
    box-shadow: 0 0 10px #d35400;
  }
`;

export default GlobalStyle;