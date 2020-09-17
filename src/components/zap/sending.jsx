import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Typography, TextField, InputAdornment, Button, Slider } from "@material-ui/core";

import { withNamespaces } from "react-i18next";
// import {
//   BALANCES_RETURNED
// } from '../../constants'

// import Store from "../../stores";
// const emitter = Store.emitter
// const dispatcher = Store.dispatcher
// const store = Store.store

const styles = (theme) => {
  const colors = theme.themeColors;
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      minWidth: "100%",
    },
    inputCard: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    inputCardHeading: {
      width: "100%",
      padding: "12px 0px 12px 20px",
      color: colors.darkGray,
    },
    inputAdornment: {
      fontWeight: "600",
      fontSize: "1.5rem",
    },
    actionInput: {
      padding: "0px 0px 12px 0px",
      fontSize: "0.5rem",
    },
    scaleContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      padding: "0px 0px 12px 0px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    scale: {
      minWidth: "10px",
    },
    buttonText: {
      fontWeight: "700",
    },
    title: {
      fontWeight: "bold",
      fontSize: "24px",
      lineHeight: "36px",
      color: colors.page.header.text,
      margin: "0 5px",
    },
    value: {
      cursor: "pointer",
      fontSize: "12px",
      lineHeight: "20px",
      color: colors.page.asset.color,
      fontWeight: "normal",
    },
    tradeContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      "& input": {
        background: colors.page.asset.input.bg,
        border: colors.page.asset.input.border,
        boxSizing: "border-box",
        boxShadow: colors.page.asset.input.shadow,
        borderRadius: "20px",
        padding: "9px 9px 9px 15px",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "22px",
        letterSpacing: "0.02em",
        color: colors.page.asset.input.color,
        height: "40px",
        "&::-webkit-input-placeholder": {
          color: colors.page.asset.input.color,
          opacity: "1",
        },
        "&:-ms-input-placeholder": {
          color: colors.page.asset.input.color,
          opacity: 1,
        },
        "&::placeholder": {
          color: colors.page.asset.input.color,
          opacity: 1,
        },
      },
      "& fieldset": {
        border: "0",
        "&:hover": {
          borderWidth: "0",
        },
      },
      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderWidth: "0",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderWidth: "0",
      },
    },
    percentContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      marginTop: "-2px",
      "& h5:nth-child(2n)": {
        marginRight: "-3px",
      },
      "& h5:nth-child(3n)": {
        marginRight: "-5px",
      },
      "& h5:nth-child(4n)": {
        marginRight: "-16px",
      },
      "& h5:last-of-type": {
        marginRight: "-10px",
      },
    },
    percent: {
      fontWeight: colors.page.asset.slider.percentWeight,
      fontSize: "12px",
      lineHeight: "20px",
      color: colors.page.asset.slider.percent,
      cursor: "pointer",
    },
    sliderContainer: {
      width: "98%",
      marginTop: "36px",
      "& .MuiSlider-rail": {
        height: "8px",
        borderRadius: "12px",
        background: colors.page.asset.slider.rail,
        width: "102%",
      },
      "& .MuiSlider-track": {
        height: "8px",
        borderRadius: "12px",
        background: colors.page.asset.slider.track,
      },
      "& .MuiSlider-thumb": {
        color: "transparent",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        filter: colors.page.asset.slider.thumb.filter,
        background: colors.page.asset.slider.thumb.bg,
        border: colors.page.asset.slider.thumb.border,
        boxSizing: "border-box",
        top: "50%",
        marginTop: "2px",
        transform: "translateY(-50%)",
        marginLeft: "-6px",
      },
      "& .MuiSlider-root": {
        color: colors.page.asset.slider.mark,
      },
      "& .MuiSlider-markActive": {
        backgroundColor: colors.page.asset.slider.activeMark,
        opacity: "1",
      },
      "& .MuiSlider-mark": {
        visibility: "hidden",
        height: "8px",
        width: "8px",
        borderRadius: "50%",
        "&:nth-child(25n + 4)": {
          visibility: "visible",
        },
      },
      "& .MuiSlider-valueLabel": {
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "22px",
        textAlign: "center",
        letterSpacing: "0.02em",
        color: colors.page.asset.slider.value.color,
        textShadow: colors.page.asset.slider.value.glow,
        marginLeft: "11px",
        top: "-23px",
        display: "flex",
        alignItems: "center",
        "& span": {
          backgroundColor: "transparent",
          width: "max-content",
          color: colors.page.asset.slider.value.color,
        },
        "&::after": {
          content: '"%"',
        },
      },
    },
    labeledInput: {
      width: "100%",
      position: "relative",
      "& span": {
        top: "25%",
        right: "3%",
        position: "absolute",
        color: colors.page.zap.inputLabel,
        fontWeight: "bold",
      },
    },
  };
};

class Sending extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      sliderValue: 0,
    };
  }

  render() {
    const { classes, sendAsset, sendAmount, loading, t } = this.props;
    console.log({ sendAsset });
    const { slider } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.inputCard}>
          <Typography variant="h3" className={classes.title}>
            {t("zap.sendAmount")}
          </Typography>
          {this.renderAmountInput("amount", sendAmount, false, "Amount", "0.00", sendAsset ? sendAsset.symbol : "")}
        </div>
      </div>
    );
  }

  onChange = (event, value) => {
    let val = [];
    val[event.target.name] = event.target.value;
    this.setState(val);
  };

  handleChangeSlider = (val) => {
    this.props.setSendAmountPercent(val);
    this.setState({ sliderValue: val });
  };

  handleChangeValue = (val) => {
    this.props.setSendAmount(val);
    this.setState({ sliderValue: 0 });
  };

  renderAmountInput = (id, value, error, label, placeholder, inputAdornment) => {
    const { classes, loading, sendAsset, sendAmount, setSendAmount } = this.props;
    const { sliderValue } = this.state;
    return (
      <div className={classes.tradeContainer}>
        <div className={classes.labeledInput}>
          <TextField
            fullWidth
            id="amount"
            value={sendAmount}
            error={error}
            onChange={(e) => this.handleChangeValue(e.target.value)}
            disabled={loading}
            placeholder={placeholder}
            variant="outlined"
          />
          {sendAsset && <span>{sendAsset.symbol}</span>}
        </div>
        <div className={classes.sliderContainer}>
          <Slider
            value={sliderValue}
            aria-labelledby="discrete-slider"
            step={1}
            marks
            min={0}
            max={100}
            valueLabelDisplay="on"
            disabled={loading}
            onChange={(_, val) => this.handleChangeSlider(val)}
          />
        </div>
        <div className={classes.percentContainer}>
          <Typography variant="h5" className={classes.percent} onClick={() => this.handleChangeSlider(0)}>
            0%
          </Typography>
          <Typography variant="h5" className={classes.percent} onClick={() => this.handleChangeSlider(25)}>
            25%
          </Typography>
          <Typography variant="h5" className={classes.percent} onClick={() => this.handleChangeSlider(50)}>
            50%
          </Typography>
          <Typography variant="h5" className={classes.percent} onClick={() => this.handleChangeSlider(75)}>
            75%
          </Typography>
          <Typography variant="h5" className={classes.percent} onClick={() => this.handleChangeSlider(100)}>
            100%
          </Typography>
        </div>
      </div>
    );
  };
}

export default withNamespaces()(withRouter(withStyles(styles)(Sending)));
