import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Switch, Route } from 'react-router-dom'
import IpfsRouter from 'ipfs-react-router'

import './i18n'
import lightTheme from './lightTheme'
import waifuTheme from './waifuTheme'
import darkTheme from './darkTheme'

import APR from './components/apr'
import InvestSimple from './components/investSimple'
import Manage from './components/manage'
import Performance from './components/performance'
import Zap from './components/zap'
import IDai from './components/idai'
import Footer from './components/footer'
import Home from './components/home'
import Header from './components/header'
import Vaults from './components/vault'
import Dashboard from './components/dashboard'
import ConnectWallet from './components/connectWallet'
import BetaBanner from './components/betaBanner'

import { injected } from './stores/connectors'

import { CONNECTION_CONNECTED } from './constants'

import Store from './stores'
const emitter = Store.emitter
const store = Store.store

const THEMES_LIST = ['dark', 'waifu', 'light']

class App extends Component {
  constructor(props) {
    super()

    this.state = {
      currentTheme: localStorage.getItem('yearnfinewTheme') || THEMES_LIST[0],
      isBeta: localStorage.getItem('yearnfinewBeta') !== 'false',
    }
  }

  setCurrentTheme = (newTheme) => {
    if (THEMES_LIST.includes(newTheme)) this.setState({ currentTheme: newTheme })
  }

  setIsBeta = (beta) => {
    this.setState({ isBeta: beta })
  }

  componentWillMount() {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        injected
          .activate()
          .then((a) => {
            store.setStore({ account: { address: a.account }, web3context: { library: { provider: a.provider } } })
            emitter.emit(CONNECTION_CONNECTED)
            console.log(a)
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
      }
    })
  }

  render() {
    const themes = { lightTheme, waifuTheme, darkTheme }
    const { setCurrentTheme, setIsBeta } = this
    const { currentTheme, isBeta } = this.state
    return (
      <MuiThemeProvider theme={createMuiTheme(themes[`${currentTheme}Theme`])}>
        <CssBaseline />
        <IpfsRouter>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              alignItems: 'center',
              background: '#f9fafb',
            }}
          >
            <BetaBanner isBeta={isBeta} setIsBeta={setIsBeta} currentTheme={currentTheme} />
            <Switch>
              <Route path="/apr">
                <Header />
                <APR />
              </Route>
              <Route path="/earn">
                <Header />
                <InvestSimple />
              </Route>
              <Route path="/zap">
                <Header />
                <Zap />
              </Route>
              <Route path="/idai">
                <IDai />
              </Route>
              <Route path="/performance">
                <Header />
                <Performance />
              </Route>
              <Route path="/manage">
                <Header />
                <Manage />
              </Route>
              <Route path="/vaults">
                <Header />
                <Vaults />
              </Route>
              <Route path="/dashboard">
                <Header />
                <Dashboard />
              </Route>
              <Route path="/">
                <Home isBeta={isBeta} currentTheme={currentTheme} />
              </Route>
            </Switch>
            <Footer theme={currentTheme} setTheme={setCurrentTheme} />
          </div>
        </IpfsRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
