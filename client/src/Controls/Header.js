import React from 'react'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'

import { useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'

const ABHeader = () => {
  return (

    <AppBar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='center' >
            Rate Exchange Application
          </Typography>
      </AppBar>

  )
}

export default ABHeader
