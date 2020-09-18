import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { Typography, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withNamespaces } from 'react-i18next'

import Snackbar from '../snackbar'
import Asset from './asset'
import Loader from '../loader'
import ConnectWallet from '../connectWallet'
import WalletIcon from '../icons/walletIcon'
import LinearLine from '../icons/linearLine'

import {
  ERROR,
  GET_BALANCES_LIGHT,
  BALANCES_LIGHT_RETURNED,
  INVEST_RETURNED,
  REDEEM_RETURNED,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
} from '../../constants'

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
      padding: '0 15px 90px',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        minHeight: 'calc(100vh - 376px)',
      },
      [theme.breakpoints.down('xs')]: {
        overflow: 'hidden',
        padding: '0 15px 40px',
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
    balancesContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      padding: '12px 12px',
      position: 'relative',
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
    intro: {
      width: '100%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '60px auto 11px',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse',
      },
      '& .MuiToggleButtonGroup-root': {
        border: colors.groupButton.border,
        boxShadow: colors.groupButton.shadow,
      },
    },
    groupButton: {
      background: colors.groupButton.bg,
      '& span h4': {
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '22px',
        letterSpacing: '0.02em',
        color: colors.groupButton.color,
      },
      '&.Mui-selected': {
        background: colors.groupButton.bgSelected,
        '&:hover': {
          background: colors.groupButton.bgHover,
        },
      },
      '&.Mui-selected:hover span h4': {
        color: colors.groupButton.activeColor,
      },
      '&.MuiToggleButton-root:hover': {
        background: colors.groupButton.bgHoverDef,
      },
    },
    introCenter: {
      maxWidth: '500px',
      textAlign: 'center',
      display: 'flex',
      padding: '24px 0px',
    },
    introText: {
      paddingLeft: '20px',
    },
    actionButton: {
      '&:hover': {
        backgroundColor: '#2F80ED',
      },
      padding: '12px',
      backgroundColor: '#2F80ED',
      border: '1px solid #E1E1E1',
      fontWeight: 500,
      [theme.breakpoints.up('md')]: {
        padding: '15px',
      },
    },
    overlay: {
      position: 'absolute',
      borderRadius: '10px',
      background: 'RGBA(200, 200, 200, 1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #aaa',
      cursor: 'pointer',

      right: '0px',
      top: '10px',
      height: '70px',
      width: '160px',
      [theme.breakpoints.up('md')]: {
        right: '0px',
        top: '10px',
        height: '90px',
        width: '210px',
      },
    },
    heading: {
      display: 'none',
      paddingTop: '12px',
      flex: 1,
      flexShrink: 0,
      [theme.breakpoints.up('sm')]: {
        paddingTop: '5px',
        display: 'block',
      },
    },
    headingName: {
      paddingTop: '5px',
      flex: 2,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      minWidth: '100%',
      [theme.breakpoints.up('sm')]: {
        minWidth: 'auto',
      },
    },
    buttonText: {
      fontWeight: '700',
      color: 'white',
    },
    assetSummary: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      flexWrap: 'wrap',
      [theme.breakpoints.up('sm')]: {
        flexWrap: 'nowrap',
      },
    },
    assetIcon: {
      display: 'flex',
      alignItems: 'center',
      verticalAlign: 'middle',
      borderRadius: '20px',
      height: '30px',
      width: '30px',
      textAlign: 'center',
      cursor: 'pointer',
      marginRight: '20px',
      [theme.breakpoints.up('sm')]: {
        height: '40px',
        width: '40px',
        marginRight: '24px',
      },
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
      maxWidth: 'calc(100vw - 24px)',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '100%',
        maxWidth: 'auto',
      },
    },
    between: {
      width: '40px',
      height: '40px',
    },
    expansionPanel: {
      maxWidth: 'calc(100vw - 24px)',
      width: '100%',
      border: 'none',
      margin: '16px 0 0',
      borderRadius: '20px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      '& .MuiIconButton-label': {
        position: 'relative',
        '&:after': {
          content: '""',
          width: '0',
          height: '0',
          position: 'absolute',
          borderLeft: '7px solid transparent',
          borderRight: '7px solid transparent',
          borderTop: colors.page.asset.arrow,
          borderRadius: '2px',
        },
      },
      '& .MuiAccordionSummary-root': {
        padding: '22px 41px',
      },
    },
    versionToggle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    tableHeadContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    investAllContainer: {
      paddingTop: '24px',
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
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
    titleSpan: {
      color: colors.page.header.title,
      marginRight: '5px ',
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
    description: {
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '24px',
      textAlign: 'center',
      color: colors.page.header.text,
      maxWidth: '600px',
      width: '100%',
      margin: '21px auto 0',
    },
    assetTitle: {
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '28px',
      color: colors.page.asset.color,
    },
    assetDescription: {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '22px',
      color: colors.page.asset.description,
    },
  }
}

