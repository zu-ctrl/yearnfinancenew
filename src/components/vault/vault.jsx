import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Tooltip,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SearchIcon from '@material-ui/icons/Search'

import { withNamespaces } from 'react-i18next'

import Snackbar from '../snackbar'
import Asset from './asset'
import Loader from '../loader'
import ApyTable from '../apyTable'
import ConnectWallet from '../connectWallet'
import VaultIcon from '../icons/vaultIcon'
import InfoIcon from '../icons/infoIcon'

import {
  ERROR,
  GET_VAULT_BALANCES,
  VAULT_BALANCES_RETURNED,
  DEPOSIT_VAULT_RETURNED,
  WITHDRAW_VAULT_RETURNED,
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
      backgroundColor: colors.bg,
      paddingBottom: '90px',
      width: '100%',
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
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: '32px',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        maxWidth: 'calc(100vw - 24px)',
        flexWrap: 'wrap',
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
    heading: {
      display: 'none',
      flex: 1,
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    headingName: {
      display: 'flex',
      alignItems: 'center',
      width: '325px',
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
        flex: 1,
      },
    },
    headingEarning: {
      display: 'none',
      width: '300px',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
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
      maxWidth: '450px',
      [theme.breakpoints.up('md')]: {
        width: '100%',
      },
    },
    between: {
      width: '40px',
    },
    expansionPanel: {
      maxWidth: 'calc(100vw - 24px)',
      width: '100%',
      margin: '16px 0 0',
      '& .MuiIconButton-label': {
        position: 'relative',
        '&:after': {
          content: '""',
          width: '0',
          height: '0',
          position: 'absolute',
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: colors.header.connect.arrow,
          borderRadius: '2px',
        },
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
      lineHeight: '1.2',
      background: colors.white,
    },
    fees: {
      paddingRight: '75px',
      padding: '12px',
      lineHeight: '1.2',
    },
    walletAddress: {
      padding: '0px 12px',
    },
    walletTitle: {
      flex: 1,
      color: colors.darkGray,
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
    searchField: {
      flex: 1,
      background: '#1D2430',
      borderRadius: '20px',
      border: '1px solid #40A9FF',
      boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.25)',
      maxWidth: '300px',
      width: '100%',
      height: '40px',
      '& input': {
        padding: '0 10px 0 14px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '40px',
      },
      '& fieldset': {
        '&:hover': {
          borderColor: '#40A9FF',
        },
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderWidth: '0',
        borderColor: '#40A9FF',
        boxShadow: 'inset 0px -1px 0px #40A9FF',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: '0',
        borderColor: '#40A9FF',
        boxShadow: 'inset 0px -1px 0px #40A9FF',
      },
    },
    checkbox: {
      flex: 1,
      margin: '0px !important',
      '&  .MuiSvgIcon-root': {
        fill: 'transparent',
      },
      '& .Mui-checked': {
        '&  .MuiSvgIcon-root': {
          fill: 'currentColor',
        },
      },
      '& span': {
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '22px',
        color: '#fff',
      },
      '& input': {
        background: '#394861',
        color: '#394861',
      },
      '& .MuiIconButton-label': {
        color: '#40A9FF',
        height: '16px',
        width: '16px',
        background: '#394861',
        borderRadius: '2px',
        border: '1px solid #40A9FF',
      },
      '& .MuiButtonBase-root': {
        padding: '11px 11px',
      },
    },
    flexy: {
      display: 'flex',
      alignItems: 'center',
    },
    on: {
      color: colors.darkGray,
      padding: '0px 6px',
    },
    positive: {
      color: colors.compoundGreen,
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '24px',
      lineHeight: '36px',
      color: '#FFF',
      margin: '0 5px',
    },
    titleSpan: {
      color: '#69C0FF',
      marginRight: '5px ',
    },
    linearContainer: {
      maxWidth: '379px',
      width: '100%',
      minHeight: '69px',
      display: 'flex',
      alignItems: 'flex-start',
      margin: '13px auto -68px',
      background: colors.glowShadow,
    },
    line: {
      width: '100%',
    },
    description: {
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '24px',
      textAlign: 'center',
      color: '#FFFFFF',
      maxWidth: '600px',
      width: '100%',
      margin: '19px auto 0',
    },
    sortContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: '16px',
      width: '100%',
      padding: '0 15px',
    },
    select: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '22px',
      color: '#fff',
      appearance: 'none',
      marginRight: '3px',
      width: '70px',
      position: 'relative',
      zIndex: '2',
    },
    option: {
      color: '#000',
    },
    label: {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '22px',
      color: '#AEB7C6',
      marginRight: '5px',
    },
    connectedArrow: {
      width: '0',
      height: '0',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderTop: colors.header.connect.arrow,
      borderRadius: '2px',
      marginLeft: '-17px',
    },
    assetTitle: {
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '28px',
      color: '#FFFFFF',
    },
    assetDescription: {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '22px',
      color: '#F3F4F5',
    },
  }
}

