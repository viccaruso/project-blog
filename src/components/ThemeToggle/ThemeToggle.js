'use client';
import React from 'react';
import Cookie from 'js-cookie';
import { Sun, Moon } from 'react-feather';
import VisuallyHidden from '../VisuallyHidden';
import { DARK_TOKENS, LIGHT_TOKENS } from '@/constants';

function ThemeToggle({ initialTheme, className }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleClick() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    Cookie.set('color-theme', nextTheme, {
      expires: 365,
    });
    updateDOMColors(nextTheme);
  }

  function updateDOMColors(theme) {
    // pluck the root html element from DOM
    const root = document.documentElement;
    // grab appropriate color set
    const colors = theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    // overwrite data attribute on the root with new theme
    root.setAttribute('data-color-theme', theme);
    // iterate over each kv pair in token and set the root style
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <button className={className} onClick={handleClick}>
      {theme === 'dark' ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default ThemeToggle;
