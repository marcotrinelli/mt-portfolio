import { useState } from "react";

// The saved choice, else the OS setting. Read before the first render (so a dark visit never paints light first)
const getInitialTheme = (): string =>
  window.localStorage.getItem("theme") ??
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

export const useTheme = (): [string, () => void] => {
  const [theme, setTheme] = useState<string>(getInitialTheme);

  const themeToggler = (): void => {
    const mode = theme === "light" ? "dark" : "light";
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  return [theme, themeToggler];
};
