const chrome = require('chrome-aws-lambda')
// const puppeteer = require('puppeteer')

module.exports = async (req, res) => {
  if (!req.body || !req.body.address) {
    return res.json({
      body: { success: false, error: 'No address provided!' },
    })
  }
  const { address } = req.body
  const browser = await chrome.puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  })
  try {
    const page = await browser.newPage()
    page.on('pageerror', async ({ message }) => {
      if (message.includes('TypeError')) {
        await browser.close()
        await res.json({
          body: {
            success: true,
            data: { earnings: 'N/A', irr: 'N/A', irrAnnualized: 'N/A', netDeposits: 'N/A', simpleReturn: 'N/A' },
          },
        })
      }
    })
    await page.goto('https://yvault-roi.netlify.app/')
    await page.waitForSelector('input#accountAddress', { visible: true })
    await page.$eval('input#accountAddress', (el, address) => (el.value = address), address)
    await page.waitForSelector('select#vaultAddress', { visible: true })
    await page.select('select#vaultAddress', '0x7ff566e1d69deff32a7b244ae7276b9f90e9d0f6')
    await page.waitForSelector('input#calculate', { visible: true })
    await page.click('input#calculate')
    await page.waitForSelector('pre#cons', { visible: true })
    await page.waitForFunction('document.getElementById("cons").innerText === "Fetching activity..."', {
      timeout: 5000,
    })
    await page.waitForFunction('document.getElementById("cons").innerText === "Fetching performance..."', {
      timeout: 5000,
    })
    await page.waitForFunction('document.getElementById("cons").innerText === ""', { timeout: 5000 })
    const _data = await page.$eval('pre#money-weighted-stats', (el) => el.innerText)
    if (!_data) {
      await browser.close()
      return await res.json({
        body: {
          success: true,
          data: { earnings: 'N/A', irr: 'N/A', irrAnnualized: 'N/A', netDeposits: 'N/A', simpleReturn: 'N/A' },
        },
      })
    }
    const data = _data
      .split('\n')
      .map((row) => row.trim())
      .filter((row) => !!row && row !== 'What do these numbers mean?')
      .reduce((obj, el) => {
        const str = el.split(':')
        obj[str[0].trim()] = str[1].trim()
        return obj
      }, {})
    await browser.close()
    return await res.json({
      body: {
        success: true,
        data: {
          earnings: data['Earnings'],
          irr: data['IRR'].split('/ Annualized')[0].trim(),
          irrAnnualized: data['IRR'].split('/ Annualized')[1].trim(),
          netDeposits: data['Net Deposits'],
          simpleReturn: data['Simple Return'],
        },
      },
    })
  } catch (e) {
    console.error('ERROR:::', e.toString())
    await browser.close()
    if (!res.headersSent)
      return res.json({
        body: { success: false, error: e.toString() },
      })
  }
}
