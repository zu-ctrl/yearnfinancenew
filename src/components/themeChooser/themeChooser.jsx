import React from 'react'
import LightThemeIcon from '../icons/lightThemeIcon'
import WaifuThemeIcon from '../icons/waifuThemeIcon'
import DarkThemeIcon from '../icons/darkThemeIcon'

const ThemeChooser = ({ theme, setTheme }) => {
  const handleChangeTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('yearnfinewTheme', newTheme)
  }
  return (
    <div>
      <button disabled={theme === 'light'} onClick={() => handleChangeTheme('light')}>
        <LightThemeIcon color="red" />
      </button>
      <button disabled={theme === 'waifu'} onClick={() => handleChangeTheme('waifu')}>
        <WaifuThemeIcon colorBg="blue" color="red" />
      </button>
      <button disabled={theme === 'dark'} onClick={() => handleChangeTheme('dark')}>
        <DarkThemeIcon colorBg="blue" color="red" />
      </button>
    </div>
  )
}

export default ThemeChooser
