import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

export function ThemeButton( {className}) {

    const [theme, setTheme] = useState(()=>{
        if(window.matchMedia("(prefers-color-scheme: light)").matches)
          return "light"
    
        return "dark"
      });

      const handleChangeTheme= () => {
        setTheme(prevTheme => prevTheme== "dark"? "light": "dark")
      }

      useEffect (()=>{
        if(theme=="dark")
        {
            document.querySelector("html").classList.add("dark");
        }
          
        else
          document.querySelector("html").classList.remove("dark")
      }, [theme])

    return (
        <button onClick={handleChangeTheme} className={className}>Modo oscuro</button>
    )
}

ThemeButton.propTypes = {
  className: PropTypes.string.isRequired,
};