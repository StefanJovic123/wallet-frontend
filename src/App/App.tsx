import './App.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";

import { store } from '../store';
import { Provider } from 'react-redux';

import { Login } from '../pages/Login';
import { Profile } from '../pages/Profile/Profile';
import RouteWrapper from '../components/RouteWrapper';
import PublicLayout from '../layouts/PublicLayout';
import AppLayout from '../layouts/AppLayout';
import Trading from '../pages/Trading';
import Deposit from '../pages/Deposit';

export const App: React.FC = (): JSX.Element => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Redirect exact from='/' to='/trading' />
					<RouteWrapper path="/login" component={Login} layout={PublicLayout} />
					<RouteWrapper path='/profile' component={Profile} layout={AppLayout} />
					<RouteWrapper path='/trading' component={Trading} layout={AppLayout} />
					<RouteWrapper path='/deposit' component={Deposit} layout={AppLayout} />
				</Switch>
			</Router>
  	</Provider>
	);
};
