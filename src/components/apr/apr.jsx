import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography, TextField, Card } from '@material-ui/core'
import { withNamespaces } from 'react-i18next'
import AprIcon from '../icons/aprIcon'
import LinearLine from '../icons/linearLine'
import LoadingSpinner from '../loadingSpinner'

import { GET_AGGREGATED_YIELD, GET_AGGREGATED_YIELD_RETURNED } from '../../constants'

import Store from '../../stores'
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    root: {
      backgroundImage: colors.bgImage,
      backgroundColor: colors.bg,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom right',
      paddingBottom: '90px',
      width: '100%',
    },
    actionInput: {
      padding: '0px 0px 12px 0px',
      fontSize: '0.5rem',
    },
    investedContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      maxWidth: '1100px',
      width: '100%',
      margin: '40px auto 0',
    },
    intro: {
      padding: '36px',
      textAlign: 'center',
      width: '100%',
    },
    pairs: {
      padding: '42px 36px',
      borderRadius: '50px',
      border: '1px solid ' + colors.borderBlue,
      marginTop: '40px',
    },
    pair: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '5px 0',
    },
    name: {
      width: '60px',
      display: 'flex',
      alignItems: 'center',
      padding: '6px',
      position: 'absolute',
      top: 'auto',
      // background: '#fff',
      [theme.breakpoints.up('md')]: {
        width: '100px',
      },
    },
    apr: {
      flex: '1',
      padding: '6px 25px',
      width: '135px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '42px',
      '&:nth-child(2)': {
        marginLeft: '60px',
      },
      [theme.breakpoints.up('md')]: {
        '&:nth-child(2)': {
          marginLeft: '100px',
        },
      },
    },
    headerName: {
      flex: '1',
      fontWeight: 'bold',
      padding: '6px 25px',
      width: '60px',
      paddingBottom: '6px',
      [theme.breakpoints.up('md')]: {
        width: '100px',
      },
    },
    headerApr: {
      fontWeight: 'bold',
      flex: '1',
      padding: '6px 25px',
      width: '100px',
      paddingBottom: '6px',
    },
    headerValue: {
      fontWeight: 'bold',
      flex: '1',
      width: '135px',
      padding: '6px 25px',
      paddingBottom: '12px',
      '&:nth-child(2)': {
        marginLeft: '60px',
      },
      [theme.breakpoints.up('md')]: {
        '&:nth-child(2)': {
          marginLeft: '100px',
        },
      },
    },
    headerValueName: {
      fontWeight: 'bold',
      width: '60px',
      padding: '6px 25px',
      paddingBottom: '12px',
      position: 'absolute',
      top: 'auto',
      // background: '#fff',
      height: '42px',
      [theme.breakpoints.up('md')]: {
        width: '100px',
      },
    },
    aggregatedHeader: {
      textAlign: 'left',
      color: colors.page.apr.tableTh,
    },
    aggregatedHeaderVal: {
      textAlign: 'center',
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    tablesContainer: {
      display: 'flex',
    },
    tableContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: 'calc(100vw - 68px)',
      overflowX: 'auto',
    },
    assetIcon: {
      display: 'inline-block',
      verticalAlign: 'middle',
      borderRadius: '20px',
      height: '30px',
      width: '30px',
      textAlign: 'center',
      cursor: 'pointer',
      marginRight: '12px',
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '24px',
      lineHeight: '36px',
      color: colors.page.header.text,
      margin: '0 5px',
    },
    subtitle: {
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '24px',
      color: colors.page.header.text,
      margin: '0 0 10px',
    },
    description: {
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '24px',
      textAlign: 'center',
      color: colors.page.header.text,
      maxWidth: '600px',
      width: '100%',
      margin: '19px auto 0',
    },
    titleSpan: {
      color: colors.page.header.title,
      marginRight: '5px ',
    },
    searchField: {
      flex: 1,
      background: colors.page.filter.input.bg,
      borderRadius: '20px',
      border: colors.page.filter.input.border,
      boxShadow: colors.page.filter.input.boxShadow,
      minWidth: '300px',
      maxWidth: '300px',
      width: '100%',
      height: '40px',
      position: 'relative',
      '& input': {
        padding: '0 45px 0 12px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '40px',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '22px',
        color: colors.page.filter.input.color,
        '&::placeholder': {
          color: colors.page.filter.input.placeholder,
        },
      },
      '& .MuiInputBase-root': {
        paddingLeft: '10px',
      },
      '& fieldset': {
        border: '0',
        '&:hover': {
          borderColor: colors.page.filter.input.borderColor,
        },
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderWidth: '0',
        borderColor: colors.page.filter.input.borderColor,
        boxShadow: colors.page.filter.input.hoverShadow,
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: '0',
        borderColor: colors.page.filter.input.borderColor,
        boxShadow: colors.page.filter.input.hoverShadow,
      },
    },
    filters: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '44px',
      [theme.breakpoints.down('sm')]: {
        padding: '0px 12px',
      },
    },
    tradeContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      marginBottom: '30px',
      '& input': {
        background: colors.page.asset.input.bg,
        border: colors.page.asset.input.border,
        boxSizing: 'border-box',
        boxShadow: colors.page.asset.input.shadow,
        borderRadius: '20px',
        padding: '9px 9px 9px 15px',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '22px',
        letterSpacing: '0.02em',
        color: colors.page.asset.input.color,
        height: '40px',
        '&::-webkit-input-placeholder': {
          color: colors.page.asset.input.color,
          opacity: '1',
        },
        '&:-ms-input-placeholder': {
          color: colors.page.asset.input.color,
          opacity: 1,
        },
        '&::placeholder': {
          color: colors.page.asset.input.color,
          opacity: 1,
        },
      },
      '& fieldset': {
        border: '0',
        '&:hover': {
          borderWidth: '0',
        },
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderWidth: '0',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: '0',
      },
    },
    loadingSpinnerWrapper: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
    expansionPanel: {
      maxWidth: 'calc(100vw - 24px)',
      width: '100%',
      border: 'none',
      margin: '16px 0 0',
      borderRadius: '20px',
      padding: '30px',
    },
  }
}

