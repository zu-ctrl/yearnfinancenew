import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { withNamespaces } from "react-i18next";

const styles = (theme) => {
  const colors = theme.themeColors;
  return {
    root: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      background: colors.beta.bg,
      boxShadow: colors.beta.shadow,
      padding: "9px 15px",
      zIndex: "2",
      [theme.breakpoints.down("xs")]: {
        padding: "9px 10px",
        justifyContent: "flex-start",
      },
    },
    close: {
      position: "absolute",
      top: "50%",
      right: "20px",
      transform: "translateY(-50%)",
      cursor: "pointer",
      width: "18px",
      height: "18px",
      "&::before, &::after": {
        position: "absolute",
        left: "8px",
        content: '""',
        height: "19px",
        width: "2px",
        backgroundColor: colors.beta.close,
      },
      "&::before": {
        transform: "rotate(40deg)",
      },
      "&::after": {
        transform: "rotate(-40deg)",
      },
      [theme.breakpoints.down("xs")]: {
        right: "10px",
      },
    },
    title: {
      color: colors.beta.color,
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "22px",
      marginLeft: "9px",
    },
    bottomLine: {
      position: "absolute",
      bottom: "0",
      left: "50%",
      transform: "translateX(-50%)",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
  };
};

const BetaBanner = ({ classes, isBeta, setIsBeta, currentTheme, t }) => {
  const handleCloseBetaBanner = () => {
    setIsBeta(false);
    localStorage.setItem("yearnfinewBeta", "false");
  };
  if (!isBeta) return null;
  return (
    <div className={classes.root}>
      <img alt="info icon" src={require(`../../assets/theme/info-banner-${currentTheme}.svg`)} />
      <Typography className={classes.title} variant={"h6"}>
        {t("betabanner.text")}
      </Typography>
      {currentTheme === "dark" && (
        <img
          className={classes.bottomLine}
          alt="info icon"
          src={require("../../assets/theme/beta-linear-line-dark.svg")}
        />
      )}
      <div className={classes.close} onClick={handleCloseBetaBanner} />
    </div>
  );
};

export default withNamespaces()(withRouter(withStyles(styles)(BetaBanner)));
