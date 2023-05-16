import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.js'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import './scss/style.scss'
const rootElement = document.getElementById('app')
const root = createRoot(rootElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
