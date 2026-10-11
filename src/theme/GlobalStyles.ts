import { createGlobalStyle } from "styled-components"

// Theme colours as CSS variables, so every stylesheet (design.scss and the pages) reads one palette
export const GlobalStyles = createGlobalStyle`
  :root {
    --color-text: ${({ theme }) => theme.text};
    --color-title: ${({ theme }) => theme.title};
    --color-muted: ${({ theme }) => theme.secondaryText};
    --color-rule: ${({ theme }) => theme.secondaryText}40;
    --color-tag-bg: ${({ theme }) => theme.secondaryText}1f;
    --color-accent-1: ${({ theme }) => theme.imageHighlight};
    --color-accent-2: ${({ theme }) => theme.highlight};
    --color-accent-3: ${({ theme }) => theme.jacketColor};
    --color-body: ${({ theme }) => theme.body};
    --color-surface: ${({ theme }) => theme.paperbg};
    --color-shadow: ${({ theme }) => theme.boxShadowColor};
  }

  /* Also on the root, which has no transition (otherwise the body's fade starts from white on every load) */
  html {
    background-color: ${({ theme }) => theme.body};
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    font: 19px / 23px "Google Sans Regular", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* Only the theme colours: with "all", the dev server's late CSS animates the default 8px margin away, so a refresh restores the scroll 8px low */
    transition: background-color 0.5s linear, color 0.5s linear;
  }
`
