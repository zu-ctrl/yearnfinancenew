import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Card, Typography, Button } from '@material-ui/core'

import Have from './have'
import Want from './want'
import Sending from './sending'
import ConversionRatios from './conversionRatios'
import Loader from '../loader'
import Snackbar from '../snackbar'
import ConnectWallet from '../connectWallet'
import ZapIcon from '../icons/zapIcon'
import LinearLine from '../icons/linearLine'

import {
  ERROR,
  GET_BALANCES,
  BALANCES_RETURNED,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  ZAP,
  ZAP_RETURNED,
  GET_CURV_BALANCE,
  GET_CURV_BALANCE_RETURNED,
  SWAP,
  SWAP_RETURNED,
  TRADE,
  TRADE_RETURNED,
  GET_BEST_PRICE,
  GET_BEST_PRICE_RETURNED,
} from '../../constants'

import { withNamespaces } from 'react-i18next'
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
      [theme.breakpoints.up('md')]: {
        minHeight: 'calc(100vh - 376px)',
      },
      [theme.breakpoints.down('md')]: {
        paddingLeft: '10px',
        paddingRight: '10px',
      },
    },
    investedContainerLoggedOut: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '100%',
      marginTop: '40px',
      [theme.breakpoints.up('md')]: {
        minWidth: '900px',
      },
    },
    iHaveContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      maxWidth: '395px',
      width: '100%',
      padding: '10px 30px 30px',
      borderRadius: '20px',
      overflow: 'inherit',
      [theme.breakpoints.down('xs')]: {
        padding: '10px 15px 15px',
      },
    },
    conversionRatioContainer: {
      width: '100%',
      display: 'flex',
    },
    sendingContainer: {
      flex: 1,
      display: 'flex',
    },
    receivingContainer: {
      flex: 1,
      display: 'flex',
    },
    feesContainer: {
      display: 'flex',
    },
    card: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: '400px',
      justifyContent: 'center',
      minWidth: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '60px',
      [theme.breakpoints.down('xs')]: {
        marginTop: '40px',
      },
    },
    intro: {
      width: '100%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: '32px',
      maxWidth: '500px',
    },
    actualIntro: {
      paddingBottom: '32px',
    },
    introCenter: {
      minWidth: '100%',
      textAlign: 'center',
      padding: '24px 0px',
    },
    investedContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      maxWidth: '870px',
      width: '100%',
      margin: '40px auto 0',
    },
    connectContainer: {
      padding: '12px',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      maxWidth: '450px',
      [theme.breakpoints.up('md')]: {
        width: '450',
      },
    },
    actionButton: {
      background: colors.page.asset.button.bg,
      boxShadow: colors.page.asset.button.shadow,
      border: colors.button.border,
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '10px 3px',
      justifyContent: 'center',
      margin: '35px 5px 0',
      width: '100%',
      '&:last-of-type': {
        marginRight: '0',
      },
      '&:first-of-type': {
        marginLeft: '0',
      },
      '&:hover': {
        background: colors.page.asset.button.bg,
        border: colors.button.border,
      },
    },
    buttonText: {
      fontWeight: '700',
      color: 'white',
    },
    sepperator: {
      borderBottom: '1px solid #E1E1E1',
      minWidth: '100%',
      marginBottom: '24px',
      marginTop: '24px',
    },
    addressContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      overflow: 'hidden',
      flex: 1,
      whiteSpace: 'nowrap',
      fontSize: '0.83rem',
      textOverflow: 'ellipsis',
      cursor: 'pointer',
      padding: '28px 30px',
      borderRadius: '50px',
      border: '1px solid ' + colors.borderBlue,
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        width: '100%',
      },
    },
    disaclaimer: {
      padding: '12px',
      border: '1px solid rgb(174, 174, 174)',
      borderRadius: '0.75rem',
      marginBottom: '24px',
      background: colors.white,
    },
    walletAddress: {
      padding: '0px 12px',
    },
    walletTitle: {
      flex: 1,
      color: colors.darkGray,
    },
    grey: {
      color: colors.darkGray,
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
    linearContainer: {
      maxWidth: '379px',
      width: '100%',
      minHeight: '69px',
      display: 'flex',
      alignItems: 'flex-start',
      margin: '13px auto -68px',
      background: colors.page.header.bgGlow,
    },
    lineaFormContainer: {
      maxWidth: '379px',
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      margin: '16px auto 0',
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
    expansionPanel: {
      maxWidth: 'calc(100vw - 24px)',
      width: '100%',
      border: 'none',
      margin: '20px 0 0',
      borderRadius: '20px',
    },
  }
}

