import React, { useReducer, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DepositTypes, TransactionTypes, User } from "../../types";
import { getAdminUsers } from "../../api/admin/users";
import {
	depositTransaction,
	withdrawTransaction,
} from "../../api/admin/transactions";
import { Input, SelectField, TextArea } from "../../components/TransactionsForm";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type TextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;

type State = {
	formType: TransactionTypes;
	amount: string;
	depositType: DepositTypes;
	details: string;
	subscriberId: number;
};

type Action =
	| { type: "SET_FORM_TYPE"; payload: TransactionTypes }
	| { type: "SET_AMOUNT"; payload: string }
	| { type: "SET_DEPOSIT_TYPE"; payload: DepositTypes }
	| { type: "SET_DETAILS"; payload: string }
	| { type: "SET_SUBSCRIBER_ID"; payload: number }
	| { type: "RESET_WITHDRAW" }
	| { type: "RESET_DEPOSIT" };

const initialState: State = {
	formType: TransactionTypes.withdrawal,
	amount: "",
	depositType: DepositTypes.subscription,
	details: "",
	subscriberId: 0,
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_FORM_TYPE":
			return { ...state, formType: action.payload };
		case "SET_AMOUNT":
			return { ...state, amount: action.payload };
		case "SET_DEPOSIT_TYPE":
			return { ...state, depositType: action.payload };
		case "SET_DETAILS":
			return { ...state, details: action.payload };
		case "SET_SUBSCRIBER_ID":
			return { ...state, subscriberId: action.payload };
		case "RESET_WITHDRAW":
			return { ...state, amount: "", details: "" };
		case "RESET_DEPOSIT":
			return {
				...state,
				amount: "",
				depositType: DepositTypes.subscription,
				details: "",
				subscriberId: 0,
			};
		default:
			return state;
	}
};

const Transactions = () => {
	const queryClient = useQueryClient();
	const [state, dispatch] = useReducer(reducer, initialState);
	const [errorMessage, setErrorMessage] = useState("");
	const depositForm = React.useRef<HTMLFormElement>(null);
	const withdrawForm = React.useRef<HTMLFormElement>(null);

	const { data: users = [] } = useQuery({
		queryKey: ["users"],
		queryFn: getAdminUsers,
	});

	const depositMutation = useMutation({
		mutationFn: depositTransaction,
		onSuccess: () => {
			dispatch({ type: "RESET_DEPOSIT" });
			setErrorMessage("");
			queryClient.invalidateQueries({ queryKey: ["budget"] });
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
		onError: (err) => {
			setErrorMessage(`Failed to process transaction: ${err}`);
		},
	});

	const withdrawMutation = useMutation({
		mutationFn: (amountAndDetails: { amount: number; details: string }) =>
			withdrawTransaction(amountAndDetails.amount, amountAndDetails.details),
		onSuccess: () => {
			dispatch({ type: "RESET_WITHDRAW" });
			setErrorMessage("");
			queryClient.invalidateQueries({ queryKey: ["budget"] });
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
		onError: (err) => {
			setErrorMessage(`Failed to process transaction: ${err}`);
		},
	});

	const handleWithdrawSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		withdrawMutation.mutate({
			amount: parseInt(state.amount),
			details: state.details,
		});
	};

	const handleDepositSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		depositMutation.mutate({
			amount: parseInt(state.amount),
			deposit_type: state.depositType,
			details: state.details,
			subscriber_id: state.subscriberId || undefined,
		});
	};

	const depositTypeOptions = Object.values(DepositTypes).map((val) => ({
		value: val,
		label: val.charAt(0).toUpperCase() + val.slice(1),
	}));

	return (
		<div className="w-full flex flex-col gap-6">
			<SelectField
				label="Transaction Type"
				onChange={(e) => {
					dispatch({
						type: "SET_FORM_TYPE",
						payload: e.target.value as TransactionTypes,
					});
				}}
				options={[
					{ label: "Deposit", value: TransactionTypes.deposit },
					{ label: "Withdraw", value: TransactionTypes.withdrawal },
				]}
				required
				value={state.formType}
			/>

			{state.formType === TransactionTypes.withdrawal ? (
				<form
					onSubmit={handleWithdrawSubmit}
					className="flex flex-col gap-6"
					ref={withdrawForm}
				>
					<Input
						label="Amount"
						type="number"
						value={state.amount}
						onChange={(e: InputEvent) =>
							dispatch({ type: "SET_AMOUNT", payload: e.target.value })
						}
						required
					/>
					<TextArea
						label="Description"
						value={state.details}
						onChange={(e: TextAreaEvent) =>
							dispatch({ type: "SET_DETAILS", payload: e.target.value })
						}
						required
					/>
					{errorMessage && <p className="text-red">{errorMessage}</p>}
				</form>
			) : (
				<form
					onSubmit={handleDepositSubmit}
					className="flex flex-col gap-6"
					ref={depositForm}
				>
					<Input
						label="Amount Of Money"
						type="number"
						onChange={(e: InputEvent) =>
							dispatch({ type: "SET_AMOUNT", payload: e.target.value })
						}
						required
						value={state.amount}
					/>
					<SelectField
						label="Deposit Type"
						value={state.depositType}
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
							dispatch({
								type: "SET_DEPOSIT_TYPE",
								payload: e.target.value as DepositTypes,
							})
						}
						options={depositTypeOptions}
						required
					/>
					{state.depositType === DepositTypes.subscription && (
						<SelectField
							label="Member"
							value={state.subscriberId.toString()}
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
								dispatch({
									type: "SET_SUBSCRIBER_ID",
									payload: parseInt(e.target.value),
								})
							}
							options={[
								{ value: 0, label: "Select a member" },
								...users.map((user: User) => ({
									value: user.id,
									label: user.name,
								})),
							]}
							required
						/>
					)}
					<TextArea
						label="Details"
						value={state.details}
						onChange={(e: TextAreaEvent) =>
							dispatch({ type: "SET_DETAILS", payload: e.target.value })
						}
						required
					/>
					{errorMessage && <p className="text-red">{errorMessage}</p>}
				</form>
			)}

			<button
				className={`h-14 bg-primary text-xl font-semibold text-white rounded-xl py-2.5 mt-6 shadow-2xl ${depositMutation.isPending || withdrawMutation.isPending && "bg-primary-dim"}`}
				disabled={depositMutation.isPending || withdrawMutation.isPending}
				onClick={(e) => {
					e.preventDefault();
					if (state.formType === TransactionTypes.deposit) {
						depositForm.current?.requestSubmit();
					} else {
						withdrawForm.current?.requestSubmit();
					}
				}}
			>
				{depositMutation.isPending || withdrawMutation.isPending ? <LoadingSpinner size="mid" /> : "Confirm"}
			</button>
		</div>
	);
};

export default Transactions;
