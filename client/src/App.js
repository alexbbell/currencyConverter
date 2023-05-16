import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import RateBoard from './Components/RateBoard/RateBoard'
import { MyLayout } from './Components/Layout'
import SignIn from './Components/LoginForm/LoginForm'

// const axios = require('axios').default

export function App () {
  const token = useSelector(state => state.auth.token)

  return (
      <>
      {(token == null) && (
        <>
        <SignIn />
        </>
      )}

        {token && (
          <Routes>

            <Route path="/" element={<MyLayout />}>
              <Route path="/" element={<RateBoard/>}></Route>
            </Route>
          </Routes>
        )}

      </>
  )
}
