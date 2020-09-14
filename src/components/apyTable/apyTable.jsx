import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { withNamespaces } from 'react-i18next'
import LinkIcon from '../icons/linkIcon'
import AssetLinear from '../icons/assetLinear'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '18px 16px',
      background: '#1D2430',
      alignItems: 'center',
    },
    lineContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    apy: {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '0.02em',
      color: '#91D5FF',
    },
    title: {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '22px',
      color: '#F3F4F5',
      display: 'flex',
    },
    description: {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '0.02em',
      color: '#FFF',
      marginLeft: '12px',
    },
    linkContainer: {
      display: 'flex',
      alignItems: 'center',
    },
  }
}

const ApyTable = ({ pyEarnData, classes }) => {
  return (
    <div>
      <div className={classes.lineContainer}>
        <AssetLinear color='#69C0FF' middle='#40A9FF' />
      </div>
      <div className={classes.root}>
        <Typography className={classes.apy} variant='h5'>
          APY
        </Typography>
        <Typography className={classes.title} variant='h6'>
          Dayly{' '}
          <span className={classes.description}>
            {!pyEarnData ? (
              <Skeleton style={{ width: '50px' }} />
            ) : pyEarnData.day === 'N/A' ? (
              'N/A'
            ) : (
              `${pyEarnData.day}%`
            )}{' '}
          </span>
        </Typography>
        <Typography className={classes.title} variant='h6'>
          Weekly{' '}
          <span className={classes.description}>
            {!pyEarnData ? (
              <Skeleton style={{ width: '50px' }} />
            ) : pyEarnData.day === 'N/A' ? (
              'N/A'
            ) : (
              `${pyEarnData.week}%`
            )}
          </span>
        </Typography>
        <Typography className={classes.title} variant='h6'>
          Monthly{' '}
          <span className={classes.description}>
            {!pyEarnData ? (
              <Skeleton style={{ width: '50px' }} />
            ) : pyEarnData.day === 'N/A' ? (
              'N/A'
            ) : (
              `${pyEarnData.month}%`
            )}
          </span>
        </Typography>
        <Typography className={classes.title} variant='h6'>
          Yearly{' '}
          <span className={classes.description}>
            {!pyEarnData ? (
              <Skeleton style={{ width: '50px' }} />
            ) : pyEarnData.day === 'N/A' ? (
              'N/A'
            ) : (
              `${pyEarnData.year}%`
            )}
          </span>
        </Typography>
        <div className={classes.linkContainer} onClick={() => window.open('/', '_blank')}>
          tutorial <LinkIcon color='red' />
        </div>
        <div className={classes.linkContainer} onClick={() => window.open('/', '_blank')}>
          strategy <LinkIcon color='red' />
        </div>
      </div>
      <div className={classes.lineContainer}>
        <AssetLinear color='#69C0FF' middle='#40A9FF' />
      </div>
    </div>
  )
}

export default withNamespaces()(withStyles(styles)(ApyTable))
