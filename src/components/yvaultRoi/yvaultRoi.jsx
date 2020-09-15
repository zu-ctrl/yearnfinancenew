import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

const styles = (theme) => {
  const colors = theme.themeColors
  return {}
}

const YvaultRoi = ({ theme, address }) => {
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
  }, [])
  return (
    <div style={{ color: 'black' }}>
      <div style={{ display: 'inline-block' }}>yVault ROI</div>
      <div style={{ paddingLeft: '10px', display: 'inline-block' }}>
        <div style={{ display: 'block' }}>Earnings: {getDataProp('earnings')}</div>
        <div style={{ display: 'block' }}>Net Deposits: {getDataProp('netDeposits')}</div>
      </div>
      <div style={{ paddingLeft: '10px', display: 'inline-block' }}>
        <div style={{ display: 'block' }}>IRR: {getDataProp('irr')}</div>
        <div style={{ display: 'block' }}>IRR Annualized: {getDataProp('irrAnnualized')}</div>
      </div>

      <div style={{ paddingLeft: '10px', display: 'inline-block' }}>
        <div style={{ display: 'block' }}>Simple Return: {getDataProp('simpleReturn')}</div>
        <div style={{ display: 'block' }}>Simple Return Annualized: {getDataProp('simpleReturnAnnualized')}</div>
      </div>
    </div>
  )
}

export default withStyles(styles)(withTheme(YvaultRoi))
