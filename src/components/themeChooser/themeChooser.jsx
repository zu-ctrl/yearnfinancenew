import React from 'react'
import LightThemeIcon from '../icons/lightThemeIcon'
import WaifuThemeIcon from '../icons/waifuThemeIcon'
import DarkThemeIcon from '../icons/darkThemeIcon'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '3px 4px',
      background: colors.chooser.bg,
      borderRadius: '30px',
      marginTop: '29px',
      height: '40px',
      cursor: 'pointer',
      '&:hover': {
        background: colors.chooser.bg,
      },
      '& .button': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '34px',
        borderRadius: '50%',
        width: '34px',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          background: colors.chooser.activeBg,
          boxShadow: colors.chooser.activeShadow,
        },
      },
    },
    active: {
      background: colors.chooser.activeBg,
      boxShadow: colors.chooser.activeShadow,
    },
  }
}

const ThemeChooser = ({ themeName, setTheme, classes, theme }) => {
  const colors = theme.themeColors
  console.log({ colors, theme })
  const handleChangeTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('yearnfinewTheme', newTheme)
  }
  return (
    <div className={classes.root}>
      <div
        className={themeName === 'light' ? `${classes.active} button` : 'button'}
        onClick={() => handleChangeTheme('light')}
      >
        <LightThemeIcon color={colors.chooser.iconLight} />
      </div>
      <div
        className={themeName === 'waifu' ? `${classes.active} button` : 'button'}
        onClick={() => handleChangeTheme('waifu')}
      >
        <WaifuThemeIcon colorBg={colors.chooser.iconWaifuBg} color={colors.chooser.iconWaifu} />
      </div>
      <div
        className={themeName === 'dark' ? `${classes.active} button` : 'button'}
        onClick={() => handleChangeTheme('dark')}
      >
        <DarkThemeIcon color={colors.chooser.iconDark} />
      </div>
    </div>
  )
}

export default withStyles(styles)(withTheme(ThemeChooser))
