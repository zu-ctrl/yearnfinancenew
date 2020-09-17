import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography, TextField, Button, Slider } from '@material-ui/core'
import ActionButton from '../icons/actionButton'
import ActionButtonRotate from '../icons/actionButtonRotate'

import {
  ERROR,
  DEPOSIT_VAULT,
  DEPOSIT_VAULT_RETURNED,
  WITHDRAW_VAULT,
  WITHDRAW_VAULT_RETURNED,
  DEPOSIT_ALL_VAULT,
  DEPOSIT_ALL_VAULT_RETURNED,
  WITHDRAW_ALL_VAULT,
  WITHDRAW_ALL_VAULT_RETURNED,
} from '../../constants'

import Store from '../../stores'
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    value: {
      cursor: 'pointer',
      fontSize: '12px',
      lineHeight: '20px',
      color: colors.page.asset.color,
      fontWeight: 'normal',
    },
    balances: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      marginTop: '5px',
      cursor: 'pointer',
    },
    actionsContainer: {
      maxWidth: '750px',
      width: '100%',
      margin: '24px auto 15px',
      display: 'flex',
      justifyContent: 'space-between',
      flex: '1',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    title: {
      paddingRight: '24px',
    },
    actionButton: {
      background: colors.page.asset.button.bg,
      boxShadow: colors.page.asset.button.shadow,
      border: 'none',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '6px 3px',
      justifyContent: 'center',
      margin: '20px 5px 0',
      width: '100%',
      '&:last-of-type': {
        marginRight: '0',
      },
      '&:first-of-type': {
        marginLeft: '0',
      },
    },
    tradeContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '350px',
      width: '100%',
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
      [theme.breakpoints.down('sm')]: {
        padding: '0 5px',
      },
      [theme.breakpoints.down('xs')]: {
        padding: '0',
        maxWidth: '500px',
        '&:last-of-type': {
          marginTop: '24px',
        },
      },
    },
    scaleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0px 0px 12px 0px',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    scale: {
      minWidth: '10px',
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      color: colors.page.asset.input.color,
      marginLeft: '11px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '14px',
      },
    },
    headingContainer: {
      width: '100%',
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    heading: {
      paddingBottom: '12px',
      flex: 1,
      flexShrink: 0,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    right: {
      textAlign: 'right',
    },
    buttons: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      '& .disabled': {
        background: colors.page.asset.button.disabled.bg,
        border: 'none',
        boxShadow: 'none',
        '& h5': {
          color: colors.page.asset.button.disabled.color,
        },
      },
      '& h5': {
        color: colors.page.asset.button.disabled.color,
      },
      '& .MuiButton-outlinedPrimary:hover': {
        background: colors.page.asset.button.bg,
        border: 'none',
      },
    },
    disabledContainer: {
      width: '100%',
      paddingTop: '16px',
      textAlign: 'center',
    },
    disabledText: {
      fontWeight: 'normal',
      fontSize: '12px',
      lineHeight: '20px',
      textAlign: 'center',
      color: colors.page.asset.color,
    },
    sliderContainer: {
      width: '98%',
      marginTop: '36px',
      '& .MuiSlider-rail': {
        height: '8px',
        borderRadius: '12px',
        background: colors.page.asset.slider.rail,
        width: '102%',
      },
      '& .MuiSlider-track': {
        height: '8px',
        borderRadius: '12px',
        background: colors.page.asset.slider.track,
      },
      '& .MuiSlider-thumb': {
        color: 'transparent',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        filter: colors.page.asset.slider.thumb.filter,
        background: colors.page.asset.slider.thumb.bg,
        border: colors.page.asset.slider.thumb.border,
        boxSizing: 'border-box',
        top: '50%',
        marginTop: '2px',
        transform: 'translateY(-50%)',
        marginLeft: '-6px',
      },
      '& .MuiSlider-root': {
        color: colors.page.asset.slider.mark,
      },
      '& .MuiSlider-markActive': {
        backgroundColor: colors.page.asset.slider.activeMark,
        opacity: '1',
      },
      '& .MuiSlider-mark': {
        visibility: 'hidden',
        height: '8px',
        width: '8px',
        borderRadius: '50%',
        '&:nth-child(25n + 4)': {
          visibility: 'visible',
        },
      },
      '& .MuiSlider-valueLabel': {
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '22px',
        textAlign: 'center',
        letterSpacing: '0.02em',
        color: colors.page.asset.slider.value.color,
        textShadow: colors.page.asset.slider.value.glow,
        marginLeft: '11px',
        top: '-23px',
        display: 'flex',
        alignItems: 'center',
        '& span': {
          backgroundColor: 'transparent',
          width: 'max-content',
          color: colors.page.asset.slider.value.color,
        },
        '&::after': {
          content: '"%"',
        },
      },
      [theme.breakpoints.down('md')]: {
        width: '90%',
      },
      [theme.breakpoints.down('xs')]: {
        width: '98%',
      },
    },
    percentContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: '-2px',
      '& h5:nth-child(2n)': {
        marginRight: '-3px',
      },
      '& h5:nth-child(3n)': {
        marginRight: '-5px',
      },
      '& h5:nth-child(4n)': {
        marginRight: '-16px',
      },
      '& h5:last-of-type': {
        marginRight: '-10px',
      },
      [theme.breakpoints.down('md')]: {
        width: '90%',
      },
      [theme.breakpoints.down('xs')]: {
        width: '98%',
      },
    },
    percent: {
      fontWeight: colors.page.asset.slider.percentWeight,
      fontSize: '12px',
      lineHeight: '20px',
      color: colors.page.asset.slider.percent,
      cursor: 'pointer',
    },
  }
}

