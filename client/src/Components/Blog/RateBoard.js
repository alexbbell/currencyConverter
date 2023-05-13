import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Unstable_Grid2'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import RatesConverter from '../../Controls/RatesConverter'
import TodayRates from '../../Controls/TodayRates'

import PropTypes from 'prop-types'
import HistoricalDates from '../HistoricalDates'
import { currencies } from '../../Helpers/AppSettings'

export default function RateBoard() {
  const [items, setItems] = useState([])
  const srcCurrency = useSelector(state => state.auth.currency)
  const [operationResult, setOperationResult] = useState(false)
  const [value, setValue] = React.useState(0)

  const currencyKeys = Object.keys(currencies.data)

  useEffect(() => {
    const fetchData = async () => {
      LoadPosts()
      setOperationResult(true)
    }
    fetchData()
  }, [operationResult])

  const LoadPosts = async () => {
    const mode = 'prod' // prod | dev
    let json
    return json
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    )
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  }
  return (

    <>
      <br />
      <br />

      <Grid container spacing={2}>
        <Grid xs={8}>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', height: 50 }} className='hdrbg'>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Currency converter" {...a11yProps(0)} />
              <Tab label="Historical rates" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Card variant="outlined">
              <RatesConverter />

              <HistoricalDates />
            </Card>
          </TabPanel>
        </Grid>
        <Grid xs={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider', height: 50, margin: 'auto', padding: 'auto' }} className='hdrbg'>
            <Box sx={{ flexDirection: 'row', paddingLeft: '10px' }}>Today Rates</Box>
            <Box sx={{ flexDirection: 'row', paddingRight: '10px' }}>1 {srcCurrency}=</Box>
          </Box>

          <Card variant="outlined">
            <TodayRates />
          </Card>

        </Grid>
      </Grid>
    </>
  )
}
