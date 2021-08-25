// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Balance } from '../types';

// Define a service using a base URL and expected endpoints
export const balancesApi = createApi({
  reducerPath: 'balancesApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
  endpoints: (builder) => ({
    getBalances: builder.query<Balance[], void>({
      query: () => ({
        url: 'balances',
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
        }
      })
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBalancesQuery } = balancesApi;