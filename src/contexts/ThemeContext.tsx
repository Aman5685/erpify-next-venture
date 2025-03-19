
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  bgTheme: string;
  changeBgTheme: (theme: string) => void;
};

const defaultContext: ThemeContextType = {
  bgTheme: 'bg-light-blue',
  changeBgTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bgTheme, setBgTheme] = useState<string>(
    localStorage.getItem('bgTheme') || 'bg-light-blue'
  );

  const changeBgTheme = (theme: string) => {
    setBgTheme(theme);
    localStorage.setItem('bgTheme', theme);
    
    // Apply the theme to the html element
    const html = document.documentElement;
    html.className = html.className
      .replace(/bg-gradient-\w+/g, '')
      .replace(/bg-light-blue/g, '')
      .trim();
    html.classList.add(theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('bgTheme');
    if (savedTheme) {
      setBgTheme(savedTheme);
      const html = document.documentElement;
      html.className = html.className
        .replace(/bg-gradient-\w+/g, '')
        .replace(/bg-light-blue/g, '')
        .trim();
      html.classList.add(savedTheme);
    } else {
      // If no saved theme, set default to bg-light-blue
      setBgTheme('bg-light-blue');
      localStorage.setItem('bgTheme', 'bg-light-blue');
      document.documentElement.classList.add('bg-light-blue');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ bgTheme, changeBgTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
