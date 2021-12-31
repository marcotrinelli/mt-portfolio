import { useEffect, useState } from "react";

// function getInitialTheme() {
//     var d = new Date();
//     var currentHour = d.getHours();
//     console.log("curr hour:", currentHour)
//     if (currentHour >= 19 || currentHour <= 6) {
//         return 'dark'
//     } else {
//         return 'light'
//     }
// }

export const useTheme = (): [string, () => void, boolean] => {
  const [theme, setTheme] = useState<string>("light");
  const [mountedComponent, setMountedComponent] = useState<boolean>(false);

  const setMode = (mode: string): void => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const themeToggler = (): void => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme ? setTheme(localTheme) : setMode("light");
    setMountedComponent(true);
  }, []);

  return [theme, themeToggler, mountedComponent];
};
