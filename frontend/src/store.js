import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apiSlice"
import favoriteSliceReducer from "./slices/favoriteSlice.js"

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    favorite: favoriteSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export default store
