import { apiSlice } from "./apiSlice"
import { USERS_URL } from "../constants"

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),

    getProfile: builder.query({
      query: () => `${USERS_URL}/profile`,
      keepUnusedDataFor: 5,
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    addToFavorites: builder.mutation({
      query: ({ userId, bookId }) => ({
        url: `${USERS_URL}/${userId}/favoriteBooks/${bookId}`,
        method: "POST",
      }),
    }),

    removeFromFavorites: builder.mutation({
      query: ({ userId, bookId }) => ({
        url: `${USERS_URL}/${userId}/favoriteBooks/${bookId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetProfileQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = usersApiSlice