class APR extends Component {
  constructor() {
    super()

    this.state = {
      yields: store.getStore('yields'),
      aggregatedYields: store.getStore('aggregatedYields'),
      aggregatedHeaders: store.getStore('aggregatedHeaders'),
      amount: '',
      amountError: false,
      loading: false,
    }
  }

  componentWillMount() {
    emitter.on(GET_AGGREGATED_YIELD_RETURNED, this.aggregatedYieldReturned)

    dispatcher.dispatch({ type: GET_AGGREGATED_YIELD, content: { amount: 0 } })
  }

  componentWillUnmount() {
    emitter.removeListener(GET_AGGREGATED_YIELD_RETURNED, this.aggregatedYieldReturned)
  }

  yieldReturned = (balances) => {
    this.setState({ yields: store.getStore('yields') })
    console.log(store.getStore('yields'))
  }

  dispatch(val) {
    dispatcher.dispatch({ type: GET_AGGREGATED_YIELD, content: { amount: val } })
  }

  aggregatedYieldReturned = (balances) => {
    this.setState({
      aggregatedYields: store.getStore('aggregatedYields'),
      aggregatedHeaders: store.getStore('aggregatedHeaders'),
    })
  }

  uniswapcommparrisonReturned = (balances) => {
    this.setState({ uniswapLiquidity: store.getStore('uniswapLiquidity') })
  }