class Vault extends Component {
  constructor(props) {
    super()

    const account = store.getStore('account')

    this.state = {
      assets: store.getStore('vaultAssets'),
      usdPrices: store.getStore('usdPrices'),
      account: account,
      address: account.address
        ? account.address.substring(0, 6) +
          '...' +
          account.address.substring(account.address.length - 4, account.address.length)
        : null,
      snackbarType: null,
      snackbarMessage: null,
      search: '',
      searchError: false,
      hideZero: localStorage.getItem('yearn.finance-hideZero') === '1' ? true : false,
      sortBy: 'apy',
    }

    if (account && account.address) {
      dispatcher.dispatch({ type: GET_VAULT_BALANCES, content: {} })
    }
  }
  componentWillMount() {
    emitter.on(DEPOSIT_VAULT_RETURNED, this.showHash)
    emitter.on(WITHDRAW_VAULT_RETURNED, this.showHash)
    emitter.on(ERROR, this.errorReturned)
    emitter.on(VAULT_BALANCES_RETURNED, this.balancesReturned)
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected)
  }

  componentWillUnmount() {
    emitter.removeListener(DEPOSIT_VAULT_RETURNED, this.showHash)
    emitter.removeListener(WITHDRAW_VAULT_RETURNED, this.showHash)
    emitter.removeListener(ERROR, this.errorReturned)
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected)
    emitter.removeListener(VAULT_BALANCES_RETURNED, this.balancesReturned)
  }

  refresh() {
    dispatcher.dispatch({ type: GET_VAULT_BALANCES, content: {} })
  }

  balancesReturned = async (balances) => {
    let updatedAssets = store.getStore('vaultAssets')
    // ADD GRAPHS TO ASSETS
    updatedAssets = updatedAssets.map((asset) => {
      const mapObj = {
        YFI: 'yfi',
        yCRV: 'ycurve',
        DAI: 'stablecoin',
        TUSD: 'stablecoin',
        USDC: 'stablecoin',
        USDT: 'stablecoin',
        aLINK: 'link',
        LINK: 'link',
      }
      asset.vaultGraphName = mapObj[asset.symbol]
      return asset
    })
    // ADD PYEARN DATA TO ASSETS
    try {
      const {
        body: { data: pyEarnArr },
      } = (
        await axios({
          url: '/api/pyearn',
          method: 'GET',
        })
      ).data
      updatedAssets = updatedAssets.map((a) => {
        const obj = pyEarnArr.find((d) => d.symbol === a.vaultSymbol)
        if (!obj) {
          a.pyEarnData = { day: 'N/A', week: 'N/A', month: 'N/A', year: 'N/A' }
        } else {
          a.pyEarnData = { ...obj.pyEarnData }
          a.apy = +obj.pyEarnData.year
        }
        return a
      })
    } catch (e) {
      console.error('[pyearn]', e.toString())
    }
    this.setState({ assets: updatedAssets })
    console.log('updatedAssets', updatedAssets)
    setTimeout(this.refresh, 300000)
  }

  connectionConnected = () => {
    const { t } = this.props
    const account = store.getStore('account')
    this.setState({
      account: account,
      address: account.address
        ? account.address.substring(0, 6) +
          '...' +
          account.address.substring(account.address.length - 4, account.address.length)
        : null,
    })

    dispatcher.dispatch({ type: GET_VAULT_BALANCES, content: {} })

    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: t('Unlock.WalletConnected'), snackbarType: 'Info' }
      that.setState(snackbarObj)
    })
  }

  connectionDisconnected = () => {
    this.setState({
      account: null,
      address: null,
    })
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

  showHash = (txHash) => {
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
    const { classes, currentTheme, theme } = this.props
    const { loading, account, snackbarMessage } = this.state
    const colors = theme.themeColors

    if (!account || !account.address) {
      return <ConnectWallet currentTheme={currentTheme} />
    }

    return (
      <div className={classes.root}>
        <div className={classes.investedContainer}>
          <div className={classes.titleContainer}>
            <Typography className={classes.title} variant='h2'>
              How does
            </Typography>
            <VaultIcon color={colors.icon.color} glowColor={colors.icon.glow} />
            <Typography className={classes.title} variant='h2'>
              <span className={classes.titleSpan}>Vault</span> work?
            </Typography>
          </div>
          <div className={classes.linearContainer}>
            <img
              className={classes.line}
              alt='linear icon'
              src={require(`../../assets/theme/connect-linear-middle-dark.svg`)}
            />
          </div>
          <Typography className={classes.description} variant='h6'>
            Vaults automate a number of intensive processes and provide the highest risk-adjusted yield available. Below
            is a diagram of how a couple might work in practice. Go ahead and choose the asset you want to deposit in
            the list below to get started!
          </Typography>
          {this.renderFilters()}
          {this.renderAssetBlocks()}
        </div>
        {loading && <Loader />}
        {snackbarMessage && this.renderSnackbar()}
      </div>
    )
  }

  onSearchChanged = (event) => {
    let val = []
    val[event.target.id] = event.target.value
    this.setState(val)
  }

  onChange = (event) => {
    let val = []
    val[event.target.id] = event.target.checked
    this.setState(val)
  }

  sortedAssets = (assets, sortBy) => {
    return assets.sort((a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
  }

  renderAssetBlocks = () => {
    const { assets, expanded, search, hideZero, sortBy } = this.state
    const { classes } = this.props
    const width = window.innerWidth
    const _assets = [...assets]
    return this.sortedAssets(_assets, sortBy)
      .filter((asset) => {
        if (hideZero && asset.balance === 0 && asset.vaultBalance === 0) {
          return false
        }

        if (search && search !== '') {
          return (
            asset.id.toLowerCase().includes(search.toLowerCase()) ||
            asset.name.toLowerCase().includes(search.toLowerCase()) ||
            asset.symbol.toLowerCase().includes(search.toLowerCase()) ||
            asset.description.toLowerCase().includes(search.toLowerCase()) ||
            asset.vaultSymbol.toLowerCase().includes(search.toLowerCase())
          )
          // asset.erc20address.toLowerCase().includes(search.toLowerCase()) ||
          // asset.vaultContractAddress.toLowerCase().includes(search.toLowerCase())
        } else {
          return true
        }
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
                    <Typography className={classes.assetTitle} variant={'h3'} noWrap>
                      {asset.name}
                    </Typography>
                    <Typography className={classes.assetDescription} variant={'h5'}>
                      {asset.description}
                    </Typography>
                  </div>
                </div>
                {!['LINK'].includes(asset.id) && asset.vaultBalance > 0 && (
                  <div className={classes.headingEarning}>
                    <Typography variant={'h5'} className={classes.assetDescription}>
                      You are earning:
                    </Typography>
                    <div className={classes.flexy}>
                      <Typography variant={'h3'} noWrap>
                        {asset.apy ? `${asset.apy.toFixed(2)}%` : <Skeleton style={{ width: '50px' }} />}{' '}
                      </Typography>
                      <Typography variant={'h5'} className={classes.assetDescription}>
                        {' '}
                        on{' '}
                      </Typography>
                      <Typography className={classes.assetDescription} variant={'h3'} noWrap>
                        {asset.vaultBalance ? asset.vaultBalance.toFixed(2) : <Skeleton style={{ width: '50px' }} />}{' '}
                        {asset.vaultSymbol}
                      </Typography>
                    </div>
                  </div>
                )}
                {!['LINK'].includes(asset.id) && asset.vaultBalance === 0 && (
                  <div className={classes.headingEarning}>
                    <div className={classes.flexy}>
                      <Typography className={classes.assetTitle} variant={'h3'} noWrap>
                        {asset.apy ? `${asset.apy.toFixed(2)}%` : <Skeleton style={{ width: '50px' }} />}{' '}
                      </Typography>
                    </div>
                    <Typography variant={'h5'} className={classes.assetDescription}>
                      This vault is earning
                    </Typography>
                  </div>
                )}
                {['LINK'].includes(asset.id) && (
                  <div className={classes.headingEarning}>
                    <Typography className={classes.assetTitle} variant={'h3'} noWrap>
                      N/A
                    </Typography>
                    <Typography variant={'h5'} className={classes.assetDescription}>
                      This vault is earning
                    </Typography>
                  </div>
                )}
                <div className={classes.heading}>
                  <Typography className={classes.assetTitle} variant={'h3'} noWrap>
                    {(asset.balance ? asset.balance.toFixed(2) : '0.00') + ' ' + asset.symbol}
                  </Typography>
                  <Typography variant={'h5'} className={classes.assetDescription}>
                    Available to deposit
                  </Typography>
                </div>
              </div>
            </AccordionSummary>
            <ApyTable pyEarnData={asset.pyEarnData} />
            <AccordionDetails>
              <Asset asset={asset} startLoading={this.startLoading} />
            </AccordionDetails>
          </Accordion>
        )
      })
  }

  renderFilters = () => {
    const { loading, search, searchError, hideZero, sortBy } = this.state
    const { classes } = this.props

    return (
      <>
        <div className={classes.filters}>
          <FormControlLabel
            className={classes.checkbox}
            control={<Checkbox checked={hideZero} onChange={this.handleChecked} color='primary' />}
            label='Hide zero balances'
          />
          <div className={classes.between}>
            <Tooltip
              title={
                <React.Fragment>
                  <Typography variant={'h5'} className={classes.fees}>
                    There is a 0.5% withdrawal fee on all vaults.
                    <br />
                    <br />
                    There is a 5% performance fee on subsidized gas.
                  </Typography>
                </React.Fragment>
              }
              arrow
            >
              <div>
                <InfoIcon color='#BAE7FF' glowColor='drop-shadow(0px 0px 10px #40A9FF)' />
              </div>
            </Tooltip>
          </div>
          <TextField
            fullWidth
            disabled={loading}
            className={classes.searchField}
            id={'search'}
            value={search}
            error={searchError}
            onChange={this.onSearchChanged}
            placeholder='ETH, CRV, ...'
            variant='outlined'
            InputProps={{
              startAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.sortContainer}>
          <Typography variant={'h6'} className={classes.label}>
            Sort by
          </Typography>
          <select className={classes.select} value={sortBy} onChange={(e) => this.setState({ sortBy: e.target.value })}>
            <option className={classes.option} value='balance'>
              Balance
            </option>
            <option className={classes.option} value='apy'>
              APY
            </option>
          </select>
          <div className={classes.connectedArrow}></div>
        </div>
      </>
    )
  }

  handleChecked = (event) => {
    this.setState({ hideZero: event.target.checked })
    localStorage.setItem('yearn.finance-hideZero', event.target.checked ? '1' : '0')
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

export default withNamespaces()(withRouter(withStyles(styles)(withTheme(Vault))))
