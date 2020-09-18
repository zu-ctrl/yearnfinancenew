import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Card, Typography } from '@material-ui/core'
import { withNamespaces } from 'react-i18next'

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    root: {
      flex: 1,
      display: 'flex',
      height: '100vh',
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'column',
      background: colors.home.bg,
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
      },
    },
    hoverIcon: {
      display: 'none',
    },
    card: {
      flex: '1',
      height: '25vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      cursor: 'pointer',
      borderRadius: '0px',
      transition: 'background-color 0.2s linear',
      [theme.breakpoints.up('sm')]: {
        height: '100vh',
        minWidth: '20%',
        minHeight: '50vh',
      },
    },
    earn: {
      '&:hover': {
        backgroundColor: colors.pink,
        '& .earn-icon': {
          display: 'none',
        },
        '& .earn-hover': {
          display: 'block',
        },
        '& .title': {
          color: colors.home.hover,
        },
        '& .description': {
          display: 'block',
          color: colors.home.hover,
          [theme.breakpoints.down('xs')]: {
            display: 'none',
          },
        },
      },
      '& .icon': {
        color: colors.pink,
      },
      '& .description': {
        display: 'none',
      },
    },
    zap: {
      '&:hover': {
        backgroundColor: colors.blue,
        '& .zap-icon': {
          display: 'none',
        },
        '& .zap-hover': {
          display: 'block',
        },
        '& .icon': {
          color: colors.white,
        },
        '& .title': {
          color: colors.home.hover,
        },
        '& .description': {
          display: 'block',
          color: colors.home.hover,
          [theme.breakpoints.down('xs')]: {
            display: 'none',
          },
        },
      },
      '& .soon': {
        color: colors.blue,
        display: 'none',
      },
      '& .icon': {
        color: colors.blue,
      },
      '& .description': {
        display: 'none',
      },
    },
    apr: {
      '&:hover': {
        backgroundColor: colors.lightBlack,
        '& .apr-icon': {
          display: 'none',
        },
        '& .apr-hover': {
          display: 'block',
        },
        '& .icon': {
          color: colors.white,
        },
        '& .title': {
          color: colors.home.hover,
        },
        '& .description': {
          display: 'block',
          color: colors.home.hover,
          [theme.breakpoints.down('xs')]: {
            display: 'none',
          },
        },
      },
      '& .icon': {
        color: colors.lightBlack,
      },
      '& .description': {
        display: 'none',
      },
    },
    vault: {
      '&:hover': {
        backgroundColor: colors.tomato,
        '& .vault-icon': {
          display: 'none',
        },
        '& .vault-hover': {
          display: 'block',
        },
        '& .icon': {
          color: colors.white,
        },
        '& .title': {
          color: colors.home.hover,
        },
        '& .description': {
          display: 'block',
          color: colors.home.hover,
          [theme.breakpoints.down('xs')]: {
            display: 'none',
          },
        },
      },
      '& .icon': {
        color: colors.tomato,
      },
      '& .description': {
        display: 'none',
      },
    },
    cover: {
      '&:hover': {
        backgroundColor: colors.compoundGreen,
        '& .cover-icon': {
          display: 'none',
        },
        '& .cover-hover': {
          display: 'block',
        },
        '& .icon': {
          color: colors.white,
        },
        '& .title': {
          color: colors.home.hover,
        },
        '& .description': {
          display: 'block',
          color: colors.home.hover,
          [theme.breakpoints.down('xs')]: {
            display: 'none',
          },
        },
      },
      '& .icon': {
        color: colors.compoundGreen,
      },
      '& .description': {
        display: 'none',
      },
    },
    title: {
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '28px',
      textAlign: 'center',
      color: colors.home.text,
      marginTop: '14px',
    },
    description: {
      fontSize: '14px',
      lineHeight: '22px',
      textAlign: 'center',
      fontWeight: 'normal',
      color: colors.home.text,
      maxWidth: '200px',
      width: '100%',
      margin: '14px auto 0',
      position: 'absolute',
      left: '50%',
      bottom: '-14px',
      transform: 'translate(-50%, 100%)',
    },
    icon: {
      fontSize: '60px',
      [theme.breakpoints.up('sm')]: {
        fontSize: '100px',
      },
    },
    link: {
      textDecoration: 'none',
    },
    cardHeight: {
      height: 'calc(100vh - 40px)',
    },
    fullHeight: {
      height: '100vh',
    },
    glowVaults: {
      filter: 'drop-shadow(0px 0px 10px rgba(202, 115, 116, 0.6))',
    },

    glowEarn: {
      filter: 'drop-shadow(0px 0px 10px rgba(199, 112, 235, 0.6))',
    },
    glowZap: {
      filter: 'drop-shadow(0px 0px 10px rgba(78, 129, 238, 0.6))',
    },
    glowApr: {
      filter: 'drop-shadow(0px 0px 10px rgba(135, 135, 135, 0.5))',
    },
    glowCover: {
      filter: 'drop-shadow(0px 0px 10px rgba(70, 185, 110, 0.6))',
    },
    content: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        '& img': {
          height: '60px',
          width: 'auto',
        },
      },
    },
  }
}

