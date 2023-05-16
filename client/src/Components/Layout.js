import React, {} from 'react'
import { Outlet } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import ABHeader from '../Controls/Header'
import ABFooter from '../Controls/Footer'

export const MyLayout = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">

       <ABHeader />
        <Outlet></Outlet>

        <ABFooter />
      </Container>
  </React.Fragment>

  )
}
