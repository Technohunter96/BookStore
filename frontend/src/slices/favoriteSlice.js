import { createSlice } from "@reduxjs/toolkit"

const initialState = localStorage.getItem("favorite")
  ? JSON.parse(localStorage.getItem("favorite"))
  : { favoriteItems: [] }

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      // The item to add to the favorite
      const item = action.payload

      // Check if the item is already in the favorite
      const existItem = state.favoriteItems.find((x) => x._id === item._id)

      if (existItem) {
        // If exists, update quantity
        state.favoriteItems = state.favoriteItems.map((x) =>
          x._id === existItem._id ? item : x
        )
      } else {
        // If not exists, add new item to favoriteItems
        state.favoriteItems = [...state.favoriteItems, item]
      }

      // Save the favorite to localStorage
      localStorage.setItem("favorite", JSON.stringify(state))

      return state
    },

    removeFromFavorites: (state, action) => {
      state.favoriteItems = state.favoriteItems.filter(
        (x) => x._id !== action.payload
      )

      return state
    },
  },
})

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions

export default favoriteSlice.reducer
