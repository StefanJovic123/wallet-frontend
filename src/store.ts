import { configureStore } from '@reduxjs/toolkit';

// API services
import { authApi } from './services/auth';
import { ordersApi } from './services/orders';
import { transactionApi } from './services/transactions';
import { balancesApi } from './services/balances';

// Reducers
import auth from './reducers/auth';

export const store = configureStore({
  reducer: {
    auth,
    [authApi.reducerPath]: authApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [balancesApi.reducerPath]: balancesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(ordersApi.middleware)
      .concat(transactionApi.middleware)
      .concat(balancesApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