class Home extends Component {
  constructor(props) {
    super()

    this.state = {}
  }

  render() {
    const { classes, t, location, isBeta, currentTheme, closeMobileMenu } = this.props

    return (
      <div className={classes.root} style={isBeta ? { height: 'calc(100vh - 40px)' } : { heigth: '100vh' }}>
        <Card
          className={`${classes.card} ${isBeta ? classes.cardHeight : classes.fullHeight} ${classes.vault}`}
          onClick={() => {
            this.nav('/vaults')
          }}
        >
          <div className={classes.content}>
            <img
              className={`${currentTheme === 'dark' && classes.glowVaults} vault-icon`}
              src={require(`../../assets/theme/menu-vaults-icon.svg`)}
              alt='vaults icon'
            />
            <img
              className={`${currentTheme === 'dark' && classes.glowVault} ${classes.hoverIcon} vault-hover`}
              src={require(`../../assets/theme/menu-vaults-icon-hover.svg`)}
              alt='vaults icon'
            />
            <Typography variant={'h3'} className={`${classes.title} title`}>
              Vaults
            </Typography>
            <Typography variant={'h4'} className={`${classes.description} description`}>
              {t('home.vaults.desc')}
            </Typography>
          </div>
        </Card>
        <Card
          className={`${classes.card} ${isBeta ? classes.cardHeight : classes.fullHeight} ${classes.earn}`}
          onClick={() => {
            this.nav('/earn')
          }}
        >
          <div className={classes.content}>
            <img
              className={`${currentTheme === 'dark' && classes.glowEarn} earn-icon`}
              src={require(`../../assets/theme/menu-earn-icon.svg`)}
              alt='earn icon'
            />
            <img
              className={`${currentTheme === 'dark' && classes.glowEarn} ${classes.hoverIcon} earn-hover`}
              src={require(`../../assets/theme/menu-earn-icon-hover.svg`)}
              alt='earn icon'
            />
            <Typography variant={'h3'} className={`${classes.title} title`}>
              Earn
            </Typography>
            <Typography variant={'h4'} className={`${classes.description} description`}>
              {t('home.earn.desc')}
            </Typography>
          </div>
        </Card>
        <Card
          className={`${classes.card} ${isBeta ? classes.cardHeight : classes.fullHeight} ${classes.zap}`}
          onClick={() => {
            this.nav('/zap')
          }}
        >
          <div className={classes.content}>
            <img
              className={`${currentTheme === 'dark' && classes.glowZap} zap-icon`}
              src={require(`../../assets/theme/menu-zap-icon.svg`)}
              alt='zap icon'
            />
            <img
              className={`${currentTheme === 'dark' && classes.glowZap} ${classes.hoverIcon} zap-hover`}
              src={require(`../../assets/theme/menu-zap-icon-hover.svg`)}
              alt='zap icon'
            />
            <Typography variant={'h3'} className={`${classes.title} title`}>
              Zap
            </Typography>
            <Typography variant={'h4'} className={`${classes.description} description`}>
              {t('home.zap.desc')}
            </Typography>
          </div>
        </Card>
        <Card
          className={`${classes.card} ${isBeta ? classes.cardHeight : classes.fullHeight} ${classes.apr}`}
          onClick={() => {
            this.nav('/apr')
          }}
        >
          <div className={classes.content}>
            <img
              className={`${currentTheme === 'dark' && classes.glowApr} apr-icon`}
              src={require(`../../assets/theme/menu-apr-icon.svg`)}
              alt='apr icon'
            />
            <img
              className={`${currentTheme === 'dark' && classes.glowApr} ${classes.hoverIcon} apr-hover`}
              src={require(`../../assets/theme/menu-apr-icon-hover.svg`)}
              alt='apr icon'
            />
            <Typography variant={'h3'} className={`${classes.title} title`}>
              APR
            </Typography>
            <Typography variant={'h4'} className={`${classes.description} description`}>
              {t('home.apr.desc')}
            </Typography>
          </div>
        </Card>
        <Card
          className={`${classes.card} ${isBeta ? classes.cardHeight : classes.fullHeight} ${classes.cover}`}
          onClick={() => {
            window.open('https://yinsure.finance', '_blank')
          }}
        >
          <div className={classes.content}>
            <img
              className={`${currentTheme === 'dark' && classes.glowCover} cover-icon`}
              src={require(`../../assets/theme/menu-cover-icon.svg`)}
              alt='cover icon'
            />
            <img
              className={`${currentTheme === 'dark' && classes.glowCover} ${classes.hoverIcon} cover-hover`}
              src={require(`../../assets/theme/menu-cover-icon-hover.svg`)}
              alt='cover icon'
            />
            <Typography variant={'h3'} className={`${classes.title} title`}>
              Cover
            </Typography>
            <Typography variant={'h4'} className={`${classes.description} description`}>
              {t('home.cover.desc')}
            </Typography>
          </div>
        </Card>
      </div>
    )
  }

  nav = (screen) => {
    const { closeMobileMenu } = this.props
    if (closeMobileMenu) closeMobileMenu()
    this.props.history.push(screen)
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(Home)))
