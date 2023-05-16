import React from 'react'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'

const ABHeader = () => {
  return (

    <AppBar >
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, padding: 1 }} align='center' className='hdrbg'>
        Rate Exchange Application
      </Typography>
    </AppBar>

  )
}

export default ABHeader
