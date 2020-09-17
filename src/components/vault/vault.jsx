import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
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
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "../icons/searchIcon";
import FilterIcon from "../icons/filterIcon";

import { withNamespaces } from "react-i18next";

import Snackbar from "../snackbar";
import Asset from "./asset";
import Loader from "../loader";
import ApyTable from "../apyTable";
import ConnectWallet from "../connectWallet";
import VaultIcon from "../icons/vaultIcon";
import YvaultRoi from "../yvaultRoi";
import InfoIcon from "../icons/infoIcon";
import LinearLine from "../icons/linearLine";

import {
  ERROR,
  GET_VAULT_BALANCES,
  VAULT_BALANCES_RETURNED,
  DEPOSIT_VAULT_RETURNED,
  WITHDRAW_VAULT_RETURNED,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
} from "../../constants";

import Store from "../../stores";
const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

const styles = (theme) => {
  const colors = theme.themeColors;
  return {
    root: {
      backgroundImage: colors.bgImage,
      backgroundColor: colors.bg,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom right",
      padding: "0 15px 90px",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        overflow: "hidden",
      },
    },
    investedContainer: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      maxWidth: "870px",
      width: "100%",
      margin: "40px auto 0",
      "& .MuiAccordionSummary-root": {
        padding: "22px 41px",
      },
    },
    balancesContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "flex-end",
      padding: "12px 12px",
      position: "relative",
    },
    connectContainer: {
      padding: "12px",
      display: "flex",
      justifyContent: "center",
      width: "100%",
      maxWidth: "450px",
    },
    intro: {
      width: "100%",
      position: "relative",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: "32px",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
        maxWidth: "calc(100vw - 24px)",
        flexWrap: "wrap",
      },
    },
    introCenter: {
      maxWidth: "500px",
      textAlign: "center",
      display: "flex",
      padding: "24px 0px",
    },
    introText: {
      paddingLeft: "20px",
    },
    heading: {
      display: "none",
      flex: 1,
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
    },
    headingName: {
      display: "flex",
      alignItems: "center",
      width: "325px",
      [theme.breakpoints.down("sm")]: {
        width: "auto",
        flex: 1,
      },
    },
    headingEarning: {
      display: "none",
      width: "300px",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    assetSummary: {
      display: "flex",
      alignItems: "center",
      flex: 1,
      flexWrap: "wrap",
      [theme.breakpoints.up("sm")]: {
        flexWrap: "nowrap",
      },
    },
    assetIcon: {
      display: "flex",
      alignItems: "center",
      verticalAlign: "middle",
      borderRadius: "20px",
      height: "30px",
      width: "30px",
      textAlign: "center",
      cursor: "pointer",
      marginRight: "20px",
      [theme.breakpoints.up("sm")]: {
        height: "40px",
        width: "40px",
        marginRight: "24px",
      },
    },
    between: {
      width: "40px",
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    expansionPanel: {
      maxWidth: "calc(100vw - 24px)",
      width: "100%",
      border: "none",
      margin: "16px 0 0",
      borderRadius: "20px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
      "& .MuiIconButton-label": {
        position: "relative",
        "&:after": {
          content: '""',
          width: "0",
          height: "0",
          position: "absolute",
          borderLeft: "7px solid transparent",
          borderRight: "7px solid transparent",
          borderTop: colors.page.asset.arrow,
          borderRadius: "2px",
        },
      },
    },
    versionToggle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    tableHeadContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    investAllContainer: {
      paddingTop: "24px",
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
    },
    fees: {
      paddingRight: "75px",
      padding: "12px",
      lineHeight: "1.2",
    },
    walletAddress: {
      padding: "0px 12px",
    },
    filters: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "44px",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column-reverse",
      },
    },
    searchField: {
      flex: 1,
      background: colors.page.filter.input.bg,
      borderRadius: "20px",
      border: colors.page.filter.input.border,
      boxShadow: colors.page.filter.input.boxShadow,
      minWidth: "300px",
      maxWidth: "300px",
      width: "100%",
      height: "40px",
      position: "relative",
      "& input": {
        padding: "0 45px 0 12px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "40px",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "22px",
        color: colors.page.filter.input.color,
        "&::placeholder": {
          color: colors.page.filter.input.placeholder,
        },
      },
      "& .MuiInputBase-root": {
        paddingLeft: "10px",
      },
      "& fieldset": {
        border: "0",
        "&:hover": {
          borderColor: colors.page.filter.input.borderColor,
        },
      },
      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderWidth: "0",
        borderColor: colors.page.filter.input.borderColor,
        boxShadow: colors.page.filter.input.hoverShadow,
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderWidth: "0",
        borderColor: colors.page.filter.input.borderColor,
        boxShadow: colors.page.filter.input.hoverShadow,
      },
      [theme.breakpoints.down("xs")]: {
        maxWidth: "500px",
        minWidth: "100px",
      },
    },
    checkbox: {
      flex: 1,
      margin: "0px !important",
      "&  .MuiSvgIcon-root": {
        fill: "transparent",
      },
      "& .Mui-checked": {
        "&  .MuiSvgIcon-root": {
          fill: "currentColor",
        },
      },
      "& span": {
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "22px",
        color: colors.page.header.text,
      },
      "& input": {
        background: colors.page.filter.checkbox.bg,
        color: colors.page.filter.checkbox.bg,
      },
      "& .MuiIconButton-label": {
        color: colors.page.filter.checkbox.label,
        height: "16px",
        width: "16px",
        background: colors.page.filter.checkbox.bg,
        borderRadius: "2px",
        border: colors.page.filter.checkbox.border,
      },
      "& .MuiButtonBase-root": {
        padding: "11px 11px",
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: "15px !important",
      },
    },
    flexy: {
      display: "flex",
      alignItems: "center",
    },
    titleContainer: {
      display: "flex",
      alignItems: "center",
    },
    title: {
      fontWeight: "bold",
      fontSize: "24px",
      lineHeight: "36px",
      color: colors.page.header.text,
      margin: "0 5px",
    },
    titleSpan: {
      color: colors.page.header.title,
      marginRight: "5px ",
    },
    linearContainer: {
      maxWidth: "379px",
      width: "100%",
      minHeight: "69px",
      display: "flex",
      alignItems: "flex-start",
      margin: "13px auto -68px",
      background: colors.page.header.bgGlow,
    },
    line: {
      width: "100%",
    },
    description: {
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "24px",
      textAlign: "center",
      color: colors.page.header.text,
      maxWidth: "600px",
      width: "100%",
      margin: "21px auto 0",
    },
    sortContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: "16px",
      width: "100%",
      padding: "0 10px",
    },
    select: {
      background: "transparent",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "22px",
      color: colors.page.filter.sort.select,
      appearance: "none",
      marginRight: "3px",
      width: "70px",
      position: "relative",
      zIndex: "2",
    },
    option: {
      color: colors.page.filter.sort.option,
    },
    label: {
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "22px",
      color: colors.page.filter.sort.label,
      marginRight: "5px",
    },
    connectedArrow: {
      width: "0",
      height: "0",
      borderLeft: "6px solid transparent",
      borderRight: "6px solid transparent",
      borderTop: colors.page.filter.sort.arrow,
      borderRadius: "2px",
      marginLeft: "-17px",
    },
    assetTitle: {
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "28px",
      color: colors.page.asset.color,
    },
    assetDescription: {
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "22px",
      color: colors.page.asset.description,
    },
    inputFilter: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
    },
  };
};

