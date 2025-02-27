import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded border"
    >
      {theme === "light" ? "🌙 Modo Escuro" : "☀️ Modo Claro"}
    </button>
  );
};

export default ThemeToggle;
