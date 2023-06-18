import React, { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { getFromTheme } from "./utils";
import "./index.css";

function Memory() {
  const [themeName, toggleTheme] = useTheme("lightTheme");

  const GlobalStyle = createGlobalStyle`
    body {
        background: ${getFromTheme("body.bg")};
        color: ${getFromTheme("body.color")};
        transition: background .3s ease;
    }
  `;

  return (
    <ThemeProvider theme={themes[themeName]}>
      <React.Fragment>
        <GlobalStyle />
        <Game toggleTheme={toggleTheme} />
      </React.Fragment>
    </ThemeProvider>
  );
}

function useTheme(defaultThemeName) {
  const [themeName, setTheme] = useState(defaultThemeName);
  function switchTheme(name) {
    setTheme(themeName === "darkTheme" ? "lightTheme" : "darkTheme");
  }
  return [themeName, switchTheme];
}

export default Memory;
