import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Headroom from "react-headroom";
import { useTheme } from 'styled-components'
import { greeting } from "../../portfolio.js";
import SeoHeader from "../seoHeader/SeoHeader";
import "./Header.scss";

const MENU_HEADER_LIST = [
    { path: "/home", text: "Home" },
    { path: "/education", text: "Education" },
    { path: "/experience", text: "Experience" },
    { path: "/projects", text: "Projects" },
    { path: "/hobbies", text: "Hobbies" },
    { path: "/contact", text: "Contact" },
]

const onMouseEnter = (event, color) => {
    const el = event.target;
    el.style.backgroundColor = color;
};

const onMouseOut = (event) => {
    const el = event.target;
    el.style.backgroundColor = "transparent";
};

function handleClickLink(event){
    const menuBtn = document.getElementById("menu-btn");
    menuBtn.checked = false;
    // onMouseOut(event)
}

export default function Header() {
    const theme = useTheme();
    const[headerStyle, SetHeaderStyle] = useState({ boxShadow: `0px 10px 30px -15px ${theme.boxShadowColor}` });

    function handleUnpin(){
        SetHeaderStyle({ boxShadow: "none" })
    }

    function handlePin(){
        SetHeaderStyle({ boxShadow: `0px 10px 30px -15px ${theme.boxShadowColor}` })
    }


    function createMenuItems() {
        return MENU_HEADER_LIST.map((item, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={item.path}
                        style={({ isActive }) => isActive
                            ? {
                                fontWeight: "bold",
                                color: theme.textOnDark
                            }
                            : { color: theme.textOnDark }
                        }
                        onMouseOver={(event) => onMouseEnter(event, theme.highlight)}
                        onMouseOut={(event) => onMouseOut(event)}
                        onClick={(event) => handleClickLink(event)}
                    >
                        {item.text}
                    </NavLink>
                </li>
            )
        })
    }

    return (
        <>
            {/* // <Fade top duration={1000} distance="20px"> */}
            <SeoHeader />
            <Headroom style={headerStyle} onPin={handlePin} onUnpin={handleUnpin}>
                <header className="header"
                    style={{
                        backgroundColor: theme.bodyDarker,
                    }}>
                    <NavLink to="/home" className="logo">
                        <span style={{ color: theme.textOnDark }}> &lt;</span>
                        <span className="logo-name" style={{ color: theme.textOnDark }}>
                            {greeting.username}
                        </span>
                        <span style={{ color: theme.textOnDark }}>/&gt;</span>
                    </NavLink>
                    <input className="menu-btn" type="checkbox" id="menu-btn" />
                    <label className="menu-icon" htmlFor="menu-btn">
                        <span className={theme.isDark ? "navicon navicon-dark" : "navicon"}></span>
                    </label>
                    <ul className="menu">
                        {createMenuItems()}
                    </ul>
                </header>
            </Headroom>
            {/* // </Fade> */}
        </>
    );
}
