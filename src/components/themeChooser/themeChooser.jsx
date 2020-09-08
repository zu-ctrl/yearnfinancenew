import React from 'react'

const ThemeChooser = ({ theme, setTheme }) => {
  const handleChangeTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('yearnfinewTheme', newTheme)
  }
  return (
    <div style={{ position: 'fixed', bottom: '25px', right: '25px' }}>
      <button disabled={theme === 'light'} onClick={() => handleChangeTheme('light')}>
        light
      </button>
      <button disabled={theme === 'waifu'} onClick={() => handleChangeTheme('waifu')}>
        waifu
      </button>
      <button disabled={theme === 'dark'} onClick={() => handleChangeTheme('dark')}>
        dark
      </button>
    </div>
  )
}

export default ThemeChooser
