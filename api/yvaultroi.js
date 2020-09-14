const chrome = require('chrome-aws-lambda')
const walletValidator = require('wallet-address-validator')

/**
 * Constants
 */
const VAULT_ADDRESS = '0x7ff566e1d69deff32a7b244ae7276b9f90e9d0f6'
const BASE_URL = 'https://yvault-roi.netlify.app'
const ACTIVITY_STATUS = 'Fetching activity...'
const PERFORMANCE_STATUS = 'Fetching performance...'
const LAST_STRING_IN_DATA = 'What do these numbers mean?'

/**
 * Helpers
 */
const successResponse = (data) => ({ body: { success: true, data } })
const errorResponse = (error = 'Something went wrong') => ({ body: { success: false, error } })
const noDataResponse = () => ({
  body: {
    success: true,
    data: { earnings: 'N/A', irr: 'N/A', irrAnnualized: 'N/A', netDeposits: 'N/A', simpleReturn: 'N/A' },
  },
})

const scrapeData = async (page, address) => {
  const url = `${BASE_URL}/?accountAddress=${address}&vaultAddress=${VAULT_ADDRESS}`
  await page.goto(url)
  await page.waitForSelector('div#calculate', { visible: true })
  await page.click('div#calculate')
  await page.waitForSelector('pre#cons', { visible: true })
  await page.waitForFunction(`document.getElementById("cons").innerText === "${ACTIVITY_STATUS}"`, { timeout: 5000 })
  await page.waitForFunction(`document.getElementById("cons").innerText === "${PERFORMANCE_STATUS}"`, { timeout: 5000 })
  await page.waitForFunction('document.getElementById("cons").innerText === ""', { timeout: 5000 })
  const _data = await page.$eval('pre#money-weighted-stats', (el) => el.innerText)
  if (!_data) throw new Error('No data available')
  return _data
}

const normalizeData = (_data) => {
  const data = _data
    .split('\n')
    .map((row) => row.trim())
    .filter((row) => !!row && row !== LAST_STRING_IN_DATA)
    .reduce((obj, el) => {
      const str = el.split(':')
      obj[str[0].trim()] = str[1].trim()
      return obj
    }, {})

  return {
    earnings: data['Earnings'],
    irr: data['IRR'].split('/ Annualized')[0].trim(),
    irrAnnualized: data['IRR'].split('/ Annualized')[1].trim(),
    netDeposits: data['Net Deposits'],
    simpleReturn: data['Simple Return'],
  }
}

/**
 * Runtime
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.json(errorResponse())
  if (!req.body || !req.body.address || !walletValidator.validate(req.body.address, 'ETH'))
    return res.json(errorResponse('Wrong address'))

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
        await res.json(noDataResponse())
      }
    })
    const rawData = await scrapeData(page, address)
    const data = normalizeData(rawData)
    return await res.json(successResponse(data))
  } catch (e) {
    console.error('ERROR:::', e.toString())
    if (!res.headersSent) return res.json(noDataResponse())
  } finally {
    await browser.close()
  }
}
