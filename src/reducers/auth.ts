import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Web3 from 'web3';
import { authApi } from '../services/auth';
import { User } from '../types';

interface AuthState {
  authenticated: boolean,
  user?: User | null,
  loginStatus: string,
  publicAddress?: string | null | undefined
};

const initialState = { authenticated: false, user: null , loginStatus: 'idle', publicAddress: null } as AuthState;

export const initiateLogin = createAsyncThunk<string | null>(
  'wallet/initiateLogin',
  async (): Promise<string | null> => {
    let web3: Web3 | null = null;

    if (!(window as any).ethereum) {
			window.alert('Please install MetaMask first.');
			return null;
		}

		if (!web3) {
			try {
				// Request account access if needed
				await (window as any).ethereum.enable();

				// We don't know window.web3 version, so we use our own instance of Web3
				// with the injected provider given by MetaMask
				web3 = new Web3((window as any).ethereum);
			} catch (error) {
				window.alert('You need to allow MetaMask.');
				return null;
			}
		}

		const coinbase = await web3.eth.getCoinbase();
		if (!coinbase) {
			window.alert('Please activate MetaMask first.');
			return null;
		}

		return coinbase.toLowerCase();
  }
);

const authSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {
    logout(state) {
      state.authenticated = false;
      state.publicAddress = null;
      state.loginStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initiateLogin.pending, (state, _action) => {
      state.loginStatus = 'pending'
    });
    builder.addCase(initiateLogin.fulfilled, (state, action) => {
      state.loginStatus = 'completed';
      state.publicAddress = action.payload;
    });
    builder.addCase(initiateLogin.rejected, (state, action) => {
      state.loginStatus = 'idle';
      state.publicAddress = null;
    });

    builder
      .addMatcher(authApi.endpoints.login.matchPending, (_state, action) => {
        console.log('pending', action);
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        console.log('action !!!!', action)
        window.localStorage.setItem('accessToken', action.payload.accessToken);
        state.authenticated = true
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        console.log('rejected', action);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;