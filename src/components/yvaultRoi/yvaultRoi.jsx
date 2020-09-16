import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import { Typography } from '@material-ui/core'

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    container: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        alignItems: 'flex-start',
      },
    },
    descriptionContainer: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
      },
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '80px',
      [theme.breakpoints.down('xs')]: {
        minWidth: '45px',
        marginTop: '10px',
      },
    },
    valueContainer: {
      minWidth: '207px',
      maxWidth: 'fit-content',
      width: '100%',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '0.02em',
      color: colors.page.asset.apy.title,
    },
    cellTitle: {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '22px',
      color: colors.page.asset.apy.cellTitle,
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        margin: '10px 0 0 15px',
        display: 'inline-flex',
      },
    },
    description: {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '0.02em',
      color: colors.page.asset.apy.description,
      marginLeft: '8px',
    },
  }
}

const YvaultRoi = ({ theme, address, classes }) => {
  const [yvaultRoiData, setYvaultRoiData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const {
    themeColors: { colors },
  } = theme

  const getDataProp = (propertyName) => {
    if (isLoading) return <Skeleton style={{ display: 'inline-block', width: '50px' }} />
    return yvaultRoiData && yvaultRoiData[propertyName] ? yvaultRoiData[propertyName] : 'N/A'
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const {
        body: { data: newData },
      } = (
        await axios({
          method: 'POST',
          url: '/api/yvaultroi',
          data: { address },
        })
      ).data
      setYvaultRoiData(newData)
      setIsLoading(false)
    })()
  }, [address])
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <Typography className={classes.title} variant='h5'>
          yVault
        </Typography>
        <Typography className={classes.title} variant='h5'>
          ROI
        </Typography>
      </div>
      <div className={classes.descriptionContainer}>
        <div className={classes.valueContainer}>
          <Typography className={classes.cellTitle} variant='h5'>
            Earnings:<span className={classes.description}>{getDataProp('earnings')}</span>
          </Typography>
          <Typography className={classes.cellTitle} variant='h5'>
            Net Deposits:<span className={classes.description}>{getDataProp('netDeposits')}</span>
          </Typography>
        </div>
        <div className={classes.valueContainer}>
          <Typography className={classes.cellTitle} variant='h5'>
            IRR:<span className={classes.description}>{getDataProp('irr')}</span>
          </Typography>
          <Typography className={classes.cellTitle} variant='h5'>
            IRR Annualized:<span className={classes.description}>{getDataProp('irrAnnualized')}</span>
          </Typography>
        </div>
        <div className={classes.valueContainer}>
          <Typography className={classes.cellTitle} variant='h5'>
            Simple Return:<span className={classes.description}>{getDataProp('simpleReturn')}</span>
          </Typography>
          <Typography className={classes.cellTitle} variant='h5'>
            Simple Return Annualized:
            <span className={classes.description}>{getDataProp('simpleReturnAnnualized')}</span>
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(withTheme(YvaultRoi))
