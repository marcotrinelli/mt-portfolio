import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Headroom from "react-headroom";
import { useTheme } from "styled-components";
import { greeting } from "../../portfolio";
import NoTranslate from "../notranslate/notranslate";
import SeoHeader from "../seoHeader/SeoHeader";
import "./Header.scss";

interface MenuHeaderItem {
  path: string;
  text: string;
}

const MENU_HEADER_LIST: MenuHeaderItem[] = [
  { path: "/home", text: "Home" },
  { path: "/education", text: "Education" },
  { path: "/experience", text: "Experience" },
  { path: "/projects", text: "Projects" },
  { path: "/hobbies", text: "Hobbies" },
  { path: "/contact", text: "Contact" },
];

const onMouseEnter = (
  event: React.MouseEvent<HTMLAnchorElement>,
  color: string
): void => {
  const el = event.target as HTMLElement;
  el.style.backgroundColor = color;
};

const onMouseOut = (event: React.MouseEvent<HTMLAnchorElement>): void => {
  const el = event.target as HTMLElement;
  el.style.backgroundColor = "transparent";
};

function handleClickLink(event: React.MouseEvent<HTMLAnchorElement>): void {
  const menuBtn = document.getElementById("menu-btn") as HTMLInputElement;
  if (menuBtn) {
    menuBtn.checked = false;
  }
}

const Header: React.FC = () => {
  const theme = useTheme();
  const [headerStyle, setHeaderStyle] = useState({
    boxShadow: `0px 10px 30px -15px ${theme.boxShadowColor}`,
  });

  function handleUnpin(): void {
    setHeaderStyle({ boxShadow: "none" });
  }

  function handlePin(): void {
    setHeaderStyle({
      boxShadow: `0px 10px 30px -15px ${theme.boxShadowColor}`,
    });
  }

  function createMenuItems(): JSX.Element[] {
    return MENU_HEADER_LIST.map((item, index) => {
      return (
        <li key={index}>
          <NavLink
            to={item.path}
            style={({ isActive }) =>
              isActive
                ? {
                    fontWeight: "bold",
                    color: theme.textOnDark,
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
      );
    });
  }

  return (
    <>
      <SeoHeader />
      <Headroom style={headerStyle} onPin={handlePin} onUnpin={handleUnpin}>
        <NoTranslate>
          <header
            className="header"
            style={{
              backgroundColor: theme.bodyDarker,
            }}
          >
            <NavLink to="/home" className="logo">
              <span style={{ color: theme.textOnDark }}> &lt;</span>
              <span className="logo-name" style={{ color: theme.textOnDark }}>
                {greeting.username}
              </span>
              <span style={{ color: theme.textOnDark }}>/&gt;</span>
            </NavLink>
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label className="menu-icon" htmlFor="menu-btn">
              <span
                className={theme.isDark ? "navicon navicon-dark" : "navicon"}
              ></span>
            </label>
            <ul className="menu">{createMenuItems()}</ul>
          </header>
        </NoTranslate>
      </Headroom>
    </>
  );
};

export default Header;
