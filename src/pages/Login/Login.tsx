import React from 'react';
import Web3 from 'web3';
import { useHistory } from 'react-router-dom';
import { useLoginMutation, useSignupMutation, authApi } from '../../services/auth';
import { initiateLogin } from '../../reducers/auth';
import { useAppDispatch } from '../../hooks';

import { Auth, User } from '../../types';
import { PageHeader } from 'antd';

export const Login: React.FC = (): JSX.Element => {
	const history = useHistory();
	const dispatch = useAppDispatch();
	const [login, { isLoading: isLoginLoading }] = useLoginMutation();
	const [signup, { isLoading: isSignupLoading }] = useSignupMutation(); 

	const handleSignMessage = async ({
		publicAddress,
		nonce,
	}: {
		publicAddress: string;
		nonce: string;
	}) => {
		try {
			const web3: Web3 = new Web3((window as any).ethereum);
			const signature = await web3!.eth.personal.sign(
				`I am signing my one-time nonce: ${nonce}`,
				publicAddress,
				'' // MetaMask will ignore the password argument here
			);

			await login({ publicAddress, signature }) as { data: Auth };
		} catch (err) {
			console.log('err !!!!', err)
			throw new Error(
				'You need to sign the message to be able to log in.'
			);
		}
	};

	const handleClick = async () => {
		const loginData = await dispatch(initiateLogin());
		const publicAddress: string = loginData.payload as string;
		const { data: users } = await dispatch(authApi.endpoints.getUser.initiate(publicAddress, { forceRefetch: true }));

		let user: User | null = null;
		if (users && users.length) {
			user = users[0];
		} else {
				
			const userResponse = await signup(publicAddress) as { data: User };
			user = userResponse.data;
		}

		await handleSignMessage({ publicAddress, nonce: String(user.nonce) });
		history.push('/')
	}

	return (
		<div>
			<PageHeader title='Login' />
			<button className="Login-button Login-mm" onClick={handleClick}>
				{(isSignupLoading || isLoginLoading) ? 'Loading...' : 'Login with MetaMask'}
			</button>
		</div>
	);
};
