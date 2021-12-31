import React from "react";
import "./App.css";
import Main from "./containers/Main";
import ToggleSwitch from "./components/toggleSwitch/ToggleSwitch";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from './theme/GlobalStyles';
import { useTheme } from './theme/useTheme';

import { darkTheme, lightTheme } from "./theme/Themes"

function App() {
    const [theme, themeToggler, mountedComponent] = useTheme();
    const selectedTheme = theme === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={selectedTheme}>
            <>
                <GlobalStyles />
                {mountedComponent && <Main theme={selectedTheme} />}
                {mountedComponent && <ToggleSwitch theme={theme} toggleTheme={themeToggler} />}
            </>
        </ThemeProvider>
    );
}

export default App;