class Zap extends Component {
  constructor() {
    super()

    const account = store.getStore('account')

    this.state = {
      account: account,
      assets: store.getStore('assets').filter((asset) => asset.curve === true),
      curveContracts: store.getStore('curveContracts'),
      sendAsset: null,
      receiveAsset: null,
      sendAmount: '',
      // receiveAmount: ""
      bestPrice: 0,
    }

    if (account && account.address) {
      dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      dispatcher.dispatch({ type: GET_CURV_BALANCE, content: {} })
    }
  }

  componentWillMount() {
    emitter.on(ERROR, this.errorReturned)
    emitter.on(BALANCES_RETURNED, this.balancesReturned)
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected)
    emitter.on(ZAP_RETURNED, this.zapReturned)
    emitter.on(SWAP_RETURNED, this.swapReturned)
    emitter.on(TRADE_RETURNED, this.tradeReturned)
    emitter.on(GET_CURV_BALANCE_RETURNED, this.getCurvBalanceReturned)
    emitter.on(GET_BEST_PRICE_RETURNED, this.getBestPriceReturned)
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned)
    emitter.removeListener(BALANCES_RETURNED, this.balancesReturned)
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected)
    emitter.removeListener(ZAP_RETURNED, this.zapReturned)
    emitter.removeListener(SWAP_RETURNED, this.swapReturned)
    emitter.removeListener(TRADE_RETURNED, this.tradeReturned)
    emitter.removeListener(GET_CURV_BALANCE_RETURNED, this.getCurvBalanceReturned)
    emitter.removeListener(GET_BEST_PRICE_RETURNED, this.getBestPriceReturned)
  }

  swapReturned = (txHash) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null }
    this.setState(snackbarObj)
    this.setState({ loading: false, sendAmount: '', sendAsset: null, receiveAsset: null })
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: txHash, snackbarType: 'Hash' }
      that.setState(snackbarObj)
    })
  }

  zapReturned = (txHash) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null }
    this.setState(snackbarObj)
    this.setState({ loading: false, sendAmount: '', sendAsset: null, receiveAsset: null })
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: txHash, snackbarType: 'Hash' }
      that.setState(snackbarObj)
    })
  }

  tradeReturned = (txHash) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null }
    this.setState(snackbarObj)
    this.setState({ loading: false, sendAmount: '', sendAsset: null, receiveAsset: null })
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: txHash, snackbarType: 'Hash' }
      that.setState(snackbarObj)
    })
  }

  balancesReturned = (balances) => {
    this.setState({ assets: store.getStore('assets').filter((asset) => asset.curve === true) })
    this.setSendAsset(store.getStore('assets').filter((asset) => asset.curve === true)[0])
  }

  getCurvBalanceReturned = (balance) => {
    this.setState({ curveContracts: store.getStore('curveContracts') })
  }

  getBestPriceReturned = (price) => {
    this.setState({ bestPrice: price })
  }

  refresh() {
    dispatcher.dispatch({ type: GET_BALANCES, content: {} })
    dispatcher.dispatch({ type: GET_CURV_BALANCE, content: {} })
  }

  connectionConnected = () => {
    const { t } = this.props

    this.setState({ account: store.getStore('account') })

    dispatcher.dispatch({ type: GET_BALANCES, content: {} })
    dispatcher.dispatch({ type: GET_CURV_BALANCE, content: {} })

    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: t('Unlock.WalletConnected'), snackbarType: 'Info' }
      that.setState(snackbarObj)
    })
  }

  connectionDisconnected = () => {
    this.setState({ account: store.getStore('account') })
  }

  errorReturned = (error) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null }
    this.setState(snackbarObj)
    this.setState({ loading: false })
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: error.toString(), snackbarType: 'Error' }
      that.setState(snackbarObj)
    })
  }

  render() {
    const { classes, t, currentTheme, theme } = this.props
    const {
      assets,
      curveContracts,
      sendAsset,
      sendAmount,
      receiveAsset,
      // receiveAmount,
      account,
      loading,
      snackbarMessage,
      bestPrice,
    } = this.state
    const colors = theme.themeColors

    if (!account || !account.address) {
      return <ConnectWallet currentTheme={currentTheme} />
    }

    return (
      <div className={classes.root}>
        <div className={classes.investedContainer}>
          <div className={classes.titleContainer}>
            <Typography className={classes.title} variant='h2'>
              {t('zap.title1')}
            </Typography>
            <ZapIcon color={colors.page.header.icon} glowColor={colors.page.header.glow} />
            <Typography className={classes.title} variant='h2'>
              <span className={classes.titleSpan}>Zap</span> {t('zap.title2')}?
            </Typography>
          </div>
          {currentTheme === 'dark' && (
            <div className={classes.linearContainer}>
              <LinearLine color={colors.page.header.linear.color} middle={colors.page.header.linear.middle} />
            </div>
          )}
          <Typography className={classes.description} variant='h6'>
            {t('zap.desc')}
          </Typography>
        </div>
        <div className={classes.card}>
          <Card className={classes.iHaveContainer}>
            <div className={classes.expansionPanel}>
              <Have
                assets={assets}
                curveContracts={curveContracts}
                setSendAsset={this.setSendAsset}
                sendAsset={sendAsset}
                setSendAmountPercent={this.setSendAmountPercent}
                loading={loading}
              />
              <Sending
                sendAsset={sendAsset}
                sendAmount={sendAmount}
                setSendAmount={this.setSendAmount}
                setSendAmountPercent={this.setSendAmountPercent}
                loading={loading}
              />
              <div className={classes.lineaFormContainer}>
                <LinearLine
                  id={colors.page.header.linear.id}
                  color={colors.page.header.linear.color}
                  middle={colors.page.header.linear.middle}
                />
              </div>
              {sendAsset && sendAsset.symbol === 'ETH' && (
                <ConversionRatios bestPrice={bestPrice} sendAsset={sendAsset} receiveAsset={receiveAsset} />
              )}
              <Want
                assets={assets}
                curveContracts={curveContracts}
                receiveAsset={receiveAsset}
                setReceiveAsset={this.setReceiveAsset}
                sendAsset={sendAsset}
                loading={loading}
                bestPrice={bestPrice}
                sendAmount={sendAmount}
              />

              {sendAsset &&
                receiveAsset &&
                !(['crvV3', 'crvV4'].includes(receiveAsset.id) && ['crvV1', 'crvV2', 'crvV3'].includes(sendAsset.id)) &&
                !(sendAsset && sendAsset.symbol === 'ETH') && (
                  <Button
                    className={classes.actionButton}
                    variant='outlined'
                    color='primary'
                    disabled={loading || !sendAsset || !receiveAsset || !sendAmount || sendAmount === ''}
                    onClick={this.onZap}
                    fullWidth
                  >
                    <Typography className={classes.buttonText} variant={'h5'} color='secondary'>
                      {t('zap.zap')}
                    </Typography>
                  </Button>
                )}
              {sendAsset &&
                receiveAsset &&
                ['crvV3', 'crvV4'].includes(receiveAsset.id) &&
                ['crvV1', 'crvV2', 'crvV3'].includes(sendAsset.id) && (
                  <Button
                    className={classes.actionButton}
                    variant='outlined'
                    color='primary'
                    disabled={loading || !sendAsset || !receiveAsset || !sendAmount || sendAmount === ''}
                    onClick={this.onSwap}
                    fullWidth
                  >
                    <Typography className={classes.buttonText} variant={'h5'} color='secondary'>
                      {t('zap.swap')}
                    </Typography>
                  </Button>
                )}
              {sendAsset && sendAsset.symbol === 'ETH' && (
                <Button
                  className={classes.actionButton}
                  variant='outlined'
                  color='primary'
                  disabled={loading || !sendAsset || !receiveAsset || !sendAmount || sendAmount === ''}
                  onClick={this.onTrade}
                  fullWidth
                >
                  <Typography className={classes.buttonText} variant={'h5'} color='secondary'>
                    {t('zap.trade')}
                  </Typography>
                </Button>
              )}
            </div>
          </Card>
          <div className={classes.introCenter}></div>
        </div>
        {snackbarMessage && this.renderSnackbar()}
        {loading && <Loader />}
      </div>
    )
  }

  onZap = () => {
    this.setState({ amountError: false })

    const { sendAmount, sendAsset, receiveAsset } = this.state

    if (!sendAmount || isNaN(sendAmount) || sendAmount <= 0 || parseFloat(sendAmount) > sendAsset.balance) {
      this.setState({ amountError: true })
      return false
    }

    this.setState({ loading: true })
    dispatcher.dispatch({
      type: ZAP,
      content: { amount: sendAmount, sendAsset: sendAsset, receiveAsset: receiveAsset },
    })
  }

  onSwap = () => {
    this.setState({ amountError: false })

    const { sendAmount, sendAsset, receiveAsset } = this.state

    if (!sendAmount || isNaN(sendAmount) || sendAmount <= 0 || parseFloat(sendAmount) > sendAsset.balance) {
      this.setState({ amountError: true })
      return false
    }

    this.setState({ loading: true })
    dispatcher.dispatch({
      type: SWAP,
      content: { amount: sendAmount, sendAsset: sendAsset, receiveAsset: receiveAsset },
    })
  }

  onTrade = () => {
    this.setState({ amountError: false })

    const { sendAmount, sendAsset, receiveAsset } = this.state

    if (!sendAmount || isNaN(sendAmount) || sendAmount <= 0 || parseFloat(sendAmount) > sendAsset.balance) {
      this.setState({ amountError: true })
      return false
    }

    this.setState({ loading: true })
    dispatcher.dispatch({
      type: TRADE,
      content: { amount: sendAmount, sendAsset: sendAsset, receiveAsset: receiveAsset },
    })
  }

  setReceiveAsset = (receiveAsset) => {
    this.setState({ receiveAsset })
  }

  setSendAsset = (sendAsset) => {
    let receiveAsset = this.state.receiveAsset

    if (['ETH'].includes(sendAsset.symbol) && sendAsset.balance > 0) {
      receiveAsset = store.getStore('assets').filter((asset) => {
        return asset.id === 'DAIv2'
      })[0]
      dispatcher.dispatch({
        type: GET_BEST_PRICE,
        content: { amount: sendAsset.balance, sendAsset: sendAsset, receiveAsset: receiveAsset },
      })
    }

    const balance = sendAsset.balance
    let sendAmount = (balance * 100) / 100

    sendAmount = Math.floor(sendAmount * 10000) / 10000

    this.setState({ sendAsset, receiveAsset, sendAmount: sendAmount.toFixed(4) })
  }

  setSendAmountPercent = (percent) => {
    const { sendAsset, receiveAsset } = this.state
    console.log({ sendAsset, receiveAsset })
    const balance = sendAsset.balance
    let sendAmount = (balance * percent) / 100

    sendAmount = Math.floor(sendAmount * 10000) / 10000
    this.setState({ sendAmount: sendAmount.toFixed(4) })

    if (['ETH'].includes(sendAsset.symbol) && sendAmount > 0) {
      dispatcher.dispatch({
        type: GET_BEST_PRICE,
        content: { amount: sendAmount, sendAsset: sendAsset, receiveAsset: receiveAsset },
      })
    }
  }

  setSendAmount = (amount) => {
    this.setState({ sendAmount: amount })

    const { sendAsset, receiveAsset } = this.state

    if (['ETH'].includes(sendAsset.symbol) && amount > 0) {
      dispatcher.dispatch({
        type: GET_BEST_PRICE,
        content: { amount: amount, sendAsset: sendAsset, receiveAsset: receiveAsset },
      })
    }
  }

  renderSnackbar = () => {
    var { snackbarType, snackbarMessage } = this.state
    return <Snackbar type={snackbarType} message={snackbarMessage} open={true} />
  }
}

export default withNamespaces()(withRouter(withStyles(styles, { withTheme: true })(Zap)))
