import React from 'react'
import { func, string } from 'prop-types';
import "./ToggleSwitch.css"
import DarkModeToggle from "react-dark-mode-toggle";

const ToggleSwitch = ({ theme, toggleTheme }) => {

    return (
        <div className={"toggle-button"}>
            <DarkModeToggle
                onChange={toggleTheme}
                checked={theme === "dark"}
                size={80}
            />
        </div>
    );
};

ToggleSwitch.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default ToggleSwitch;