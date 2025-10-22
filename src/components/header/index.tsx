"use client";
import useThemeState from "@/state/theme";
import { useEffect } from "react";

export default function Header() {
  const theme = useThemeState((state) => state.theme);
  const toggleTheme = useThemeState((state) => state.toggleTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <header>
      <div className="flex items-center justify-between py-4 px-8 container">
        <h1 className="text-3xl font-bold">Todo List - Full Stack App</h1>
        <div className="flex items-center gap-2">
          <button className="btn" onClick={toggleTheme}>
            {theme === "light" ? "🌜" : "🌞"}
          </button>
          <button className="btn">Register</button>
          <button className="btn">Login</button>
        </div>
      </div>
    </header>
  );
};