class Asset extends Component {
  constructor() {
    super()

    this.state = {
      amount: '',
      amountError: false,
      redeemAmount: '',
      redeemAmountError: false,
      account: store.getStore('account'),
      leftSlider: 0,
      rightSlider: 0,
    }
  }

  componentWillMount() {
    emitter.on(DEPOSIT_VAULT_RETURNED, this.depositReturned)
    emitter.on(WITHDRAW_VAULT_RETURNED, this.withdrawReturned)
    emitter.on(DEPOSIT_ALL_VAULT_RETURNED, this.depositReturned)
    emitter.on(WITHDRAW_ALL_VAULT_RETURNED, this.withdrawReturned)
    emitter.on(ERROR, this.errorReturned)
  }

  componentWillUnmount() {
    emitter.removeListener(DEPOSIT_VAULT_RETURNED, this.depositReturned)
    emitter.removeListener(WITHDRAW_VAULT_RETURNED, this.withdrawReturned)
    emitter.removeListener(DEPOSIT_ALL_VAULT_RETURNED, this.depositReturned)
    emitter.removeListener(WITHDRAW_ALL_VAULT_RETURNED, this.withdrawReturned)
    emitter.removeListener(ERROR, this.errorReturned)
  }

  depositReturned = () => {
    this.setState({ loading: false, amount: '' })
  }

  withdrawReturned = (txHash) => {
    this.setState({ loading: false, redeemAmount: '' })
  }

  errorReturned = (error) => {
    this.setState({ loading: false })
  }

  handleChangeLeftSlider = (value) => {
    this.setState({ leftSlider: value })
    this.setAmount(value)
  }

  handleChangeRightSlider = (value) => {
    this.setState({ rightSlider: value })
    this.setRedeemAmount(value)
  }

