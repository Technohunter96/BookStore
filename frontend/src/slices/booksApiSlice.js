import { BOOKS_URL, UPLOAD_URL } from "../constants"
import { apiSlice } from "./apiSlice"

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: BOOKS_URL,
        params: { keyword, pageNumber },
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

    uploadBookImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `${BOOKS_URL}/${bookId}`,
        method: "DELETE",
      }),
    }),

    getLatestBooks: builder.query({
      query: () => `${BOOKS_URL}/latest`,
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetBooksQuery,
  useGetBookDetailsQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useUploadBookImageMutation,
  useDeleteBookMutation,
  useGetLatestBooksQuery,
} = booksApiSlice
