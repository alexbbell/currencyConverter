import { configureStore } from '@reduxjs/toolkit'

import userdata from './userSlice'

export default configureStore({
  reducer: {
    auth: userdata
  }
})
