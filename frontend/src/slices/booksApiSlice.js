import { BOOKS_URL } from "../constants"
import { apiSlice } from "./apiSlice"

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: BOOKS_URL,
      }),
      providedTags: ["Book"],
      keepUnusedDataFor: 5,
    }),

    getBookDetails: builder.query({
      query: (bookId) => ({
        url: `${BOOKS_URL}/${bookId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createBook: builder.mutation({
      query: () => ({
        url: BOOKS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Book"],
    }),

    updateBook: builder.mutation({
      query: (data) => ({
        url: `${BOOKS_URL}/${data.bookId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
  }),
})

export const {
  useGetBooksQuery,
  useGetBookDetailsQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
} = booksApiSlice
