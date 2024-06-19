import React from 'react'
import { useTheme } from  '../../hooks/ThemeContext'

function Theme() {
    const { theme, toggleTheme } = useTheme();

    return (
      <div className="absolute bottom-4 right-4">
        <button
          className="p-2 text-gray-800 rounded-full bg-gray-200 dark:bg-gray-700 dark:text-white focus:outline-none"
          onClick={toggleTheme}
        >
          {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
    );
}

export default Theme