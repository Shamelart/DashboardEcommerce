import { useState } from 'react';
import Switch from 'react-switch';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleToggle() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <Switch
        onChange={handleToggle}
        checked={isDarkMode}
        uncheckedIcon={false}
        checkedIcon={false}
        onColor="#1f2937"
        offColor="#d1d5db"
        className={isDarkMode ? 'dark' : 'light'}
      />
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
      <style>
        {`
          body.${isDarkMode ? 'dark' : 'light'} {
            background-color: ${isDarkMode ? '#1f2937' : '#fff'};
            color: ${isDarkMode ? '#fff' : '#000'};
          }

          .switch.${isDarkMode ? 'dark' : 'light'} {
            background-color: ${isDarkMode ? '#d1d5db' : '#1f2937'};
          }
        `}
      </style>
    </div>
  );
}

export default DarkMode;