// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Deposit, DepositDTO } from '../types';

// Define a service using a base URL and expected endpoints
export const transactionApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
  endpoints: (builder) => ({
    makeDeposit: builder.mutation<Deposit, Partial<DepositDTO>>({
      query(body) {
        return {
          url: `deposits`,
          method: 'POST',
          body,
          headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
          }
        }
      },
    }),
    getDeposits: builder.query<Deposit[], void>({
      query: () => ({
        url: 'deposits',
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
        }
      })
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDepositsQuery, useMakeDepositMutation } = transactionApi;
