import { createSlice } from '@reduxjs/toolkit'

const langSlice = createSlice({
  name: 'userdata',
  initialState: {
    currency: 'USD',
    dstCurrency: 'EUR',
    //token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0ZDNiNzBlLTQ2ZTctNDQ5OC04NTEyLWY4NGFkZjE3MTc0NyIsImxvZ2luIjoiYWRtaW4iLCJpYXQiOjE2ODQyNjMwNDAsImV4cCI6MTY4NDM0OTQ0MH0.LMa-7JuuExAJXYLC5R8yl_nJnVOU0UWEapzrOQdAhlk'
    token: null
  },

  reducers: {
    switchCurrency (state, action) {
      state.currency = action.payload
    },
    switchDestCurrency (state, action) {
      state.dstCurrency = action.payload
    },
    setAuth (state, action) {
      state.token = action.payload
    }

  }
})

export const { switchCurrency, switchDestCurrency, setAuth, loadWords } = langSlice.actions

export default langSlice.reducer