  render() {
    const { classes, asset, theme } = this.props
    const { amount, amountError, redeemAmount, redeemAmountError, loading, leftSlider, rightSlider } = this.state
    return (
      <div className={classes.actionsContainer}>
        <div className={classes.tradeContainer}>
          <TextField
            fullWidth
            id='amount'
            value={amount}
            error={amountError}
            onChange={this.onChange}
            disabled={loading}
            placeholder='0.00'
            variant='outlined'
            onKeyDown={this.inputKeyDown}
          />
          <div className={classes.balances}>
            <Typography
              variant='h4'
              onClick={() => {
                this.setAmount(100)
              }}
              className={classes.value}
              noWrap
            >
              {`Wallet Balance: ${asset.balance ? (Math.floor(asset.balance * 10000) / 10000).toFixed(4) : '0.0000'} ${
                asset.tokenSymbol ? asset.tokenSymbol : asset.symbol
              }`}
            </Typography>
          </div>
          <div className={classes.sliderContainer}>
            <Slider
              value={leftSlider}
              aria-labelledby='discrete-slider'
              step={1}
              marks
              min={0}
              max={100}
              valueLabelDisplay='on'
              disabled={loading || asset.disabled}
              onChange={(_, value) => this.handleChangeLeftSlider(value)}
            />
          </div>
          <div className={classes.percentContainer}>
            <Typography variant='h5' className={classes.percent} onClick={() => this.handleChangeLeftSlider(0)}>
              0%
            </Typography>
            <Typography variant='h5' className={classes.percent} onClick={() => this.handleChangeLeftSlider(25)}>
              25%
            </Typography>
            <Typography variant='h5' className={classes.percent} onClick={() => this.handleChangeLeftSlider(50)}>
              50%
            </Typography>
            <Typography variant='h5' className={classes.percent} onClick={() => this.handleChangeLeftSlider(75)}>
              75%
            </Typography>
            <Typography variant='h5' className={classes.percent} onClick={() => this.handleChangeLeftSlider(100)}>
              100%
            </Typography>
          </div>
          <div className={classes.buttons}>
            {asset.deposit === true && (
              <Button
                className={
                  loading || asset.balance <= 0 || asset.depositDisabled === true
                    ? `${classes.actionButton} disabled`
                    : classes.actionButton
                }
                variant='outlined'
                color='primary'
                disabled={loading || asset.balance <= 0 || asset.depositDisabled === true}
                onClick={this.onDeposit}
                fullWidth
              >
                <ActionButton />
                <Typography className={classes.buttonText} variant={'h5'} color={asset.disabled ? '' : 'secondary'}>
                  Deposit
                </Typography>
              </Button>
            )}
            {asset.depositAll === true && (
              <Button
                className={
                  loading || asset.balance <= 0 || asset.depositDisabled === true
                    ? `${classes.actionButton} disabled`
                    : classes.actionButton
                }
                variant='outlined'
                color='primary'
                disabled={loading || asset.balance <= 0 || asset.depositDisabled === true}
                onClick={this.onDepositAll}
                fullWidth
              >
                <ActionButton />
                <Typography className={classes.buttonText} variant={'h5'} color={asset.disabled ? '' : 'secondary'}>
                  Deposit All
                </Typography>
              </Button>
            )}
          </div>
          {asset.depositDisabled === true && (
            <div className={classes.disabledContainer}>
              <Typography className={classes.disabledText} variant='h4'>
                Deposits are currently disabled for this vault
              </Typography>
            </div>
          )}
        </div>
        <div className={classes.tradeContainer}>
          <TextField
            fullWidth
            id='redeemAmount'
            value={redeemAmount}
            error={redeemAmountError}
            onChange={this.onChange}
            disabled={loading}
            placeholder='0.00'
            variant='outlined'
            onKeyDown={this.inputRedeemKeyDown}
          />
          <div className={classes.balances}>
            <Typography
              variant='h4'
              onClick={() => {
                this.setRedeemAmount(100)
              }}
              className={classes.value}
              noWrap
            >
              {asset.vaultBalance ? (Math.floor(asset.vaultBalance * 10000) / 10000).toFixed(4) : '0.0000'}{' '}
              {asset.vaultSymbol} (
              {asset.vaultBalance
                ? (Math.floor(asset.vaultBalance * asset.pricePerFullShare * 10000) / 10000).toFixed(4)
                : '0.0000'}{' '}
              {asset.symbol}){' '}
            </Typography>
          </div>
          <div className={classes.sliderContainer}>
            <Slider
              value={rightSlider}
              aria-labelledby='discrete-slider'
              step={1}
              marks
              min={0}
              max={100}
              valueLabelDisplay='on'
              disabled={loading || asset.disabled}
              onChange={(_, value) => this.handleChangeRightSlider(value)}
            />
          </div>
          <div className={classes.percentContainer}>
            <Typography variant='h5' className={classes.percent} onClick={() => this.handleChangeRightSlider(0)}>
              0%
            </Typography>
            <Typography variant='h5' className={classes.percent} onClick={() => this.handleChangeRightSlider(25)}>
              25%
            </Typography>
            <Typography variant='h5' className={classes.percent} onClick={() => this.handleChangeRightSlider(50)}>
              50%
            </Typography>
            <Typography variant='h5' className={classes.percent} onClick={() => this.handleChangeRightSlider(75)}>
              75%
            </Typography>
            <Typography variant='h5' className={classes.percent} onClick={() => this.handleChangeRightSlider(100)}>
              100%
            </Typography>
          </div>
          <div className={classes.buttons}>
            {asset.withdraw === true && (
              <Button
                className={
                  loading || asset.balance <= 0 || asset.depositDisabled === true
                    ? `${classes.actionButton} disabled`
                    : classes.actionButton
                }
                variant='outlined'
                color='primary'
                disabled={loading || asset.vaultBalance <= 0}
                onClick={this.onWithdraw}
                fullWidth
              >
                <ActionButtonRotate />
                <Typography className={classes.buttonText} variant={'h5'} color='secondary'>
                  Withdraw
                </Typography>
              </Button>
            )}
            {asset.withdrawAll === true && (
              <Button
                className={
                  loading || asset.balance <= 0 || asset.depositDisabled === true
                    ? `${classes.actionButton} disabled`
                    : classes.actionButton
                }
                variant='outlined'
                color='primary'
                disabled={loading || asset.vaultBalance <= 0}
                onClick={this.onWithdrawAll}
                fullWidth
              >
                <ActionButtonRotate />
                <Typography className={classes.buttonText} variant={'h5'} color='secondary'>
                  Withdraw All
                </Typography>
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  onChange = (event) => {
    let val = []
    val[event.target.id] = event.target.value
    this.setState(val)

    if (event.target.id === 'amount') this.setState({ leftSlider: 0 })
    if (event.target.id === 'redeemAmount') this.setState({ rightSlider: 0 })
  }

  inputKeyDown = (event) => {
    if (event.which === 13) {
      this.onInvest()
    }
  }

  onDeposit = () => {
    this.setState({ amountError: false })

    const { amount } = this.state
    const { asset, startLoading } = this.props

    if (!amount || isNaN(amount) || amount <= 0 || amount > asset.balance) {
      this.setState({ amountError: true })
      return false
    }

    this.setState({ loading: true })
    startLoading()
    dispatcher.dispatch({ type: DEPOSIT_VAULT, content: { amount: amount, asset: asset } })
  }

  onDepositAll = () => {
    const { asset, startLoading } = this.props

    this.setState({ loading: true })
    startLoading()
    dispatcher.dispatch({ type: DEPOSIT_ALL_VAULT, content: { asset: asset } })
  }

  onWithdraw = () => {
    this.setState({ redeemAmountError: false })

    const { redeemAmount } = this.state
    const { asset, startLoading } = this.props

    if (!redeemAmount || isNaN(redeemAmount) || redeemAmount <= 0 || redeemAmount > asset.vaultBalance) {
      this.setState({ redeemAmountError: true })
      return false
    }

    this.setState({ loading: true })
    startLoading()

    dispatcher.dispatch({ type: WITHDRAW_VAULT, content: { amount: redeemAmount, asset: asset } })
  }

  onWithdrawAll = () => {
    const { asset, startLoading } = this.props

    this.setState({ loading: true })
    startLoading()
    dispatcher.dispatch({ type: WITHDRAW_ALL_VAULT, content: { asset: asset } })
  }

  setAmount = (percent) => {
    const { asset } = this.props
    const { loading } = this.state
    if (loading) return
    const updatedAmount = Math.floor(((asset.balance * percent) / 100) * 10000) / 10000
    this.setState({ amount: updatedAmount.toFixed(4) })
  }

  setRedeemAmount = (percent) => {
    const { asset } = this.props
    const { loading } = this.state
    if (loading) return
    const updatedRedeemAmount = Math.floor(((asset.vaultBalance * percent) / 100) * 10000) / 10000
    this.setState({ redeemAmount: updatedRedeemAmount.toFixed(4) })
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(Asset))
