// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order, OrderDTO } from '../types';

// Define a service using a base URL and expected endpoints
export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
  endpoints: (builder) => ({
    placeOrder: builder.mutation<Order, Partial<OrderDTO>>({
      query(body) {
        return {
          url: `placeOrder`,
          method: 'POST',
          body,
          headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
          }
        }
      },
    }),
    cancelOrder: builder.mutation<{ message: string }, Partial<number>>({
      query(id) {
        return {
          url: `cancelOrder/${id}`,
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
          }
        }
      },
    }),
    getOrders: builder.query<Order[], void>({
      query: () => ({
        url: 'getOrders',
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
        }
      })
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { usePlaceOrderMutation, useCancelOrderMutation, useGetOrdersQuery } = ordersApi;