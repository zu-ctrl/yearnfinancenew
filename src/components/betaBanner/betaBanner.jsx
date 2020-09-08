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
      padding: '9px 15px',
    },
    close: {
      position: 'absolute',
      top: '50%',
      right: '20px',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      padding: '4px',
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

const BetaBanner = ({ classes, isBeta, setIsBeta }) => {
  const handleCloseBetaBanner = () => {
    setIsBeta(false)
    localStorage.setItem('yearnfiBeta', 'false')
  }
  if (!isBeta) return null
  return (
    <div className={classes.root}>
      <img alt='info icon' src={require('../../assets/info_banner_icon.svg')} />
      <Typography className={classes.title} variant={'h6'}>
        This project is in beta. Use at your own risk.
      </Typography>
      <img className={classes.bottomLine} alt='info icon' src={require('../../assets/beta_linear_line.svg')} />
      <img
        onClick={handleCloseBetaBanner}
        className={classes.close}
        alt='info icon'
        src={require('../../assets/close_banner_icon.svg')}
      />
    </div>
  )
}

export default withRouter(withStyles(styles)(BetaBanner))
