import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    loadingSpinnerWrapper: {
      display: 'inline-block',
      transform: 'translateZ(1px)',
    },
    loadingSpinnerInner: {
      display: 'inline-block',
      width: '64px',
      height: '64px',
      margin: '8px',
      borderRadius: '50%',
      backgroundImage: `url("${require('../../assets/YFI-logo.png')}")`,
      backgroundSize: '100%',
      animation: '$loadeing-spinner 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite',
    },
    '@keyframes loadeing-spinner': {
      '0%, 100%': {
        animationTimingFunction: 'cubic-bezier(0.5, 0, 1, 0.5)',
      },
      '0%': {
        transform: 'rotateY(0deg)',
      },
      '50%': {
        transform: 'rotateY(1800deg)',
        animationTimingFunction: 'cubic-bezier(0, 0.5, 0.5, 1)',
      },
      '100%': {
        transform: 'rotateY(3600deg)',
      },
    },
  }
}

const LoadingSpinner = ({ classes, theme }) => {
  const colors = theme.themeColors
  return (
    <div className={classes.loadingSpinnerWrapper}>
      <div className={classes.loadingSpinnerInner}></div>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(LoadingSpinner)
