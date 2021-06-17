import React, { useState, useEffect } from 'react';
import { ReactComponent as MoonIcon } from './assets/moon.svg';
import { ReactComponent as SunIcon } from './assets/sun2.svg';
import './switch.scss';

export default function ThemeToggle({}) {
  const [isEnabled, setIsEnabled] = useState(true);
  useEffect(() => {
    // Pass in the isEnabled state
    updateTheme(isEnabled);
  }, [isEnabled]);

  const toggleState = () => {
    setIsEnabled((prevState) => !prevState);
  };
  const updateTheme = (isDarkEnabled) => {
    // Get all available styles
    const styles = getComputedStyle(document.body);

    // Get the --black and --white variable values
    const black = styles.getPropertyValue('--black');
    const white = styles.getPropertyValue('--white');

    // Optional shorthand constant for accessing document.documentElement
    const docEl = document.documentElement;

    if (isDarkEnabled) {
      docEl.style.setProperty('--background', black);
      docEl.style.setProperty('--foreground', white);
      document.querySelector('html').classList.add('darkmode');
    } else {
      docEl.style.setProperty('--background', white);
      docEl.style.setProperty('--foreground', black);
      document.querySelector('html').classList.remove('darkmode');
    }
  };

  return (
    <label className="toggle-wrapper" htmlFor="toggle">
      <div className={`toggle ${isEnabled ? 'enabled' : 'disabled'}`}>
        <span className="hidden">{isEnabled ? 'Enable Light Mode' : 'Enable Dark Mode'}</span>
        <div className="icons">
          <SunIcon />
          <MoonIcon />
        </div>
        <input
          id="toggle"
          name="toggle"
          type="checkbox"
          checked={isEnabled}
          onClick={toggleState}
        />
      </div>
    </label>
  );
}
