import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Blog from './Components/Blog/RateBoard'
import { MyLayout } from './Components/Layout'
import SignIn from './Components/LoginForm/Index'

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
              <Route path="/" element={<Blog/>}></Route>
            </Route>
          </Routes>
        )}

      </>
  )
}
