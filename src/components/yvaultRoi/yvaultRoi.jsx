import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

const styles = (theme) => {
  const colors = theme.themeColors
  return {}
}

const YvaultRoi = ({ theme, address = '0x04e67b3cd04a422106b419494f6e0ed585c83758' }) => {
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
      <h3>yVault ROI</h3>
      <ul>
        <li>Earnings: {getDataProp('earnings')}</li>
        <li>IRR: {getDataProp('irr')}</li>
        <li>IRR Annualized: {getDataProp('irrAnnualized')}</li>
        <li>Net Deposits: {getDataProp('netDeposits')}</li>
        <li>Simple Return: {getDataProp('simpleReturn')}</li>
      </ul>
    </div>
  )
}

export default withStyles(styles)(withTheme(YvaultRoi))