  render() {
    const { classes, t, theme, currentTheme } = this.props
    const { amountError, amount, loading, aggregatedHeaders, aggregatedYields } = this.state
    const colors = theme.themeColors
    return (
      <div className={classes.root}>
        <div className={classes.investedContainer}>
          <div className={classes.titleContainer}>
            <Typography className={classes.title} variant="h2">
              How does
            </Typography>
            <AprIcon color={colors.page.header.icon} glowColor={colors.page.header.glow} />
            <Typography className={classes.title} variant="h2">
              <span className={classes.titleSpan}>Apr</span> work?
            </Typography>
          </div>
          {currentTheme === 'dark' && (
            <div className={classes.linearContainer}>
              <LinearLine color={colors.page.header.linear.color} middle={colors.page.header.linear.middle} />
            </div>
          )}
          <Typography className={classes.description} variant="h6">
            Need some text here! n is a yield aggregator for lending platforms that rebalances for highest yield during
            contract interaction. Below is a diagram of how things might work in practice. Go ahead and choose the asset
            you want to deposit...
          </Typography>
        </div>
        <div className={classes.tablesContainer}>
          <div className={classes.investedContainer}>
            <Card className={classes.expansionPanel}>
              <Typography className={classes.subtitle} variant="h3">
                How much do you want to invest?
              </Typography>
              <div className={classes.tradeContainer}>
                <TextField
                  fullWidth
                  id="amount"
                  value={amount}
                  error={amountError}
                  onChange={this.onChange}
                  disabled={loading}
                  label=""
                  size="small"
                  placeholder="0.00"
                  variant="outlined"
                />
              </div>
              {!aggregatedHeaders ||
              aggregatedHeaders.length === 0 ||
              !aggregatedYields ||
              aggregatedYields.length === 0 ? (
                <div className={classes.loadingSpinnerWrapper}>
                  <LoadingSpinner />
                </div>
              ) : (
                <table className={classes.tableContainer}>
                  <thead>{this.renderAggregatedHeader()}</thead>
                  <tbody>{this.renderAggregatedYields()}</tbody>
                </table>
              )}
            </Card>
          </div>
        </div>
      </div>
    )
  }

  renderAggregatedHeader = () => {
    const { classes, theme } = this.props
    const { aggregatedHeaders } = this.state
    const colors = theme.themeColors
    return (
      <tr className={classes.pair}>
        <th key={'token'} className={classes.headerValueName}>
          <Typography variant={'h3'} className={classes.aggregatedHeader}></Typography>
        </th>
        {aggregatedHeaders.map((header) => {
          return (
            <th key={header} className={classes.headerValue}>
              <Typography align="right" variant={'h4'} className={classes.aggregatedHeader}>
                {this.renderTableHeader(header)}
              </Typography>
            </th>
          )
        })}
      </tr>
    )
  }

  renderAggregatedYields = () => {
    const { classes, theme } = this.props
    const colors = theme.themeColors
    const { aggregatedYields } = this.state

    return aggregatedYields.map((y) => {
      const keys = Object.keys(y.apr)
      if (y.token === 'WBTC') {
        y.token = 'wBTC'
      }

      return (
        <tr key={y.token} className={classes.pair}>
          <td className={classes.name}>
            <div className={classes.assetIcon}>
              <img alt="" src={require('../../assets/' + y.token + '-logo.png')} height="30px" />
            </div>
            <Typography variant={'h4'} className={classes.aggregatedHeaderVal}>
              {y.token}
            </Typography>
          </td>
          {keys.map((key) => {
            let val = parseFloat(y.apr[key])
            if ((key === '_uniswap' || key === 'unicapr') && val !== 0) {
              val = val * 100 - 100
            } else {
              val = val * 100
            }

            return (
              <td key={key} className={classes.apr}>
                <Typography align="right" className={colors.header.text}>
                  {val === 0 ? '' : val.toFixed(4) + ' %'}
                </Typography>
              </td>
            )
          })}
        </tr>
      )
    })
  }

  onChange = (event) => {
    let val = []
    val[event.target.id] = event.target.value
    this.setState(val)
    setTimeout(this.dispatch(event.target.value))
  }

  renderTableHeader = (name) => {
    if (name === '_uniswap') {
      return 'Uniswap (APY)'
    } else if (name.startsWith('_compound')) {
      return 'Compound'
    } else if (name.startsWith('_fulcrum')) {
      return 'Fulcrum'
    } else if (name.startsWith('_aave')) {
      return 'Aave'
    } else if (name.startsWith('_dydx')) {
      return 'dYdX'
    } else if (name.startsWith('_ddex')) {
      return 'ddex'
    } else if (name.startsWith('_lendf')) {
      return 'dForce'
    } else {
      return name
    }
  }
}

export default withNamespaces()(withRouter(withStyles(styles, { withTheme: true })(APR)))