class Vault extends Component {
  constructor(props) {
    super();

    const account = store.getStore("account");

    this.state = {
      assets: store.getStore("vaultAssets"),
      usdPrices: store.getStore("usdPrices"),
      account: account,
      address: account.address
        ? account.address.substring(0, 6) +
          "..." +
          account.address.substring(account.address.length - 4, account.address.length)
        : null,
      snackbarType: null,
      snackbarMessage: null,
      search: "",
      searchError: false,
      hideZero: localStorage.getItem("yearn.finance-hideZero") === "1" ? true : false,
      sortBy: "apy",
    };

    if (account && account.address) {
      dispatcher.dispatch({ type: GET_VAULT_BALANCES, content: {} });
    }
  }
  componentWillMount() {
    emitter.on(DEPOSIT_VAULT_RETURNED, this.showHash);
    emitter.on(WITHDRAW_VAULT_RETURNED, this.showHash);
    emitter.on(ERROR, this.errorReturned);
    emitter.on(VAULT_BALANCES_RETURNED, this.balancesReturned);
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
  }

  componentWillUnmount() {
    emitter.removeListener(DEPOSIT_VAULT_RETURNED, this.showHash);
    emitter.removeListener(WITHDRAW_VAULT_RETURNED, this.showHash);
    emitter.removeListener(ERROR, this.errorReturned);
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.removeListener(VAULT_BALANCES_RETURNED, this.balancesReturned);
  }

