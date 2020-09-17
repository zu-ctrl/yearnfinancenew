import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { TextField, MenuItem } from '@material-ui/core'

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    assetSelectRoot: {
      margin: '29px 0 0 7px',
      height: '40px',
      width: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      '& .MuiInputBase-root': {
        padding: '8px',
        background: colors.langChooser.bg,
        boxShadow: colors.langChooser.shadow,
        boxSizing: 'border-box',
        borderRadius: '20px',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '22px',
        letterSpacing: '0.02em',
        color: colors.page.asset.input.color,
        height: '40px',
      },
      '& .MuiOutlinedInput-input': {
        padding: '0',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .MuiSelect-icon': {
        display: 'none',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .MuiSelect-select:focus': {
        background: 'transparent',
      },
    },
    assetSelectMenu: {
      padding: '10',
      // minWidth: '30px',
    },
    assetSelectIcon: {
      display: 'inline-block',
      verticalAlign: 'middle',
      borderRadius: '25px',
      background: '#dedede',
      height: '24px',
      width: '24px',
      textAlign: 'center',
      cursor: 'pointer',
      objectFit: 'cover',
    },
    assetSelectLabel: {
      paddingLeft: '5px',
    },
  }
}

const LangChooser = ({ currentLang, setCurrentLang, langList, classes }) => {
  const handleChangeLang = (newLang) => {
    setCurrentLang(newLang)
    localStorage.setItem('yearnfinewLang', newLang)
  }
  return (
    <TextField
      select
      value={currentLang}
      onChange={(e) => handleChangeLang(e.target.value)}
      SelectProps={{
        native: false,
      }}
      variant='outlined'
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
              alt=''
            />
            <span className={classes.assetSelectLabel}>{el.toUpperCase()}</span>
          </MenuItem>
        )
      })}
    </TextField>
  )
}

export default withStyles(styles, { withTheme: true })(LangChooser)
