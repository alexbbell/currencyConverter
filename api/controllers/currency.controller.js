//const https = require('https');

const request = require('request')
const converterConfig = require('../config/freecurrency.config')
 
const fakeApi = require('../helpers/fakeApi')


const GetTodayRates = (req, res) => {

    const freeCurrencyConfig = converterConfig.freeCurrencyConfig()
    const url = freeCurrencyConfig.host + 'latest?' + freeCurrencyConfig.apikey
    let dstCurrencies =  converterConfig.defaultTodayCurrancies() //['EUR', 'GBP', 'CAD', 'MXN', 'JPY']
    const currency = req.params['srcCur']

    // let dstCurrencies = ['EUR', 'GBP', 'CAD', 'MXN', 'JPY']
    const replaceIndex = dstCurrencies.indexOf(currency)
    if (replaceIndex !== -1) {
      dstCurrencies.splice(replaceIndex, 1)
      dstCurrencies = ['USD'].concat(dstCurrencies)
    }

    res.status(200).send(fakeApi.topTodayRates(currency, dstCurrencies))

    //request('https://api.freecurrencyapi.com/v1/latest?apikey=EDdXtDmCV9wLQuMdmjTSIZ631II20pMYldSAgfss&base_currency=USD&currencies=EUR,GBP,CAD,MXN,JPY,USD',
    //     { json: true }, (err, sres, body) => {
    //         if (err) { return res.status(500).send({ message: err.message }) }
    //         res.status(200).send(body)
    //     }
    // )
}

exports.TodayRates = (req, res) => {
    GetTodayRates(req, res)
    };


exports.GetCurrentRate = (req, res) => {

    const srcCur = req.params['srcCur']
    const dstCur = req.params['dstCur']
    res.status(200).send(fakeApi.latestRates(srcCur, dstCur))
}