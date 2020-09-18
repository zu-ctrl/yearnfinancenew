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
      padding: '50px 15px 100px',
      [theme.breakpoints.down('xs')]: {
        padding: '20px 15px 60px',
      },
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
      [theme.breakpoints.down('xs')]: {
        fontSize: '22px',
        lineHeight: '34px',
      },
    },
    subTitle: {
      fontWeight: 'normal',
      fontSize: '18px',
      lineHeight: '28px',
      textAlign: 'center',
      color: colors.text,
      marginTop: '32px',
      [theme.breakpoints.down('xs')]: {
        fontSize: '16px',
        lineHeight: '26px',
        marginTop: '25px',
      },
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
      [theme.breakpoints.down('xs')]: {
        maxWidth: '140px',
      },
      '&.MuiButton-root': {
        transition: 'none',
      },
      '&.MuiButton-outlinedPrimary:hover': {
        border: colors.button.border,
      },
    },
    buttonLeft: {
      left: '0',
    },
    buttonRight: {
      right: '0',
      background: colors.button.bg,
      boxShadow: colors.button.shadow,
      border: 'none',
      color: colors.button.hover,
      '&.MuiButton-outlinedPrimary:hover': {
        background: colors.button.bg,
        border: 'none',
      },
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
      [theme.breakpoints.down('xs')]: {
        marginTop: '120px',
      },
    },
    connectContainer: {
      margin: '78px auto 0',
      maxWidth: '460px',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        marginTop: '50px',
      },
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

const ConnectWallet = ({ t, classes, currentTheme }) => {
  const [selectedSlide, setSelectedSlide] = useState(0)

  const slidesData = [
    {
      title: `${t('connectWallet.slide1.title')}:`,
      title2: t('connectWallet.slide1.title2'),
      subtitle: t('connectWallet.slide1.subtitle'),
      imagePath: require('../../assets/connect-wallet-slide-1.svg'),
    },
    {
      title: t('connectWallet.slide2.title'),
      subtitle: t('connectWallet.slide2.subtitle'),
      imagePath: require('../../assets/connect-wallet-slide-2.svg'),
    },
    {
      title: t('connectWallet.slide3.title'),
      subtitle: t('connectWallet.slide3.subtitle'),
      imagePath: require('../../assets/connect-wallet-slide-3.svg'),
    },
    {
      title: t('connectWallet.slide4.title'),
      subtitle: t('connectWallet.slide4.subtitle'),
      imagePath: require('../../assets/connect-wallet-slide-4.svg'),
    },
    {
      title: t('connectWallet.slide5.title'),
      subtitle: t('connectWallet.slide5.subtitle'),
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
          onChange={(val) => setSelectedSlide(val < 0 ? slidesData.length - 1 : val > slidesData.length - 1 ? 0 : val)}
          addArrowClickHandler
          arrowLeft={
            <Button variant='outlined' color='primary' className={`${classes.button} ${classes.buttonLeft}`}>
              {t('connectWallet.previous').toUpperCase()}
            </Button>
          }
          arrowRight={
            slidesData.length - 1 === selectedSlide ? (
              <Button variant='outlined' color='primary' className={`${classes.button} ${classes.buttonRight}`}>
                {t('connectWallet.startOver').toUpperCase()}
              </Button>
            ) : (
              <Button variant='outlined' color='primary' className={`${classes.button} ${classes.buttonRight}`}>
                {t('connectWallet.next').toUpperCase()}
              </Button>
            )
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
          alt='connect linear'
          src={require(`../../assets/theme/connect-linear-middle-${currentTheme}.svg`)}
        />
      </div>
      <div className={classes.linear}>
        <img
          className={classes.line}
          alt='connect linear'
          src={require(`../../assets/theme/connect-linear-lg-${currentTheme}.svg`)}
        />
      </div>
      <div className={classes.connectContainer}>
        <Typography className={classes.walletTitle} variant={'h3'}>
          {`${t('connectWallet.connectText')}...`}
        </Typography>
        <Connector closeModal={() => window.scrollTo(0, 0)} />
      </div>
    </div>
  )
}

export default withNamespaces()(withRouter(withStyles(styles)(ConnectWallet)))
