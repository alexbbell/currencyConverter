
import * as React from 'react'
import Box from '@mui/material/Box'

import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'

import ChartRender from '../../Controls/ChartRender'

function TabPanel (props) {
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
          <Typography component={'span'}>{children}</Typography>
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

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function HistoricalDates () {
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
<Box>

    <Box display={'flex'} sx={{
      p: 0,
      mx: 1,
      my: 0,
      flexDirection: 'table-row',
      borderBottom: '#CCC 3px solid',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      boxSizing: 'border-box',
      verticalAlign: 'bottom'
    }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="Historical rates">
            <Tab label="Last month" {...a11yProps(0)} />
            <Tab label="Last 3 months" {...a11yProps(1)} />
            <Tab label="Last 6 months" {...a11yProps(2)} />
            <Tab label="Last year" {...a11yProps(3)} />
          </Tabs>
        </Box>

    </Box>
    <TabPanel value={value} index={0}>
      <ChartRender period="1m" />
    </TabPanel>

    <TabPanel value={value} index={1}>
      <ChartRender period="3m" />
    </TabPanel>
    <TabPanel value={value} index={2}>
      <ChartRender period="6m" />
    </TabPanel>
    <TabPanel value={value} index={3}>
      <ChartRender period="1y" />
    </TabPanel>
    </Box>

  )
}
