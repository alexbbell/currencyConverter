import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'

import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import CurrencyFlag from 'react-currency-flags'
import { useSelector, useDispatch } from 'react-redux'

import { currencies } from '../Helpers/AppSettings'
import { getRateFromApi } from '../Helpers/Services'
import { switchCurrency } from '../store/userSlice'

export default function RatesConverter (props) {
  const [sourceValue, setSourceValue] = useState(1000)
  const [sourceCurrency, setSourceCurrency] = useState('USD')
  const [destValue, setDestValue] = useState(1000)
  const [destCurrency, setDestCurrency] = useState('EUR')
  const [currentRate, setCurrentRate] = useState()
  const token = useSelector(state => state.auth.token)

  const dispatch = useDispatch()

  useEffect(() => {
    // setSourceCurrency('USD')

    const fetchRate = async () => {
      const cRate = await GetRateFromService(sourceCurrency, destCurrency)
      CalculateAmount(cRate, sourceValue)
    }
    fetchRate()
  }, [])

  async function GetRateFromService (sourceCurrency, destCurrency) {
    const result = await getRateFromApi(sourceCurrency, destCurrency, token)
    setCurrentRate(result.data[destCurrency])
    return result.data[destCurrency]
  }

  const CalculateAmount = (curRate, sourceValue) => {
    const cRate = (curRate == null) ? currentRate : curRate
    const amount = parseFloat(cRate) * parseFloat(sourceValue)
    setDestValue(amount.toFixed(2))
  }

  const changeSourceCurrency = async (event) => {
    event.preventDefault()
    const newSrcCurrency = event.target.value
    setSourceCurrency(newSrcCurrency)
    dispatch(
      switchCurrency(newSrcCurrency)
    )

    const cRate = await GetRateFromService(newSrcCurrency, destCurrency)
    CalculateAmount(cRate, sourceValue)
  }

  const changeDestCurrency = async (event) => {
    event.preventDefault()
    const newDstCurrency = event.target.value
    const cRate = await GetRateFromService(sourceCurrency, newDstCurrency)
    CalculateAmount(cRate, sourceValue)
    setDestCurrency(newDstCurrency)
  }

  const updateSourceValue = (event) => {
    // event.preventDefault()
    // /\.?.\./gm
    // const regex = /^[0-9]+$/;
    const regex = /(^[0-9\.?]+$)/gm

    let srcValue = event.target.value
    if (regex.test(srcValue)) {
      srcValue = srcValue.replace('..', '.')
      setSourceValue(srcValue)
      CalculateAmount(null, srcValue)
    }
  }

  return (
    <Box
    component="form"
    sx={{
      ml: 1,

      '& .MuiTextField-root': { m: 1 }
    }}
    noValidate
    autoComplete="off"
  >
    <Box sx={{
      width: '9px',
      height: '70px',
      borderTop: '#CCC 1px solid',
      borderLeft: '#CCC 1px solid',
      borderBottom: '#CCC 1px solid',
      position: 'absolute',
      mt: 5
    }}>

    </Box>

    <Box>
      <TextField id="outlined-basic" label="From"
        variant="outlined" className='currencyValue'
        inputMode="numeric" pattern="[0-9]*"
        value={sourceValue}
        onChange={updateSourceValue}
      />

      <TextField
        id="outlined-select-currency"
        select
        onChange={changeSourceCurrency}
        value={sourceCurrency} defaultValue={sourceCurrency}
      >

        {
          Object.keys(currencies.data).map(option => (
            <MenuItem key={option} value={option} >
              <CurrencyFlag currency={option} width={25} />
              &nbsp; {currencies.data[option].name} - ({option})
            </MenuItem>
          ))
        }
      </TextField>
    </Box>

    <Box>
      <TextField id="outlined-basic" label="To"
        variant="outlined" className='currencyValue'
        value={destValue} aria-readonly='true'
        InputProps={{
          readOnly: true
        }}

      />

      <TextField
        id="outlined-select-currency" select
        value={destCurrency}
        onChange={changeDestCurrency}
      >
        {
          Object.keys(currencies.data).map(option => (
            <MenuItem key={option} value={option}>
              <CurrencyFlag currency={currencies.data[option].code} width={25} />
              &nbsp; {currencies.data[option].name} - ({currencies.data[option].code})
            </MenuItem>
          ))
        }
      </TextField>
    </Box>
      <br />
      Your rate:
      <h2>{sourceCurrency} 1 = {destCurrency} {currentRate}</h2>
      <br />
      <br />
      Dest:  {destValue}
  </Box>

  )
}
