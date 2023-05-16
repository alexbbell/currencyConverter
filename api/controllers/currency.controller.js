const request = require('request')
const converterConfig = require('../config/freecurrency.config')

const freeCurrencyConfig = converterConfig.freeCurrencyConfig()

const mode = converterConfig.mode()

let fakeApi
if (mode !== "prod") {
    fakeApi = require('../helpers/fakeApi')
}




exports.TodayRates = (req, res) => {
    let dstCurrencies =  converterConfig.defaultTodayCurrancies()
    const currency = req.params['srcCur']
    const url = freeCurrencyConfig.host + 'latest?apikey=' + freeCurrencyConfig.apikey + '&base_currency=' + currency + '&currencies=' + dstCurrencies

    // let dstCurrencies = ['EUR', 'GBP', 'CAD', 'MXN', 'JPY']
    const replaceIndex = dstCurrencies.indexOf(currency)
    if (replaceIndex !== -1) {
      dstCurrencies.splice(replaceIndex, 1)
      dstCurrencies = ['USD'].concat(dstCurrencies)
    }

    //Developer code
    if (mode !== "prod") {
        res.status(200).send(fakeApi.topTodayRates(currency, dstCurrencies))
    }
    else {
    //Request to API server for prod
        request(url,
            { json: true }, (err, sres, body) => {
                if (err) { return res.status(500).send({ message: err.message }) }
                res.status(200).send(body)
            }
        )
    }  


    };


exports.GetCurrentRate = (req, res) => {

    const srcCur = req.params['srcCur']
    const dstCur = req.params['dstCur']

    //Developer code
    if (mode !== "prod") {
        res.status(200).send(fakeApi.latestRates(srcCur, dstCur))
    }
    else {
        const url = freeCurrencyConfig.host + 'latest?apikey=' + freeCurrencyConfig.apikey + '&base_currency=' + srcCur + '&currencies=' + dstCur
        request(url,
            { json: true }, (err, sres, body) => {
                if (err) { return res.status(500).send({ message: err.message }) }
                res.status(200).send(body)
            }
        )
    }
}

exports.HistoricalRates = (req, res) => {

    const srcCur = req.params['srcCur']
    const dstCur = req.params['dstCur']
    const period = req.params['period']
    const result = {
        'src' : srcCur,
        'dst': dstCur,
        'period' : period
    }

    if(period === '1m' || period === '3m' || period === '6m' || period === '1y'  ) {
        const date_from = fakeApi.getDate(period)
        //&date_from=2023-04-01&base_currency=BGN&currencies=USD

        if (mode !== "prod") {
            res.status(200).send(fakeApi.Historical(date_from))
        }
        else {            
            const url = freeCurrencyConfig.host + 'historical?apikey=' + freeCurrencyConfig.apikey + '&date_from=' + date_from + '&base_currency=' + srcCur + '&currencies=' + dstCur
           
                //Request to API server for prod
                request(url,
                    { json: true }, (err, sres, body) => {
                        if (err) { return res.status(500).send({ message: err.message }) }
                        res.status(200).send(body)
                    }
                )
        }
    }
    else {
        res.status(500).send('Illegal peridod parameter')
    }

}