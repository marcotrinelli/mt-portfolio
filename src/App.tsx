import React from "react";
import "./App.css";
import Main from "./containers/Main";
import ToggleSwitch from "./components/toggleSwitch/ToggleSwitch";
import TopButton from "./components/topButton/TopButton";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./theme/GlobalStyles";
import { useTheme } from "./theme/useTheme";

import { darkTheme, lightTheme } from "./theme/Themes";

const App: React.FC = () => {
  const [theme, themeToggler, mountedComponent] = useTheme();
  const selectedTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <>
      {React.createElement(
        ThemeProvider as any,
        { theme: selectedTheme },
        <>
          {React.createElement(GlobalStyles as any)}
          {mountedComponent && <Main />}
          {mountedComponent && (
            <ToggleSwitch theme={theme} toggleTheme={themeToggler} />
          )}
          {mountedComponent && <TopButton />}
        </>
      )}
    </>
  );
};

export default App;
