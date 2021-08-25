import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import Blockies from 'react-blockies';
import { useHistory } from 'react-router-dom';

interface State {
	loading: boolean;
	user?: {
		id: number;
		username: string;
	};
	username: string;
}

interface JwtDecoded {
	payload: {
		id: string;
		publicAddress: string;
	};
}

export const Profile: React.FC = (): JSX.Element => {
	const history = useHistory();
	const [state, setState] = useState<State>({
		loading: false,
		user: undefined,
		username: '',
	});

	useEffect(() => {
		const accessToken: string = window.localStorage.getItem('accessToken') as string;
		const {
			payload: { id },
		} = jwtDecode<JwtDecoded>(accessToken);

		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => response.json())
			.then((user) => setState({ ...state, user }))
			.catch(window.alert);
	}, []);

	const accessToken: string = window.localStorage.getItem('accessToken') as string;

	const {
		payload: { publicAddress },
	} = jwtDecode<JwtDecoded>(accessToken);

	return (
		<div className="Profile">
			<p>
				Logged in as <Blockies seed={publicAddress} />
			</p>
			<div>
				My publicAddress is <pre>{publicAddress}</pre>
			</div>
			<p>
				<button onClick={() => {
					window.localStorage.removeItem('accessToken');
					history.push('/login');
				}}>Logout</button>
			</p>
		</div>
	);
};