class InvestSimple extends Component {
  constructor(props) {
    super()

    const account = store.getStore('account')
    this.state = {
      assets: store.getStore('assets'),
      account: account,
      snackbarType: null,
      snackbarMessage: null,
      hideV1: true,
      value: 1,
    }

    if (account && account.address) {
      dispatcher.dispatch({ type: GET_BALANCES_LIGHT, content: {} })
    }
  }
  componentWillMount() {
    emitter.on(INVEST_RETURNED, this.investReturned)
    emitter.on(REDEEM_RETURNED, this.redeemReturned)
    emitter.on(ERROR, this.errorReturned)
    emitter.on(BALANCES_LIGHT_RETURNED, this.balancesReturned)
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected)
  }

  componentWillUnmount() {
    emitter.removeListener(INVEST_RETURNED, this.investReturned)
    emitter.removeListener(REDEEM_RETURNED, this.redeemReturned)
    emitter.removeListener(ERROR, this.errorReturned)
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected)
    emitter.removeListener(BALANCES_LIGHT_RETURNED, this.balancesReturned)
  }

  refresh() {
    dispatcher.dispatch({ type: GET_BALANCES_LIGHT, content: {} })
  }

  balancesReturned = (balances) => {
    this.setState({ assets: store.getStore('assets') })
    setTimeout(this.refresh, 300000)
  }

  connectionConnected = () => {
    const { t } = this.props
    this.setState({ account: store.getStore('account') })

    dispatcher.dispatch({ type: GET_BALANCES_LIGHT, content: {} })

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

  investReturned = (txHash) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null }
    this.setState(snackbarObj)
    this.setState({ loading: false })
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: txHash, snackbarType: 'Hash' }
      that.setState(snackbarObj)
    })
  }

  redeemReturned = (txHash) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null }
    this.setState(snackbarObj)
    this.setState({ loading: false })
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: txHash, snackbarType: 'Hash' }
      that.setState(snackbarObj)
    })
  }

  render() {
    const { classes, currentTheme, theme, t } = this.props
    const { loading, account, snackbarMessage, value } = this.state
    const colors = theme.themeColors

    if (!account || !account.address) {
      return <ConnectWallet currentTheme={currentTheme} />
    }

    return (
      <div className={classes.root}>
        <div className={classes.investedContainer}>
          <div className={classes.titleContainer}>
            <Typography className={classes.title} variant='h2'>
              {t('earn.title1')}
            </Typography>
            <WalletIcon color={colors.page.header.icon} glowColor={colors.page.header.glow} />
            <Typography className={classes.title} variant='h2'>
              <span className={classes.titleSpan}>Earn</span> {t('earn.title2')}?
            </Typography>
          </div>
          {currentTheme === 'dark' && (
            <div className={classes.linearContainer}>
              <LinearLine color={colors.page.header.linear.color} middle={colors.page.header.linear.middle} />
            </div>
          )}
          <Typography className={classes.description} variant='h6'>
            {t('earn.desc')}
          </Typography>
          <div className={classes.intro}>
            <ToggleButtonGroup
              value={value}
              onChange={this.handleTabChange}
              aria-label='version'
              exclusive
              size={'small'}
            >
              <ToggleButton className={classes.groupButton} value={0} aria-label='v1'>
                <Typography variant={'h4'}>v1</Typography>
              </ToggleButton>
              <ToggleButton className={classes.groupButton} value={1} aria-label='v2'>
                <Typography variant={'h4'}>y.curve.fi</Typography>
              </ToggleButton>
              <ToggleButton className={classes.groupButton} value={2} aria-label='v3'>
                <Typography variant={'h4'}>busd.curve.fi</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          {account.address && value === 0 && this.renderAssetBlocksv1()}
          {account.address && value === 1 && this.renderAssetBlocksv2()}
          {account.address && value === 2 && this.renderAssetBlocksv3()}
        </div>
        {loading && <Loader />}
        {snackbarMessage && this.renderSnackbar()}
      </div>
    )
  }

  handleTabChange = (event, newValue) => {
    this.setState({ value: newValue })
  }

  onChange = (event) => {
    let val = []
    val[event.target.id] = event.target.checked
    this.setState(val)
  }

  renderAssetBlocksv1 = () => {
    const { assets, expanded, hideV1 } = this.state
    const { classes, t } = this.props
    const width = window.innerWidth

    return assets
      .filter((asset) => {
        return hideV1 === true || asset.version !== 1
      })
      .filter((asset) => {
        return asset.version === 1 && asset.investedBalance && asset.investedBalance.toFixed(4) > 0
      })
      .filter((asset) => {
        return !(asset.symbol === 'iDAI')
      })
      .map((asset) => {
        return (
          <Accordion
            className={classes.expansionPanel}
            square
            key={asset.id + '_expand'}
            expanded={expanded === asset.id}
            onChange={() => {
              this.handleChange(asset.id)
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1bh-content' id='panel1bh-header'>
              <div className={classes.assetSummary}>
                <div className={classes.headingName}>
                  <div className={classes.assetIcon}>
                    <img
                      alt=''
                      src={require('../../assets/' + asset.symbol + '-logo.png')}
                      height={width > 600 ? '40px' : '30px'}
                      style={asset.disabled ? { filter: 'grayscale(100%)' } : {}}
                    />
                  </div>
                  <div>
                    <Typography className={classes.assetTitle} variant={'h3'}>
                      {asset.name}
                    </Typography>
                    <Typography className={classes.assetDescription} variant={'h5'}>
                      {asset.description}
                    </Typography>
                  </div>
                </div>
                <div className={classes.heading}>
                  <Typography className={classes.assetTitle} variant={'h3'}>
                    {asset.maxApr ? (asset.maxApr * 100).toFixed(4) + ' %' : '0.0000 %'}
                  </Typography>
                  <Typography variant={'h5'} className={classes.assetDescription}>
                    {t('earn.item.interestRate')}
                  </Typography>
                </div>
                <div className={classes.heading}>
                  <Typography className={classes.assetTitle} variant={'h3'}>
                    {asset.balance
                      ? asset.balance.toFixed(4) + ' ' + (asset.tokenSymbol ? asset.tokenSymbol : asset.symbol)
                      : '0.0000 ' + (asset.tokenSymbol ? asset.tokenSymbol : asset.symbol)}
                  </Typography>
                  <Typography variant={'h5'} className={classes.assetDescription}>
                    {t('earn.item.availableBalance')}
                  </Typography>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Asset asset={asset} startLoading={this.startLoading} />
            </AccordionDetails>
          </Accordion>
        )
      })
  }

  renderAssetBlocksv2 = () => {
    const { assets, expanded } = this.state
    const { classes, t } = this.props
    const width = window.innerWidth
    return assets
      .filter((asset) => {
        return asset.version === 2
      })
      .filter((asset) => {
        return !(asset.symbol === 'iDAI')
      })
      .map((asset) => {
        return (
          <Accordion
            className={classes.expansionPanel}
            square
            key={asset.id + '_expand'}
            expanded={expanded === asset.id}
            onChange={() => {
              this.handleChange(asset.id)
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1bh-content' id='panel1bh-header'>
              <div className={classes.assetSummary}>
                <div className={classes.headingName}>
                  <div className={classes.assetIcon}>
                    <img
                      alt=''
                      src={require('../../assets/' + asset.symbol + '-logo.png')}
                      height={width > 600 ? '40px' : '30px'}
                      style={asset.disabled ? { filter: 'grayscale(100%)' } : {}}
                    />
                  </div>
                  <div>
                    <Typography className={classes.assetTitle} variant={'h3'}>
                      {asset.name}
                    </Typography>
                    <Typography variant={'h5'} className={classes.assetDescription}>
                      {asset.description}
                    </Typography>
                  </div>
                </div>
                <div className={classes.heading}>
                  <Typography className={classes.assetTitle} variant={'h3'}>
                    {asset.maxApr ? (asset.maxApr * 100).toFixed(4) + ' %' : '0.0000 %'}
                  </Typography>
                  <Typography variant={'h5'} className={classes.assetDescription}>
                    {t('earn.item.interestRate')}
                  </Typography>
                </div>
                <div className={classes.heading}>
                  <Typography className={classes.assetTitle} variant={'h3'}>
                    {asset.balance
                      ? asset.balance.toFixed(4) + ' ' + (asset.tokenSymbol ? asset.tokenSymbol : asset.symbol)
                      : '0.0000 ' + (asset.tokenSymbol ? asset.tokenSymbol : asset.symbol)}
                  </Typography>
                  <Typography variant={'h5'} className={classes.assetDescription}>
                    {t('earn.item.availableBalance')}
                  </Typography>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Asset asset={asset} startLoading={this.startLoading} />
            </AccordionDetails>
          </Accordion>
        )
      })
  }

  renderAssetBlocksv3 = () => {
    const { assets, expanded } = this.state
    const { classes, t } = this.props
    const width = window.innerWidth

    return assets
      .filter((asset) => {
        return asset.version === 3
      })
      .filter((asset) => {
        return !(asset.symbol === 'iDAI')
      })
      .map((asset) => {
        return (
          <Accordion
            className={classes.expansionPanel}
            square
            key={asset.id + '_expand'}
            expanded={expanded === asset.id}
            onChange={() => {
              this.handleChange(asset.id)
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1bh-content' id='panel1bh-header'>
              <div className={classes.assetSummary}>
                <div className={classes.headingName}>
                  <div className={classes.assetIcon}>
                    <img
                      alt=''
                      src={require('../../assets/' + asset.symbol + '-logo.png')}
                      height={width > 600 ? '40px' : '30px'}
                      style={asset.disabled ? { filter: 'grayscale(100%)' } : {}}
                    />
                  </div>
                  <div>
                    <Typography className={classes.assetTitle} variant={'h3'}>
                      {asset.name}
                    </Typography>
                    <Typography variant={'h5'} className={classes.assetDescription}>
                      {asset.description}
                    </Typography>
                  </div>
                </div>
                <div className={classes.heading}>
                  <Typography className={classes.assetTitle} variant={'h3'}>
                    {asset.maxApr ? (asset.maxApr * 100).toFixed(4) + ' %' : '0.0000 %'}
                  </Typography>
                  <Typography variant={'h5'} className={classes.assetDescription}>
                    {t('earn.item.interestRate')}
                  </Typography>
                </div>
                <div className={classes.heading}>
                  <Typography className={classes.assetTitle} variant={'h3'}>
                    {asset.balance
                      ? asset.balance.toFixed(4) + ' ' + (asset.tokenSymbol ? asset.tokenSymbol : asset.symbol)
                      : '0.0000 ' + (asset.tokenSymbol ? asset.tokenSymbol : asset.symbol)}
                  </Typography>
                  <Typography variant={'h5'} className={classes.assetDescription}>
                    {t('earn.item.availableBalance')}
                  </Typography>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Asset asset={asset} startLoading={this.startLoading} />
            </AccordionDetails>
          </Accordion>
        )
      })
  }

  handleChange = (id) => {
    this.setState({ expanded: this.state.expanded === id ? null : id })
  }

  startLoading = () => {
    this.setState({ loading: true })
  }

  renderSnackbar = () => {
    var { snackbarType, snackbarMessage } = this.state
    return <Snackbar type={snackbarType} message={snackbarMessage} open={true} />
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(withTheme(InvestSimple))))
