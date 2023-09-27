import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export function ThemeButton({ className }) {
  const [textButton, setTextButton] = useState();
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: light)").matches)
      return "light";

    return "dark";
  });

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme == "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (theme == "dark") {
      setTextButton("Modo claro");
      document.querySelector("html").classList.add("dark");
    } else {
      setTextButton("Modo oscuro");
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  return (
    <button onClick={handleChangeTheme} className={className}>
      {textButton}
    </button>
  );
}

ThemeButton.propTypes = {
  className: PropTypes.string.isRequired,
};
