import React, { useState, useEffect } from 'react'
import { XAxis, YAxis, CartesianGrid, Label, ResponsiveContainer, AreaChart, Tooltip, Area } from 'recharts'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Box from '@mui/material/Box'
import { getHistoricalRates } from '../Helpers/Services'

export default function ChartRender (props) {
  const srcCurrency = useSelector(state => state.auth.currency)
  const dstCurrency = useSelector(state => state.auth.dstCurrency)
  const chartTitle = srcCurrency + ' vs ' + dstCurrency
  const token = useSelector(state => state.auth.token)

  const [graphData, loadGraphData] = useState([])
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(0)
  const [chartInterval, setChartInterval] = useState(0)
  const period = (props.period != null) ? props.period : '1m'

  useEffect(() => {
    const fetchData = async () => {
      const rt = await getHistoricalRates(srcCurrency, dstCurrency, period, token)
      prepareDataForCharts(rt)
    }
    fetchData()
  }, [])

  const prepareDataForCharts = (rt) => {
    const hData = []
    let minValue, maxValue
    
    Object.entries(rt.data).map((e) => {
      if (!minValue) minValue = e[1][dstCurrency]
      if (!maxValue) maxValue = e[1][dstCurrency]
      minValue = (minValue > e[1][dstCurrency]) ? e[1][dstCurrency] : minValue
      maxValue = (maxValue < e[1][dstCurrency]) ? e[1][dstCurrency] : maxValue
      moment.defaultFormat = 'YYYY-MM-DD'
      hData.push({
        time: moment(e[0], moment.defaultFormat).format('MMM-D-YYYY'),
        rate: e[1][dstCurrency].toFixed(4)
      })
    })
    setChartInterval(Math.floor(hData.length / 5))
    loadGraphData(hData)
    // For axises
    setMinValue(minValue - minValue * 0.3)
    setMaxValue(maxValue + maxValue * 0.5)
  }

  return (
  <Box>
    <h3 style={{ textAlign: 'center', padding: 1, margin: 1 }}>{chartTitle}</h3>
    <Box sx={{ width: 700, height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={graphData}
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 70
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" interval={ chartInterval} angle={-65} position='bottom' textAnchor='end' > <Label position='bottom' offset={70} ></Label>
          </XAxis>
          <YAxis type="number" domain={[minValue.toFixed(3), maxValue.toFixed(3)]} />
          <Tooltip />
          <Area name={chartTitle} type="monotone" dataKey="rate" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
    </Box>
  )
}