  refresh() {
    dispatcher.dispatch({ type: GET_VAULT_BALANCES, content: {} });
  }

  balancesReturned = async (balances) => {
    let updatedAssets = store.getStore("vaultAssets");
    // ADD GRAPHS TO ASSETS
    updatedAssets = updatedAssets.map((asset) => {
      const mapObj = {
        YFI: "yfi",
        yCRV: "ycurve",
        DAI: "stablecoin",
        TUSD: "stablecoin",
        USDC: "stablecoin",
        USDT: "stablecoin",
        aLINK: "link",
        LINK: "link",
      };
      asset.vaultGraphName = mapObj[asset.symbol];
      return asset;
    });
    // ADD PYEARN DATA TO ASSETS
    try {
      const {
        body: { data: pyEarnArr },
      } = (
        await axios({
          url: "/api/pyearn",
          method: "GET",
        })
      ).data;
      updatedAssets = updatedAssets.map((a) => {
        const obj = pyEarnArr.find((d) => d.symbol === a.vaultSymbol);
        if (!obj) {
          a.pyEarnData = { day: "N/A", week: "N/A", month: "N/A", year: "N/A" };
        } else {
          a.pyEarnData = { ...obj.pyEarnData };
          a.apy = +obj.pyEarnData.year;
        }
        return a;
      });
    } catch (e) {
      console.error("[pyearn]", e.toString());
    }
    this.setState({ assets: updatedAssets });
    console.log("updatedAssets", updatedAssets);
    setTimeout(this.refresh, 300000);
  };

