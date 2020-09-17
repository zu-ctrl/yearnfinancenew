import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import BuiltWithModal from '../builtwith/builtwithModal.jsx'
import ThemeChooser from '../themeChooser'
import LangChooser from '../langChooser'
import BuiltWithIcon from '../icons/builtWithIcon'
import DiscordIcon from '../icons/discordIcon'
import DocsIcon from '../icons/docsIcon'
import GithubIcon from '../icons/githubIcon'
import MediumIcon from '../icons/mediumIcon'
import SnapshotIcon from '../icons/snapshotIcon'
import StatsIcon from '../icons/statsIcon'
import TelegramIcon from '../icons/telegramIcon'
import TwitterIcon from '../icons/twitterIcon'
import YearnIcon from '../icons/yearnIcon'
import YgovIcon from '../icons/ygovIcon'
import YinsureIcon from '../icons/yinsureIcon'
import YborrowIcon from '../icons/yborrowIcon'

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    footer: {
      padding: '22px 10px',
      display: 'flex',
      justifyContent: 'space-evenly',
      width: '100%',
      background: colors.footer.bg,
      position: 'relative',
      flexWrap: 'wrap',
      overflow: 'hidden',
    },
    gradient: {
      background: colors.footer.gradient,
      width: '100%',
      position: 'absolute',
      height: '100%',
      top: '0',
    },
    heading: {
      width: 'fit-content',
      marginBottom: '16px',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '28px',
      color: colors.footer.title,
    },
    link: {
      paddingBottom: '12px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    icon: {
      marginRight: '7px',
      display: 'flex',
    },
    glow: {
      filter: 'drop-shadow(0px 0px 10px #40A9FF)',
      marginRight: '7px',
      display: 'flex',
    },
    yearnIcon: {
      minHeight: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    builtWith: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      maxWidth: '160px',
      width: '100%',
      padding: '0px 24px',
      [theme.breakpoints.down('sm')]: {
        padding: '0px 15px',
        marginBottom: '25px',
        maxWidth: '250px',
        width: '100%',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    builtWithLink: {
      marginTop: '16px',
      paddingBottom: '0',
    },
    builtHeading: {
      width: 'fit-content',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '28px',
      color: colors.footer.title,
    },
    products: {
      padding: '0px 24px',
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        padding: '0px 15px',
        marginBottom: '25px',
        maxWidth: '250px',
        width: '100%',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    community: {
      padding: '0px 24px',
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        padding: '0px 15px',
        marginBottom: '25px',
        maxWidth: '250px',
        width: '100%',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    socials: {
      padding: '0px 24px',
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        padding: '0px 15px',
        maxWidth: '250px',
        width: '100%',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    linearContainer: {
      display: 'flex',
      maxWidth: '1036px',
      width: '100%',
      marginTop: '-1px',
      justifyContent: 'center',
      '& img': {
        width: '100%',
      },
    },
    logo: {
      maxWidth: '72px',
      width: '100%',
      marginTop: '16px',
      height: 'auto',
    },
    linkText: {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '0.02em',
      color: colors.footer.link,
    },
  }
}

class Footer extends Component {
  constructor(props) {
    super()

    this.state = {
      modalBuiltWithOpen: false,
    }
  }

  render() {
    const { classes, location, themeName, theme, setTheme, currentLang, setCurrentLang, langList } = this.props
    const { modalBuiltWithOpen } = this.state
    const colors = theme.themeColors

    if (location.pathname === '' || location.pathname === '/') {
      return null
    }

    return (
      <>
        <div className={classes.linearContainer}>
          <img alt="footer linear" src={require(`../../assets/theme/footer-linear-${themeName}.svg`)} />
        </div>
        <div className={classes.footer}>
          <div className={classes.gradient} />
          <div className={classes.builtWith}>
            <Typography className={classes.builtHeading} variant={'h6'}>
              yearn.finance
            </Typography>
            <img className={classes.logo} alt="footer logo" src={require('../../assets/YFI-logo.png')} />
            <div
              className={`${classes.link} ${classes.builtWithLink}`}
              onClick={() => {
                this.builtWithOverlayClicked()
              }}
            >
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <BuiltWithIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                built with...
              </Typography>
            </div>
            <div>
              <ThemeChooser themeName={themeName} setTheme={setTheme} />
              <LangChooser currentLang={currentLang} setCurrentLang={setCurrentLang} langList={langList} />
            </div>
          </div>
          <div className={classes.products}>
            <Typography className={classes.heading} variant={'h6'}>
              Products
            </Typography>
            <div className={classes.link} onClick={() => window.open('https://yearn.finance', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <YearnIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                yearn.finance
              </Typography>
            </div>
            <div className={classes.link} onClick={() => window.open('https://ygov.finance', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <YgovIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                ygov.finance
              </Typography>
            </div>
            <div className={classes.link} onClick={() => window.open('https://yinsure.finance', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <YinsureIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                yinsure.finance
              </Typography>
            </div>
            <div className={classes.link} onClick={() => window.open('https://yborrow.finance', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <YborrowIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                yborrow.finance
              </Typography>
            </div>
            <div className={classes.link} onClick={() => window.open('https://docs.yearn.finance', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <DocsIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                docs.yearn.finance
              </Typography>
            </div>
          </div>
          <div className={classes.community}>
            <Typography className={classes.heading} variant={'h6'}>
              Community
            </Typography>
            <div className={classes.link} onClick={() => window.open('https://ycosystem.info', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <DocsIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                ycosystem.info
              </Typography>
            </div>
            <div className={classes.link} onClick={() => window.open('https://www.learnyearn.finance', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <DocsIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                learnyearn.finance
              </Typography>
            </div>
            <div className={classes.link} onClick={() => window.open('https://stats.finance/yearn', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <StatsIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                stats.finance
              </Typography>
            </div>
            <div className={classes.link} onClick={() => window.open('https://yieldfarming.info', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <StatsIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                yieldfarming.info
              </Typography>
            </div>
            <div className={classes.link} onClick={() => window.open('https://feel-the-yearn.app', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <StatsIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                feel-the-yearn.app
              </Typography>
            </div>
            <div className={classes.link} onClick={() => window.open('https://yearn.snapshot.page', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <SnapshotIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                yearn.snapshot.page
              </Typography>
            </div>
          </div>
          <div className={classes.socials}>
            <Typography className={classes.heading} variant={'h6'}>
              Socials
            </Typography>
            <div className={classes.link} onClick={() => window.open('https://twitter.com/iearnfinance', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <TwitterIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                Twitter
              </Typography>
            </div>
            <div className={classes.link} onClick={() => window.open('https://medium.com/iearn', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <MediumIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                Medium
              </Typography>
            </div>
            <div className={classes.link} onClick={() => window.open('https://discord.gg/GcjxhWR', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <DiscordIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                Discord
              </Typography>
            </div>
            <div className={classes.link} onClick={() => window.open('https://t.me/yearnfinance', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <TelegramIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                Telegram
              </Typography>
            </div>
            <div className={classes.link} onClick={() => window.open('https://github.com/iearn-finance', '_blank')}>
              <div className={`${themeName === 'dark' ? classes.glow : classes.icon}`}>
                <GithubIcon color={colors.footer.icon} />
              </div>
              <Typography className={classes.linkText} variant={'h4'}>
                Github
              </Typography>
            </div>
          </div>
          {modalBuiltWithOpen && this.renderBuiltWithModal()}
        </div>
      </>
    )
  }

  renderBuiltWithModal = () => {
    return <BuiltWithModal closeModal={this.closeBuiltWithModal} modalOpen={this.state.modalBuiltWithOpen} />
  }

  builtWithOverlayClicked = () => {
    this.setState({ modalBuiltWithOpen: true })
  }

  closeBuiltWithModal = () => {
    this.setState({ modalBuiltWithOpen: false })
  }
}

export default withRouter(withStyles(styles)(withTheme(Footer)))
