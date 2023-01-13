import React, { createContext, useContext, useState } from "react";

//On créé le context
const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  // Au click, on récuperer l'objet avec tout false et on passe la bonne clé à true
  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };
  const [screenSize, setScreenSize] = useState(undefined);

  const lsCurrentMode = localStorage.getItem("themeMode")
    ? localStorage.getItem("themeMode")
    : "Light";
  const lsCurrentColor = localStorage.getItem("colorMode")
    ? localStorage.getItem("colorMode")
    : "#03C9D7";

  const [currentColor, setCurrentColor] = useState(lsCurrentColor);
  const [currentMode, setCurrentMode] = useState(lsCurrentMode);

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
    setThemeSettings(false);
  };

  const setMode = (e) => {
    console.log(e);
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    setThemeSettings(false);
  };

  const [themeSettings, setThemeSettings] = useState(false);

  return (
    // Ce sont les élément qu'on peut utiliser dans notre appli
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        setCurrentColor,
        currentMode,
        setCurrentMode,
        themeSettings,
        setThemeSettings,
        setMode,
        setColor,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
