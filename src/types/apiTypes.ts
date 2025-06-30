import { Role } from ".";

// Register
export type RegisterReq = {
	image: File | null;
	name: string;
	email: string;
	password: string;
};

// Login
export type LoginResType = {
	access_token: string;
	role: Role;
};

export type LoginReqType = {
	email: string;
	password: string;
	deviceId: string;
};

// refresh tokens
export type RefreshResType = {
	access_token: string;
	role: Role;
};

export type Budget = {
	id: number;
	amount: number;
	created_at: string;
};

export type User = {
	id: number;
	name: string;
	email: string;
	role: Role;
	debt: number;
	image: string;
	created_at: string;
	verified: true;
};

export enum SortTypes {
	dateAsc = "date_asc",
	dateDesc = "date_desc",
	amountAsc = "amount_asc",
	amountDesc = "amount_desc",
}

export enum TransactionTypes {
	deposit = "deposit",
	withdrawal = "withdrawal",
}

export enum DepositTypes {
	subscription = "subscription",
	donation = "donation",
	income = "income",
	other = "other",
}

export type DepositReq = {
	amount: number;
	deposit_type: DepositTypes;
	details: string;
	subscriber_id?: number;
};
export type withdrawReq = {
	amount: number;
	details: string;
};

export type TransactionsReqQueries = {
	page: number;
	limit: number;
	sort: SortTypes;
	transactionType?: TransactionTypes;
	depositTypes?: DepositTypes[];
};

export type Transaction = {
	id: number;
	amount: number;
	made_by: string;
	transaction_date: string;
	transaction_type: TransactionTypes;
	description: string;
	deposit_type: {
		deposit_type: string;
		valid: boolean;
	};
	subscriber_id: string | null;
	subscriber: string | null;
};

export type Metadata = {
	current_page: number;
	page_size: number;
	first_page: number;
	last_page: number;
	total_records: number;
}

export type TransactionsRes = {
	transactions: Transaction[];
	metadata: Metadata;
};
