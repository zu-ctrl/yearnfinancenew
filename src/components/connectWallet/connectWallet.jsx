import React, { useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import Carousel, { Dots } from '@brainhubeu/react-carousel'
import { withRouter } from 'react-router-dom'
import Connector from './connector'
import { Typography, Button } from '@material-ui/core'
import '@brainhubeu/react-carousel/lib/style.css'

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    root: {
      background: colors.bg,
      width: '100%',
      padding: '50px 0 100px',
    },
    carousel: {
      maxWidth: '460px',
      width: '100%',
      margin: '0 auto',
      position: 'relative',
      '& .BrainhubCarousel__dots': {
        marginTop: '10px',
      },
      '& .BrainhubCarousel__dot': {
        background: 'transparent',
        opacity: '1',
        '&:before': {
          width: '12px',
          height: '12px',
          background: colors.wallet.dot,
        },
        '&:hover': {
          '&:before': {
            background: colors.wallet.dotSelected,
          },
        },
      },
      '& .BrainhubCarousel__dot--selected': {
        '&:before': {
          background: `${colors.wallet.dotSelected} !important`,
        },
      },
    },
    title: {
      fontWeight: 'bold',
      fontSize: '24px',
      lineHeight: '36px',
      textAlign: 'center',
      color: colors.text,
    },
    subTitle: {
      fontWeight: 'normal',
      fontSize: '18px',
      lineHeight: '28px',
      textAlign: 'center',
      color: colors.text,
      marginTop: '32px',
    },
    button: {
      position: 'absolute',
      fontWeight: 'bold',
      fontSize: '14px;',
      lineHeight: '22px',
      letterSpacing: '0.02em',
      bottom: '-90px',
      maxWidth: '195px',
      width: '100%',
      minHeight: '36px',
      border: colors.button.border,
      '&:hover': {
        boxShadow: colors.button.shadow,
        background: colors.button.bg,
        border: 'none',
        color: colors.button.hover,
      },
    },
    buttonLeft: {
      left: '0',
    },
    buttonRight: {
      right: '0',
    },
    imageSlide: {
      maxWidth: '100%',
      width: 'auto',
      marginTop: '49px',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    linearContainerSm: {
      maxWidth: '379px',
      width: '100%',
      minHeight: '69px',
      display: 'flex',
      alignItems: 'flex-start',
      margin: '23px auto -68px',
      background: colors.glowShadow,
    },
    linear: {
      display: 'flex',
      margin: '154px auto 0',
      maxWidth: '840px',
      width: '100%',
      justifyContent: 'center',
    },
    connectContainer: {
      margin: '78px auto 0',
      maxWidth: '460px',
      width: '100%',
    },
    walletTitle: {
      fontWeight: 'bold',
      fontSize: '20px',
      lineHeight: '32px',
      textAlign: 'center',
      color: colors.text,
      textShadow: colors.textShadow,
    },
    line: {
      width: '100%',
    },
  }
}

const ConnectWallet = ({ t, history, classes, currentTheme }) => {
  const [selectedSlide, setSelectedSlide] = useState(0)

  const slidesData = [
    {
      title: 'Welcome to Yearn:',
      title2: 'The simplest way to earn yield on crypto assets for investors large and small',
      subtitle: `If you've never used the Yearn dApp before, read through this quick introduction first.`,
      imagePath: require('../../assets/connect-wallet-slide-1.svg'),
    },
    {
      title: 'What is Yearn?',
      subtitle: `Yearn uses automated decentralized finance strategies to find the best yield and return on your assets. Anyone
      can deposit accepted assets to Yearn to earn passive returns.`,
      imagePath: require('../../assets/connect-wallet-slide-2.svg'),
    },
    {
      title: 'Why use Yearn?',
      subtitle: `Using a Yearn product is like having access to the most advanced money manager in the world. Yearn helps
      depositors large and small save time, money and effort on active management and deployment of funds to the
      most profitable strategy at any time.`,
      imagePath: require('../../assets/connect-wallet-slide-3.svg'),
    },
    {
      title: 'Can’t I just do all this myself?',
      subtitle: `Yes, you could. However vaults help you save on gas, manage assets at healthy levels, auto-optimize for the
      highest yielding strategies at any time, even when you are sleeping... and most importantly, continually cycle
      and compound returns.`,
      imagePath: require('../../assets/connect-wallet-slide-4.svg'),
    },
    {
      title: 'What are the risks?',
      subtitle: `While the assets deposited can't decrease, the debt of the vault can. If a strategy does not manage to
      outperform the debt, then a portion of the asset will be impermanently locked. If a strategy then outperforms
      the debt again, this asset will become unlocked. There are mechanisms in the vaults to help this not to
      happen, but nothing is foolproof. As of now, the Vaults have not been audited. There is also Smart Contract
      risk with any contracts that the vaults interact with.`,
      imagePath: require('../../assets/connect-wallet-slide-5.svg'),
    },
  ]

  return (
    <div className={classes.root}>
      <div className={classes.carousel}>
        <Carousel
          plugins={['clickToChange', 'infinite', 'arrows', 'autoplay']}
          infinite
          autoPlay={10000}
          animationSpeed={1000}
          value={selectedSlide}
          onChange={(val) => setSelectedSlide(val)}
          addArrowClickHandler
          arrowLeft={
            <Button variant="outlined" color="primary" className={`${classes.button} ${classes.buttonLeft}`}>
              {t('PREVIOUS')}
            </Button>
          }
          arrowRight={
            <Button variant="outlined" color="primary" className={`${classes.button} ${classes.buttonRight}`}>
              {t('NEXT')}
            </Button>
          }
          slides={slidesData.map((o, i) => (
            <div className={classes.content} key={i}>
              <Typography className={classes.title} variant={'h3'}>
                {o.title}
              </Typography>
              {o.title2 && (
                <Typography className={classes.title} variant={'h3'}>
                  {o.title2}
                </Typography>
              )}
              <Typography className={classes.subTitle} variant={'h4'}>
                {o.subtitle}
              </Typography>
              <img className={classes.imageSlide} alt={o.title} src={o.imagePath} />
            </div>
          ))}
        />
        <Dots value={selectedSlide} onChange={(val) => setSelectedSlide(val)} number={slidesData.length} />
      </div>
      <div className={classes.linearContainerSm}>
        <img
          className={classes.line}
          alt="connect linear"
          src={require(`../../assets/theme/connect-linear-middle-${currentTheme}.svg`)}
        />
      </div>
      <div className={classes.linear}>
        <img
          className={classes.line}
          alt="connect linear"
          src={require(`../../assets/theme/connect-linear-lg-${currentTheme}.svg`)}
        />
      </div>
      <div className={classes.connectContainer}>
        <Typography className={classes.walletTitle} variant={'h3'}>
          Please connect a wallet to start:
        </Typography>
        <Connector closeModal={() => window.scrollTo(0, 0)} />
      </div>
    </div>
  )
}

export default withNamespaces()(withRouter(withStyles(styles)(ConnectWallet)))
