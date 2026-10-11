import React from "react";
import { NavLink } from "react-router-dom";
import Headroom from "react-headroom";
import { greeting } from "../../portfolio";
import NoTranslate from "../notranslate/notranslate";
import SeoHeader from "../seoHeader/SeoHeader";
import "./Header.scss";

const MENU_ITEMS = [
  { path: "/", text: "Home" },
  { path: "/about", text: "About" },
  { path: "/patents", text: "Patents" },
  { path: "/contact", text: "Contact" },
];

// Above page content that sets its own z-index (the timeline steps)
const HEADER_Z_INDEX = 100;

// The phone menu is a CSS checkbox toggle, closed again after navigating
function handleClickLink(): void {
  const menuBtn = document.getElementById("menu-btn") as HTMLInputElement;
  if (menuBtn) {
    menuBtn.checked = false;
  }
}

interface HeaderProps {
  pageTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => (
  <>
    <SeoHeader pageTitle={pageTitle} />
    <Headroom style={{ zIndex: HEADER_Z_INDEX }}>
      <NoTranslate>
        <header className="header">
          <div className="header-inner">
            <NavLink to="/" className="logo">
              <span className="logo-bracket">&lt;</span>
              <span className="logo-name">{greeting.username}</span>
              <span className="logo-bracket">/&gt;</span>
            </NavLink>
            <input
              className="menu-btn"
              type="checkbox"
              id="menu-btn"
              aria-label="Toggle navigation menu"
            />
            <label className="menu-icon" htmlFor="menu-btn">
              <span className="navicon" />
            </label>
            <ul className="menu">
              {MENU_ITEMS.map((item) => (
                <li key={item.path}>
                  <NavLink to={item.path} onClick={handleClickLink}>
                    {item.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </header>
      </NoTranslate>
    </Headroom>
  </>
);

export default Header;
