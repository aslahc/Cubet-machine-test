// ThemeContext.js

import React, { createContext, useState, useContext, useEffect } from "react";

// Create context
const ThemeContext = createContext();

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme is light

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Dynamically set the class on the body to apply styles based on theme
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-mode" : "";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
