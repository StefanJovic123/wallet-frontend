export interface Auth {
	accessToken: string;
}

export interface LoginData {
	publicAddress: string,
	signature: string
}

export interface User {
	id: number;
	nonce: number;
	publicAddress: string;
	username?: string;
}

export interface Order {
	id: number;
	amount: number;
	token: string;
	price: number;
	userId: number;
	orderType: string;
	status: string;
	createdAt: string;
}

export interface OrderDTO {
	amount: number;
	token: string;
	price: number;
}


export interface Deposit {
	id: number;
	amount: number;
  token: string;
  transType: 'DEPOSIT' | 'WITHDRAWAL';
  userId: number;
}

export interface DepositDTO {
	amount: number;
  token: string;
}

export interface Balance {
	id: number;
	balance: number;
  blockedBalance: number;
	token: string;
}
