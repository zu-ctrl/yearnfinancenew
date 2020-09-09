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
    },
    carousel: {
      maxWidth: '460px',
      width: '100%',
      margin: '79px auto 0',
      position: 'relative',
      '& .BrainhubCarousel__dots': {
        marginTop: '40px',
      },
      '& .BrainhubCarousel__dot': {
        background: 'transparent',
        opacity: '1',
        '&:before': {
          width: '12px',
          height: '12px',
          background: '#394861',
        },
        '&:hover': {
          '&:before': {
            background: 'linear-gradient(100.35deg, #369EFF 0%, #096DD9 100%)',
          },
        },
      },
      '& .BrainhubCarousel__dot--selected': {
        '&:before': {
          background: 'linear-gradient(100.35deg, #369EFF 0%, #096DD9 100%) !important',
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
      fontSize: '16px',
      lineHeight: '24px',
      textAlign: 'center',
      color: colors.text,
      marginTop: '32px',
    },
    button: {
      position: 'absolute',
      bottom: '0',
    },
    imageSlide: {
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
      background:
        'radial-gradient(52.66% 50.98% at 50% 0%, rgba(64, 169, 255, 0.15) 0%, rgba(64, 169, 255, 0) 89.58%);',
    },
    linear: {},
  }
}

const ConnectWallet = ({ t, history, classes }) => {
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
          autoPlay={3000}
          animationSpeed={1000}
          value={selectedSlide}
          onChange={(val) => setSelectedSlide(val)}
          addArrowClickHandler
          arrowLeft={<button className={classes.button}>{t('PREVIOUS')}</button>}
          arrowRight={<button className={classes.button}>{t('NEXT')}</button>}
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
          className={classes.linear}
          alt='connect linear'
          src={require('../../assets/theme/connect-linear-middle-dark.svg')}
        />
      </div>

      <div>
        <h2>Please connect a wallet to start:</h2>
        <Connector closeModal={() => window.scrollTo(0, 0)} />
      </div>
    </div>
  )
}

export default withNamespaces()(withRouter(withStyles(styles)(ConnectWallet)))
