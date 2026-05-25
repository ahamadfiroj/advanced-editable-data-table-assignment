import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    line-height: 1.4;
    color: #0f172a;
    background: #f8fafc;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: #f8fafc;
  }

  #root {
    min-height: 100vh;
  }

  button,
  input,
  select {
    font: inherit;
  }
`
