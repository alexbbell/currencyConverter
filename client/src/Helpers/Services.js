import { apiUrl } from './AppSettings'

const axios = require('axios').default

export const getRateFromApi = (srcValue, dstValue, token) => {
  const url = `${apiUrl}api/currency/src/${srcValue}/dst/${dstValue}`
  return axios.get(url, {
    headers: {
      'x-access-token': token
    }
  }).then((result) => {
    return result.data
  })
    .catch(function (error) {
    // handle error
      console.log(error)
    })
}

export const getTodayRates = (srcCurrency, token) => {
  // http://localhost:3000/api/currency/today/USD

  const url = `${apiUrl}api/currency/today/${srcCurrency}`
  return axios.get(url, {
    headers: {
      'x-access-token': token
    }
  }).then((result) => {
    return result.data
  })
    .catch(function (error) {
      // handle error
      console.log('Error getTodayRates', error)
    })
}
