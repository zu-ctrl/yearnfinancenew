const chrome = require('chrome-aws-lambda')
// const puppeteer = require('puppeteer')

module.exports = async (req, res) => {
  const browser = await chrome.puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  })
  try {
    const page = await browser.newPage()
    await page.goto('https://py-earn.herokuapp.com')
    await page.waitForSelector('.nav.nav-pills.nav-justified', { visible: true })

    const values = await page.evaluate(() => {
      const headings = Array.from(
        document.querySelectorAll('#page-content > .container > h4'),
        (el) => el.innerHTML
      ).slice(1)

      return Array.from(document.querySelectorAll('#page-content > .container > table > tbody'), (el, i) => {
        const rows = Array.from(el.querySelectorAll('tr'), (_el) => _el.outerHTML)
        const row = rows.find((r) => r.includes('Historic average since strategy change')) || null
        const cells = row ? row.replace('<tr><td>', '').replace('</td></tr>', '').split('</td><td>') : null
        const symbolsMapper = {
          'yearn yearn.finance': 'yYFI',
          'yearn Curve.fi yDAI/yUSDC/yUSDT/yTUSD': 'yCRV',
          'yearn Dai Stablecoin': 'yDAI',
          'yearn TrueUSD': 'yTUSD',
          'yearn USD//C': 'yUSDC',
          'yearn Tether USD': 'yUSDT',
          'yearn Aave Interest bearing LINK': 'yaLINK',
          'yyDAI+yUSDC+yUSDT+yBUSD': 'ycrvBUSD',
          'yearn Curve.fi renBTC/wBTC/sBTC': 'ycrvBTC',
        }
        const hour = cells[1].split('%')[0]
        const day = cells[2].split('%')[0]
        const week = cells[3].split('%')[0]
        const month = (cells[2].split('%')[0] * 30).toFixed(5)
        const year = cells[4].split('%')[0]
        const obj = {
          symbol: symbolsMapper[headings[i]] || headings[i],
          pyEarnData: { hour, day, week, month, year },
        }
        if (obj.symbol === 'yCRV') obj.symbol = 'yUSD'
        return obj
      })
    })
    await browser.close()
    return res.json({
      body: { success: true, data: values.filter((v) => !!v.symbol) },
    })
  } catch (e) {
    console.error('ERROR', e.toString())
    await browser.close()
    return res.json({
      body: { success: false, error: e.toString() },
    })
  }
}
