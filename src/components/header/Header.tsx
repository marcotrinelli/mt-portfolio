import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Headroom from "react-headroom";
import { useTheme } from "styled-components";
import {
  greeting,
  hobbieSection,
  educationInfo,
  bigProjects,
  workExperiences,
} from "../../portfolio";
import NoTranslate from "../notranslate/notranslate";
import SeoHeader from "../seoHeader/SeoHeader";
import "./Header.scss";

interface MenuHeaderItem {
  path: string;
  text: string;
}

interface ConditionalMenuItem {
  path: string;
  text: string;
  displayCondition: boolean;
}

const getMenuHeaderList = (): MenuHeaderItem[] => {
  const baseMenuItems: MenuHeaderItem[] = [{ path: "/home", text: "Home" }];

  // Define conditional menu items with their display conditions
  const conditionalItems: ConditionalMenuItem[] = [
    // {
    //   path: "/education",
    //   text: "Education",
    //   displayCondition: educationInfo.display,
    // },
    // {
    //   path: "/experience",
    //   text: "Experience",
    //   displayCondition: workExperiences.display,
    // },
    {
      path: "/patents",
      text: "Patents",
      displayCondition: bigProjects.display, // Always show patents
    },
    {
      path: "/hobbies",
      text: "Hobbies",
      displayCondition: hobbieSection.display,
    },
  ];

  // Add conditional items that should be displayed
  conditionalItems.forEach((item) => {
    if (item.displayCondition) {
      baseMenuItems.push({ path: item.path, text: item.text });
    }
  });

  // Always add contact at the end
  baseMenuItems.push({ path: "/contact", text: "Contact" });

  return baseMenuItems;
};

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
    boxShadow: `0px 0px 10px 0px ${theme.boxShadowColor}`,
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
    return getMenuHeaderList().map((item, index) => {
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
