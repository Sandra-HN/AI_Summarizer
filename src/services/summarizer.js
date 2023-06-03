import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const apiurl = import.meta.env.VITE_API_URL;

  export const summarizerApi = createApi({
    reducerPath: 'summarizerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiurl+'api/v1/summarizer',
    }),
    endpoints: (builder) => ({
        getTextSummary: builder.mutation({
            query: (payload) => ({
                url: '/',
                method: 'POST',
                body: payload,
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }),
              invalidatesTags: ['Summary'],
        }),
        getArticleSummary: builder.mutation({
            query: (payload) => ({
                url: '/article',
                method: 'POST',
                body: payload,
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }),
              invalidatesTags: ['Summary'],
        }),
    }),
})

export const { useGetArticleSummaryMutation, useGetTextSummaryMutation } = summarizerApi
