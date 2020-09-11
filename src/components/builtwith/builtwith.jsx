import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import Store from '../../stores'
const store = Store.store

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    root: {
      flex: 1,
      height: 'auto',
      display: 'flex',
      position: 'relative',
    },
    contentContainer: {
      margin: 'auto',
      textAlign: 'center',
      display: 'flex',
      flexWrap: 'wrap',
    },
    closeIcon: {
      position: 'fixed',
      right: '12px',
      top: '12px',
      cursor: 'pointer',
    },
    button: {
      padding: '6px 10px',
      borderRadius: '20px',
      fontWeight: 500,
      border: colors.popup.border,
      minWidth: '170px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '&:hover': {
        border: colors.popup.border,
      },
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: '24px',
      color: colors.popup.text,
    },
    buttonWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      },
    },
    buttonContainer: {
      padding: '12px 0px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    icon: {
      width: '30px',
      height: '30px',
    },
  }
}

class BuildWith extends Component {
  constructor(props) {
    super()

    this.state = {}
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    const { classes, closeModal } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.closeIcon} onClick={closeModal}>
          <CloseIcon />
        </div>
        <div className={classes.contentContainer}>
          <MyComponent classes={classes} />
        </div>
      </div>
    )
  }
}

function MyComponent({ classes }) {
  const builtWith = store.getStore('builtWith')

  return (
    <div className={classes.buttonWrapper}>
      {builtWith.map((project) => {
        const url = require('../../assets/' + project.logo)

        return (
          <div key={project.name} className={classes.buttonContainer}>
            <Button
              className={classes.button}
              variant='outlined'
              color='primary'
              onClick={() => {
                window.open(project.website, '_blank')
              }}
            >
              <Typography className={classes.buttonText} variant={'h3'}>
                {project.name}
              </Typography>
              <img className={classes.icon} src={url} alt='icon brand' />
            </Button>
          </div>
        )
      })}
    </div>
  )
}

export default withRouter(withStyles(styles)(BuildWith))
