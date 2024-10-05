import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <a
      onClick={toggleTheme}
      className="theme-controller"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={12} /> : <Sun size={12} />}
      {theme === "light" ? "Dark" : "Light"} Mode
    </a>
  );
};

export default ThemeToggle;
