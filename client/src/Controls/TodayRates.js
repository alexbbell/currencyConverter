import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'

import CurrencyFlag from 'react-currency-flags'
import { useSelector } from 'react-redux'
import { Divider, Typography } from '@mui/material'
import { getTodayRates } from '../Helpers/Services'

export default function TodayRates (props) {
  const srcCurrency = useSelector(state => state.auth.currency)
  const token = useSelector(state => state.auth.token)

  const [todayRates, setTodayRates] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const rt = await getTodayRates(srcCurrency, token)
      setTodayRates(rt.data)
    }
    fetchData()
  }, [srcCurrency])

  return (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1 }
    }}
    noValidate
    autoComplete="off"
  >
        {
        Object.keys(todayRates).map((option, index) => (
          <Box sx={{ mx: 2 }} key={option} value={option} >
            <Box sx={{
              height: 35,
              py: 1,

              display: 'flex',
              justifyContent: 'space-between'
            }}
             >
              <Box sx={{ width: 80 }}><CurrencyFlag currency={option} width={25} /> {option}</Box>
              <Box sx={{ width: 100, mr: 4, align: 'right', display: 'flex', justifyContent: 'flex-end' }}>
                <Typography className='alignRight' sx={{ align: 'right' }}> {todayRates[option]}</Typography></Box>

            </Box>
            <Divider light />
          </Box>

        ))
    }

  </Box>

  )
}
