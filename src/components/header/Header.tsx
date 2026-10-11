import React, { useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Headroom from "react-headroom";
import { greeting } from "../../portfolio";
import NoTranslate from "../notranslate/notranslate";
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

// One dot under the menu that slides to the current page, instead of one per link
function useActiveIndicator(menuRef: React.RefObject<HTMLUListElement>) {
  const { pathname } = useLocation();
  const [x, setX] = useState<number | null>(null);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu) {
      return;
    }
    const place = () => {
      const active = menu.querySelector<HTMLElement>("a.active");
      if (!active) {
        setX(null);
        return;
      }
      const link = active.getBoundingClientRect();
      setX(link.left - menu.getBoundingClientRect().left + link.width / 2);
    };
    place();
    // Link widths change once Google Sans loads
    const observer = new ResizeObserver(place);
    observer.observe(menu);
    return () => observer.disconnect();
  }, [menuRef, pathname]);

  // The dot only exists with a current page, so it appears in place instead of sliding in
  return x === null
    ? { className: "menu" }
    : {
        className: "menu menu-has-indicator",
        style: { "--indicator-x": `${x}px` } as React.CSSProperties,
      };
}

const Header: React.FC = () => {
  const menuRef = useRef<HTMLUListElement>(null);
  const indicator = useActiveIndicator(menuRef);

  return (
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
            <ul
              ref={menuRef}
              className={indicator.className}
              style={indicator.style}
            >
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
  );
};

export default Header;
