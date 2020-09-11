const chrome = require('chrome-aws-lambda')
// const puppeteer = require('puppeteer')
const axios = require('axios')

module.exports = async (req, res) => {
  if (!req.body || !req.body.address)
    return res.json({
      body: { success: false, error: 'No address provided!' },
    })
  try {
    const { address } = req.body
    const {
      data: { data, errors },
    } = await axios({
      method: 'post',
      url: 'https://api.thegraph.com/subgraphs/name/rrridges-crypto/yearn-vault-activity',
      data: {
        query: `{ 
        deposits (where: {account: "${address}", vaultAddress: "0x7ff566e1d69deff32a7b244ae7276b9f90e9d0f6"}, orderBy: blockNumber) {
          id
          vaultAddress
          account
          amount
          shares
          timestamp
          blockNumber
        }
        withdraws (where: {account: "${address}", vaultAddress: "0x7ff566e1d69deff32a7b244ae7276b9f90e9d0f6"}, orderBy: blockNumber) {
          id
          vaultAddress
          account
          amount
          shares
          timestamp
          blockNumber
        }
        transfersOut: transfers(where: {from: "${address}", vaultAddress: "0x7ff566e1d69deff32a7b244ae7276b9f90e9d0f6", to_not: "0x0000000000000000000000000000000000000000"}, orderBy: blockNumber) {
          id
          from
          to
          value
          blockNumber
          vaultAddress
          getPricePerFullShare
        }
        transfersIn: transfers(where: {to: "${address}", vaultAddress: "0x7ff566e1d69deff32a7b244ae7276b9f90e9d0f6", from_not: "0x0000000000000000000000000000000000000000"}, orderBy: blockNumber) {
          id
          from
          to
          value
          blockNumber
          vaultAddress
          getPricePerFullShare
        }
        lastBlock: transfers (first: 1, orderBy: blockNumber, orderDirection: desc) {
          blockNumber
        }
      }`,
        variables: {},
      },
    })
    if (errors)
      return res.json({
        body: { success: false, errors },
      })
    return res.json({
      body: { success: true, data },
    })
  } catch (e) {
    console.error('ERROR', e.toString())
    return res.json({
      body: { success: false, error: e.toString() },
    })
  }
}
