import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => getThem() || "light");

  useEffect(() => {
    localStorage.setItem("mode", mode);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  //   const [theme, settheme] = useState("dark");
  //   const toggleTheme = () => {
  //     document.documentElement.classList.toggle(theme);
  //     localStorage.setItem("theme", `${theme}`);
  //   };

  return (
    <ThemeContext.Provider value={{ toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

const getThem = () => localStorage.getItem("mode");

const updateTheme = (theme, themeToRemove) => {
  let mode = localStorage.getItem("mode");
  if (themeToRemove) document.documentElement.classList.remove("light", "dark");
  localStorage.setItem("mode", mode);

  document.documentElement.classList.add(theme);
};