  connectionConnected = () => {
    const { t } = this.props;
    const account = store.getStore("account");
    this.setState({
      account: account,
      address: account.address
        ? account.address.substring(0, 6) +
          "..." +
          account.address.substring(account.address.length - 4, account.address.length)
        : null,
    });

    dispatcher.dispatch({ type: GET_VAULT_BALANCES, content: {} });

    const that = this;
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: t("Unlock.WalletConnected"), snackbarType: "Info" };
      that.setState(snackbarObj);
    });
  };

  connectionDisconnected = () => {
    this.setState({
      account: null,
      address: null,
    });
  };

  errorReturned = (error) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null };
    this.setState(snackbarObj);
    this.setState({ loading: false });
    const that = this;
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: error.toString(), snackbarType: "Error" };
      that.setState(snackbarObj);
    });
  };

  showHash = (txHash) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null };
    this.setState(snackbarObj);
    this.setState({ loading: false });
    const that = this;
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: txHash, snackbarType: "Hash" };
      that.setState(snackbarObj);
    });
  };

  render() {
    const { classes, currentTheme, theme, t } = this.props;
    const { loading, account, snackbarMessage } = this.state;
    const colors = theme.themeColors;

    if (!account || !account.address) {
      return <ConnectWallet currentTheme={currentTheme} />;
    }

    return (
      <div className={classes.root}>
        <div className={classes.investedContainer}>
          <div className={classes.titleContainer}>
            <Typography className={classes.title} variant="h2">
              {t("vaults.title1")}
            </Typography>
            <VaultIcon color={colors.page.header.icon} glowColor={colors.page.header.glow} />
            <Typography className={classes.title} variant="h2">
              <span className={classes.titleSpan}>Vault</span> {t("vaults.title2")}?
            </Typography>
          </div>
          {currentTheme === "dark" && (
            <div className={classes.linearContainer}>
              <LinearLine color={colors.page.header.linear.color} middle={colors.page.header.linear.middle} />
            </div>
          )}
          <Typography className={classes.description} variant="h6">
            {t("vaults.desc")}
          </Typography>
          {this.renderFilters({ colors })}
          {this.renderAssetBlocks()}
        </div>
        {loading && <Loader />}
        {snackbarMessage && this.renderSnackbar()}
      </div>
    );
  }

  onSearchChanged = (event) => {
    let val = [];
    val[event.target.id] = event.target.value;
    this.setState(val);
  };

  onChange = (event) => {
    let val = [];
    val[event.target.id] = event.target.checked;
    this.setState(val);
  };

  sortedAssets = (assets, sortBy) => {
    return assets.sort((a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy]));
  };

  renderAssetBlocks = () => {
    const { assets, expanded, search, hideZero, sortBy, account } = this.state;
    const { classes, t } = this.props;
    const width = window.innerWidth;
    const _assets = [...assets];
    return (
      this.sortedAssets(_assets, sortBy)
        .filter((asset) => {
          if (hideZero && asset.balance === 0 && asset.vaultBalance === 0) {
            return false;
          }

          if (search && search !== "") {
            return (
              asset.id.toLowerCase().includes(search.toLowerCase()) ||
              asset.name.toLowerCase().includes(search.toLowerCase()) ||
              asset.symbol.toLowerCase().includes(search.toLowerCase()) ||
              asset.description.toLowerCase().includes(search.toLowerCase()) ||
              asset.vaultSymbol.toLowerCase().includes(search.toLowerCase())
            );
            // asset.erc20address.toLowerCase().includes(search.toLowerCase()) ||
            // asset.vaultContractAddress.toLowerCase().includes(search.toLowerCase())
          } else {
            return true;
          }
        })
        // .map((asset, i) => {
        //   // TODO: for testing
        //   asset.balance = 123
        //   return asset
        // })
        .map((asset) => {
          return (
            <Accordion
              className={classes.expansionPanel}
              square
              key={asset.id + "_expand"}
              expanded={expanded === asset.id}
              onChange={() => {
                this.handleChange(asset.id);
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <div className={classes.assetSummary}>
                  <div className={classes.headingName}>
                    <div className={classes.assetIcon}>
                      <img
                        alt=""
                        src={require("../../assets/" + asset.symbol + "-logo.png")}
                        height={width > 600 ? "40px" : "30px"}
                        style={asset.disabled ? { filter: "grayscale(100%)" } : {}}
                      />
                    </div>
                    <div>
                      <Typography className={classes.assetTitle} variant={"h3"} noWrap>
                        {asset.name}
                      </Typography>
                      <Typography className={classes.assetDescription} variant={"h5"}>
                        {asset.description}
                      </Typography>
                    </div>
                  </div>
                  {!["LINK"].includes(asset.id) && asset.vaultBalance > 0 && (
                    <div className={classes.headingEarning}>
                      <Typography variant={"h5"} className={classes.assetDescription}>
                        You are earning:
                      </Typography>
                      <div className={classes.flexy}>
                        <Typography variant={"h3"} noWrap>
                          {asset.apy ? `${asset.apy.toFixed(2)}%` : <Skeleton style={{ width: "50px" }} />}{" "}
                        </Typography>
                      </div>
                    </div>
                  )}
                  {!["LINK"].includes(asset.id) && asset.vaultBalance > 0 && (
                    <div className={classes.headingEarning}>
                      <Typography variant={"h5"} className={classes.assetDescription}>
                        You are earning:
                      </Typography>
                      <div className={classes.flexy}>
                        <Typography variant={"h3"} noWrap>
                          {asset.apy ? `${asset.apy.toFixed(2)}%` : <Skeleton style={{ width: "50px" }} />}{" "}
                        </Typography>
                        <Typography variant={"h5"} className={classes.assetDescription}>
                          {" "}
                          on{" "}
                        </Typography>
                        <Typography className={classes.assetDescription} variant={"h3"} noWrap>
                          {asset.vaultBalance ? asset.vaultBalance.toFixed(2) : <Skeleton style={{ width: "50px" }} />}{" "}
                          {asset.vaultSymbol}
                        </Typography>
                      </div>
                    </div>
                  )}
                  {!["LINK"].includes(asset.id) && asset.vaultBalance === 0 && (
                    <div className={classes.headingEarning}>
                      <div className={classes.flexy}>
                        <Typography className={classes.assetTitle} variant={"h3"} noWrap>
                          {asset.apy ? `${asset.apy.toFixed(2)}%` : <Skeleton style={{ width: "50px" }} />}{" "}
                        </Typography>
                      </div>
                      <Typography variant={"h5"} className={classes.assetDescription}>
                        {t("vaults.item.earning")}
                      </Typography>
                    </div>
                  )}
                  {["LINK"].includes(asset.id) && (
                    <div className={classes.headingEarning}>
                      <Typography className={classes.assetTitle} variant={"h3"} noWrap>
                        N/A
                      </Typography>
                      <Typography variant={"h5"} className={classes.assetDescription}>
                        {t("vaults.item.earning")}
                      </Typography>
                    </div>
                  )}
                  <div className={classes.heading}>
                    <Typography className={classes.assetTitle} variant={"h3"} noWrap>
                      {(asset.balance ? asset.balance.toFixed(2) : "0.00") + " " + asset.symbol}
                    </Typography>
                    <Typography variant={"h5"} className={classes.assetDescription}>
                      {t("vaults.item.availableDeposit")}
                    </Typography>
                  </div>
                </div>
              </AccordionSummary>
              <ApyTable
                pyEarnData={asset.pyEarnData}
                address={account.address}
                showYvaultRoi={account.address && asset.description === "renBTC/wBTC/sBTC"}
              />
              <AccordionDetails>
                <Asset asset={asset} startLoading={this.startLoading} />
              </AccordionDetails>
            </Accordion>
          );
        })
    );
  };

  renderFilters = ({ colors }) => {
    const { loading, search, searchError, hideZero, sortBy } = this.state;
    const { classes, t } = this.props;

    return (
      <>
        <div className={classes.filters}>
          <FormControlLabel
            className={classes.checkbox}
            control={<Checkbox checked={hideZero} onChange={this.handleChecked} color="primary" />}
            label={t("vaults.hideBalances")}
          />
          <div className={classes.inputContainer}>
            <div className={classes.between}>
              <Tooltip
                title={
                  <React.Fragment>
                    <Typography variant={"h5"} className={classes.fees}>
                      {t("vaults.info1")}
                      <br />
                      <br />
                      {t("vaults.info2")}
                    </Typography>
                  </React.Fragment>
                }
                arrow
              >
                <div>
                  <InfoIcon color={colors.page.header.icon} glowColor={colors.page.header.glow} />
                </div>
              </Tooltip>
            </div>
            <TextField
              fullWidth
              disabled={loading}
              className={classes.searchField}
              id={"search"}
              value={search}
              error={searchError}
              onChange={this.onSearchChanged}
              placeholder="ETH, CRV, ..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="end" className={classes.inputSearch}>
                      <SearchIcon color="#BBBDBF" />
                    </InputAdornment>
                    <InputAdornment position="start" className={classes.inputFilter}>
                      <FilterIcon color="#BBBDBF" />
                    </InputAdornment>
                  </>
                ),
              }}
            />
          </div>
        </div>
        <div className={classes.sortContainer}>
          <Typography variant={"h6"} className={classes.label}>
            {t("vaults.sortBy")}
          </Typography>
          <select className={classes.select} value={sortBy} onChange={(e) => this.setState({ sortBy: e.target.value })}>
            <option className={classes.option} value="balance">
              {t("vaults.balance")}
            </option>
            <option className={classes.option} value="apy">
              APY
            </option>
          </select>
          <div className={classes.connectedArrow}></div>
        </div>
      </>
    );
  };

  handleChecked = (event) => {
    this.setState({ hideZero: event.target.checked });
    localStorage.setItem("yearn.finance-hideZero", event.target.checked ? "1" : "0");
  };

  handleChange = (id) => {
    this.setState({ expanded: this.state.expanded === id ? null : id });
  };

  startLoading = () => {
    this.setState({ loading: true });
  };

  renderSnackbar = () => {
    var { snackbarType, snackbarMessage } = this.state;
    return <Snackbar type={snackbarType} message={snackbarMessage} open={true} />;
  };
}

export default withNamespaces()(withRouter(withStyles(styles)(withTheme(Vault))));
