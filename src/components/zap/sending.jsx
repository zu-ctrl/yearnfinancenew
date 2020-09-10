import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography, TextField, InputAdornment, Button, Slider } from '@material-ui/core'

import { withNamespaces } from 'react-i18next'
// import {
//   BALANCES_RETURNED
// } from '../../constants'

// import Store from "../../stores";
// const emitter = Store.emitter
// const dispatcher = Store.dispatcher
// const store = Store.store

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minWidth: '100%',
    },
    inputCard: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    inputCardHeading: {
      width: '100%',
      padding: '12px 0px 12px 20px',
      color: colors.darkGray,
    },
    inputAdornment: {
      fontWeight: '600',
      fontSize: '1.5rem',
    },
    actionInput: {
      padding: '0px 0px 12px 0px',
      fontSize: '0.5rem',
    },
    scaleContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '0px 0px 12px 0px',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    scale: {
      minWidth: '10px',
    },
    buttonText: {
      fontWeight: '700',
    },
  }
}

class Sending extends Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      slider: 0,
    }
  }

  handleChangeSlider = (value) => {
    const { setSendAmountPercent } = this.props
    this.setState({ slider: value })
    setSendAmountPercent(value)
  }

  render() {
    const { classes, sendAsset, sendAmount, loading, t } = this.props
    const { slider } = this.state
    return (
      <div className={classes.root}>
        <div className={classes.inputCard}>
          <Typography variant="h3" className={classes.inputCardHeading}>
            {t('Zap.SendAmount')}
          </Typography>
          {this.renderAmountInput('amount', sendAmount, false, 'Amount', '0.00', sendAsset ? sendAsset.symbol : '')}
          <Slider
            value={slider}
            aria-labelledby="discrete-slider"
            step={1}
            marks
            min={0}
            max={100}
            valueLabelDisplay="on"
            disabled={loading}
            onChange={(_, value) => this.handleChangeSlider(value)}
          />
          <div>
            <div onClick={() => this.handleChangeSlider(0)}>0%</div>
            <div onClick={() => this.handleChangeSlider(25)}>25%</div>
            <div onClick={() => this.handleChangeSlider(50)}>50%</div>
            <div onClick={() => this.handleChangeSlider(75)}>75%</div>
            <div onClick={() => this.handleChangeSlider(100)}>100%</div>
          </div>
        </div>
      </div>
    )
  }

  onChange = (event, value) => {
    let val = []
    val[event.target.name] = event.target.value
    this.setState(val)
  }

  renderAmountInput = (id, value, error, label, placeholder, inputAdornment) => {
    const { classes, loading } = this.props
    return (
      <TextField
        fullWidth
        className={classes.actionInput}
        id={id}
        name={id}
        value={value}
        error={error}
        onChange={(e) => {
          this.props.setSendAmount(e.target.value)
          this.setState({ slider: 0 })
        }}
        disabled={loading}
        placeholder={placeholder}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" className={classes.inputAdornment}>
              <Typography variant="h3">{inputAdornment}</Typography>
            </InputAdornment>
          ),
        }}
      />
    )
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(Sending)))
