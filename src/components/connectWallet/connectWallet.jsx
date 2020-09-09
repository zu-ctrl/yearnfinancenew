import React, { useState } from 'react'
import { withNamespaces } from 'react-i18next'
import Carousel, { Dots } from '@brainhubeu/react-carousel'
import { withRouter } from 'react-router-dom'
import Connector from './connector'
import '@brainhubeu/react-carousel/lib/style.css'

const ConnectWallet = ({ t, history }) => {
  const [selectedSlide, setSelectedSlide] = useState(0)

  const slidesData = [
    {
      title: 'Welcome to Yearn: The simplest way to earn yield on crypto assets for investors large and small',
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
    <div style={{ width: '600px' }}>
      <div>
        <Carousel
          plugins={['clickToChange', 'infinite', 'arrows', 'autoplay']}
          infinite
          autoPlay={3000}
          animationSpeed={1000}
          value={selectedSlide}
          onChange={(val) => setSelectedSlide(val)}
          addArrowClickHandler
          arrowLeft={<button>{t('PREVIOUS')}</button>}
          arrowRight={<button>{t('NEXT')}</button>}
          slides={slidesData.map((o, i) => (
            <div key={i}>
              <p>{o.title}</p>
              <p>{o.subtitle}</p>
              <img alt={o.title} src={o.imagePath} />
            </div>
          ))}
        />
        <Dots value={selectedSlide} onChange={(val) => setSelectedSlide(val)} number={slidesData.length} />
      </div>

      <hr style={{ width: '100%' }} />

      <div>
        <h2>Please connect a wallet to start:</h2>
        <Connector closeModal={() => window.scrollTo(0, 0)} />
      </div>
    </div>
  )
}

export default withNamespaces()(withRouter(ConnectWallet))
