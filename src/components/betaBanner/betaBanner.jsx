import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { Typography } from '@material-ui/core'

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    root: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      background: colors.beta.bg,
      boxShadow: colors.beta.shadow,
      padding: '9px 15px',
      zIndex: '2',
    },
    close: {
      position: 'absolute',
      top: '50%',
      right: '20px',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      width: '18px',
      height: '18px',
      '&::before, &::after': {
        position: 'absolute',
        left: '8px',
        content: '""',
        height: '19px',
        width: '2px',
        backgroundColor: colors.beta.close,
      },
      '&::before': {
        transform: 'rotate(40deg)',
      },
      '&::after': {
        transform: 'rotate(-40deg)',
      },
    },
    title: {
      color: colors.beta.color,
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '22px',
      marginLeft: '9px',
    },
    bottomLine: {
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  }
}

const BetaBanner = ({ classes, isBeta, setIsBeta, currentTheme }) => {
  const handleCloseBetaBanner = () => {
    setIsBeta(false)
    localStorage.setItem('yearnfiBeta', 'false')
  }
  if (!isBeta) return null
  return (
    <div className={classes.root}>
      <img alt='info icon' src={require(`../../assets/theme/info-banner-${currentTheme}.svg`)} />
      <Typography className={classes.title} variant={'h6'}>
        This project is in beta. Use at your own risk.
      </Typography>
      {currentTheme === 'dark' && (
        <img
          className={classes.bottomLine}
          alt='info icon'
          src={require('../../assets/theme/beta-linear-line-dark.svg')}
        />
      )}
      <div className={classes.close} onClick={handleCloseBetaBanner} />
    </div>
  )
}

export default withRouter(withStyles(styles)(BetaBanner))
