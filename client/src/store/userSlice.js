import { createSlice } from '@reduxjs/toolkit'

const langSlice = createSlice({
  name: 'userdata',
  initialState: {
    currency: 'USD',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0ZDNiNzBlLTQ2ZTctNDQ5OC04NTEyLWY4NGFkZjE3MTc0NyIsImxvZ2luIjoiYWRtaW4iLCJpYXQiOjE2ODM5NzAxMDUsImV4cCI6MTY4NDA1NjUwNX0.GWX73x5c9pyLt9IAB49lAVmWIfky0F4zJEwviVUCzFY'
  },

  reducers: {
    switchCurrency (state, action) {
      state.currency = action.payload
    },
    setAuth (state, action) {
      state.token = action.payload
    },
    loadWords (state, action) {
      state.words = action.payload
    }

  }
})

export const { switchCurrency, setAuth, loadWords } = langSlice.actions

export default langSlice.reducer
