// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Auth, LoginData, User } from '../types';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<Auth, Partial<LoginData>>({
      query(body) {
        return {
          url: `auth`,
          method: 'POST',
          body,
        }
      },
    }),
    signup: builder.mutation<User, Partial<string>>({
      query(publicAddress) {
        return {
          url: `users`,
          method: 'POST',
          body: {
            nonce: Math.floor(Math.random() * 1000000),
            publicAddress
          }
        }
      },
    }),
    getUser: builder.query<User[], Partial<string>>({
      query: (publicAddress) => `users?publicAddress=${publicAddress}`,
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useSignupMutation } = authApi;