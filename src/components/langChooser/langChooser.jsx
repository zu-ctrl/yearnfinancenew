import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, MenuItem } from "@material-ui/core";

const styles = (theme) => {
  const colors = theme.themeColors;
  return {
    assetSelectRoot: {
      "& .MuiInputBase-root": {
        background: colors.page.asset.input.bg,
        border: colors.page.asset.input.border,
        boxSizing: "border-box",
        boxShadow: colors.page.asset.input.shadow,
        borderRadius: "20px",
        padding: "4px",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "22px",
        letterSpacing: "0.02em",
        color: colors.page.asset.input.color,
        height: "40px",
      },
      "& .MuiOutlinedInput-input": {
        padding: "0",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "& .MuiSelect-icon": {
        color: "#818FA6",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "& .MuiSelect-select:focus": {
        background: "transparent",
      },
    },
    assetSelectMenu: {
      padding: "15px 15px 15px 20px",
      // minWidth: '30px',
    },
    assetSelectIcon: {
      display: "inline-block",
      verticalAlign: "middle",
      borderRadius: "25px",
      background: "#dedede",
      height: "30px",
      width: "30px",
      textAlign: "center",
      cursor: "pointer",
      objectFit: "cover",
    },
    assetSelectLabel: {
      paddingLeft: "5px",
    },
  };
};

const LangChooser = ({ currentLang, setCurrentLang, langList, classes }) => {
  const handleChangeLang = (newLang) => {
    setCurrentLang(newLang);
    localStorage.setItem("yearnfinewLang", newLang);
  };
  return (
    <TextField
      select
      value={currentLang}
      onChange={(e) => handleChangeLang(e.target.value)}
      SelectProps={{
        native: false,
      }}
      variant="outlined"
      fullWidth
      // disabled={loading}
      className={classes.assetSelectRoot}
    >
      {langList.map((el, i) => {
        return (
          <MenuItem key={i} value={el.toUpperCase()} className={classes.assetSelectMenu}>
            <img
              className={classes.assetSelectIcon}
              src={require(`../../assets/countries/${el.toLowerCase()}.svg`)}
              alt=""
            />
            <span className={classes.assetSelectLabel}>{el.toUpperCase()}</span>
          </MenuItem>
        );
      })}
    </TextField>
  );
  return (
    <div>
      <select value={currentLang} onChange={(e) => handleChangeLang(e.target.value)}>
        {langList.map((el, i) => {
          console.log({ el });
          return (
            <option key={i} value={el.toUpperCase()}>
              {require(`../../assets/countries/${el.toLowerCase()}.svg`)}
              {/* <img src={require(`../../assets/countries/${el.toLowerCase()}.svg`)} alt="" /> */}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(LangChooser);
