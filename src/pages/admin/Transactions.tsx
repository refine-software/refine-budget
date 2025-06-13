import React, { useReducer, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DepositTypes, TransactionTypes, User } from "../../types";
import { getAdminUsers } from "../../api/admin/users";
import { depositTransaction, withdrawTransaction } from "../../api/admin/transactions";
import { Input, SelectField } from "../../components/TransactionsForm";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

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
	const [state, dispatch] = useReducer(reducer, initialState);
	const [errorMessage, setErrorMessage] = useState("");
	const depositForm = React.useRef<HTMLFormElement>(null);
	const withdrawForm = React.useRef<HTMLFormElement>(null);


	const { data: users = [] } = useQuery({
		queryKey: ["users"],
		queryFn: getAdminUsers,
	});

	const handleWithdrawSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await withdrawTransaction(
				parseInt(state.amount),
				state.details
			);
			dispatch({ type: "RESET_WITHDRAW" });
			setErrorMessage("");
		} catch (err) {
			setErrorMessage(`Failed to process transaction: ${err}`);
		}
	};

	const handleDepositSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await depositTransaction({
				amount: parseInt(state.amount),
				deposit_type: state.depositType,
				details: state.details,
				subscriber_id: state.subscriberId || undefined,
			});
			dispatch({ type: "RESET_DEPOSIT" });
			setErrorMessage("");
		} catch (err) {
			setErrorMessage(`Failed to process transaction: ${err}`);
		}
	};

	const depositTypeOptions = Object.values(DepositTypes).map((val) => ({
		value: val,
		label: val.charAt(0).toUpperCase() + val.slice(1),
	}));

	return (
		<div className="w-full flex flex-col gap-6">

			<SelectField
				label="Transaction Type"
				onChange={(e) => { dispatch({ type: "SET_FORM_TYPE", payload: e.target.value as TransactionTypes }) }}
				options={[
					{ label: "Deposit", value: TransactionTypes.deposit },
					{ label: "Withdraw", value: TransactionTypes.withdrawal }
				]}
				required
				value={state.formType}
			/>

			{state.formType === TransactionTypes.withdrawal ? (
				<form onSubmit={handleWithdrawSubmit} className="flex flex-col gap-6" ref={withdrawForm}>
					<Input
						label="Amount"
						type="number"
						value={state.amount}
						onChange={(e: InputEvent) =>
							dispatch({ type: "SET_AMOUNT", payload: e.target.value })
						}
						required
					/>
					<Input
						label="Description"
						value={state.details}
						onChange={(e: InputEvent) =>
							dispatch({ type: "SET_DETAILS", payload: e.target.value })
						}
						required
						type="text"
					/>
					{errorMessage && <p className="text-red">{errorMessage}</p>}
				</form>
			) : (
				<form onSubmit={handleDepositSubmit} className="flex flex-col gap-6" ref={depositForm}>
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
							dispatch({ type: "SET_DEPOSIT_TYPE", payload: e.target.value as DepositTypes })
						}
						options={depositTypeOptions}
						required
					/>
					<Input
						label="Details"
						value={state.details}
						onChange={(e: InputEvent) =>
							dispatch({ type: "SET_DETAILS", payload: e.target.value })
						}
						required
						type="text"
					/>
					{state.depositType === DepositTypes.subscription && (
						<SelectField
							label="Member"
							value={state.subscriberId.toString()}
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
								dispatch({ type: "SET_SUBSCRIBER_ID", payload: parseInt(e.target.value) })
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
					{errorMessage && <p className="text-red">{errorMessage}</p>}
				</form>
			)}

			<button
				className="absolute left-1/2 transform -translate-x-1/2 bottom-32 bg-primary text-2xl text-white rounded-2xl py-3 px-24 shadow-2xl"
				onClick={() => {
					if (state.formType === TransactionTypes.deposit) {
						depositForm.current?.dispatchEvent(new Event('submit', { cancelable: true }));
					} else {
						withdrawForm.current?.dispatchEvent(new Event('submit', { cancelable: true }));
					}
				}}>
				Confirm
			</button>
		</div>
	);
};

export default Transactions;


// const Transactions = () => {
// 	const [formType, setFormType] = useState<TransactionTypes>(
// 		TransactionTypes.withdrawal
// 	);
// 	//........
// 	const [withdrawAmount, setWithdrawAmount] = useState("");
// 	const [withdrawDescription, setWithdrawDescription] = useState("");
// 	//......
// 	const [errorMessage, setErrorMessage] = useState("");
// 	//.........
// 	const [depositAmount, setDepositAmount] = useState<number>(0);
// 	const [depositType, setDepositType] = useState<DepositTypes>(
// 		DepositTypes.subscription
// 	);
// 	const [depositDetails, setDepositDetails] = useState("");
// 	const [subscriberId, setSubscriberId] = useState(0);
// 	const { data: users = [], isError } = useQuery({
// 		queryKey: ["users"],
// 		queryFn: getAdminUsers,
// 	});

// 	const handleWithdrawSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		try {
// 			await withdrawTransaction(
// 				parseFloat(withdrawAmount),
// 				withdrawDescription
// 			);
// 			setWithdrawAmount("");
// 			setWithdrawDescription("");
// 		} catch (err) {
// 			setErrorMessage(`Failed to process transaction:${err}`)
// 		}
// 	};

// 	const handleDepositSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		try {
// 			await depositTransaction({
// 				amount: depositAmount,
// 				deposit_type: depositType,
// 				details: depositDetails,
// 				subscriber_id: subscriberId || undefined, // Use undefined if no subscriber is selected
// 			});
// 			setDepositAmount(0);
// 			setDepositType(DepositTypes.subscription);
// 			setDepositDetails("");
// 			setSubscriberId(0);
// 		} catch (err) {
// 			setErrorMessage(`Failed to process transaction:${err}`)
// 		}
// 	};

// 	return (
// 		<div className="w-full flex flex-col gap-6">
// 			<h1>Transactions type</h1>
// 			<div className="w-full h-11 border border-primary rounded-2xl">
// 				<select
// 					onChange={(e) =>
// 						setFormType(e.target.value as TransactionTypes)
// 					}
// 					className="w-full h-full p-2 pr-2 text-primary"
// 					defaultValue={TransactionTypes.withdrawal}
// 				>
// 					<option value={TransactionTypes.withdrawal}>
// 						Withdraw
// 					</option>
// 					<option value={TransactionTypes.deposit}>Deposit</option>
// 				</select>
// 			</div>
// 			{formType === TransactionTypes.withdrawal && (
// 				<div className="w-full flex flex-col gap-3">
// 					<form onSubmit={handleWithdrawSubmit}>
// 						<div>
// 							<label>Amount:</label>
// 							<input
// 								type="number"
// 								value={withdrawAmount}
// 								onChange={(e) =>
// 									setWithdrawAmount(e.target.value)
// 								}
// 								className="w-full text-primary border border-primary rounded-2xl p-2"
// 								placeholder="Enter amount"
// 								required
// 							/>
// 						</div>
// 						<div>
// 							<label>Description:</label>
// 							<input
// 								type="text"
// 								value={withdrawDescription}
// 								onChange={(e) =>
// 									setWithdrawDescription(e.target.value)
// 								}
// 								className="w-full text-primary border border-primary rounded-2xl p-2"
// 								placeholder="Enter description"
// 								required
// 							/>
// 						</div>
// 						<button
// 							type="submit"
// 							className="w-full mt-20 bg-primary text-2xl text-white rounded-2xl p-2 "
// 						>
// 							Confirm
// 						</button>
// 					</form>
// 					{errorMessage && <p className="text-red">{errorMessage}</p>}
// 				</div>
// 			)}
// 			{formType === TransactionTypes.deposit && (
// 				<div className="w-full flex flex-col gap-3">
// 					<form onSubmit={handleDepositSubmit}>
// 						<div>
// 							<label>Amount:</label>
// 							<input
// 								type="number"
// 								value={depositAmount}
// 								className="w-full text-primary border border-primary outline-0 rounded-2xl p-2"
// 								placeholder="Enter amount"
// 								onChange={(e) =>
// 									setDepositAmount(parseInt(e.target.value))
// 								}
// 								required
// 							/>
// 						</div>
// 						<div>
// 							<label>Deposit Type:</label>
// 							<div className="w-full border border-primary rounded-2xl">
// 								<select
// 									value={depositType}
// 									onChange={(e) =>
// 										setDepositType(
// 											e.target.value as DepositTypes
// 										)
// 									}
// 									className="w-full h-full p-2 pr-2 text-primary"
// 									required
// 								>
// 									<option value={DepositTypes.subscription}>
// 										Subscription
// 									</option>
// 									<option value={DepositTypes.donation}>
// 										Donation
// 									</option>
// 									<option value={DepositTypes.income}>
// 										Income
// 									</option>
// 									<option value={DepositTypes.other}>
// 										Other
// 									</option>
// 								</select>
// 							</div>
// 						</div>
// 						<div>
// 							<label>Details:</label>
// 							<input
// 								type="text"
// 								value={depositDetails}
// 								className="w-full text-primary border border-primary outline-0 rounded-2xl p-2"
// 								onChange={(e) =>
// 									setDepositDetails(e.target.value)
// 								}
// 								placeholder="Enter details"
// 								required
// 							/>
// 						</div>
// 						{depositType === DepositTypes.subscription && (
// 							<div>
// 								<label>Member:</label>
// 								<div className="w-full border border-primary rounded-2xl">
// 									<select
// 										value={subscriberId}
// 										onChange={(e) =>
// 											setSubscriberId(
// 												parseInt(e.target.value)
// 											)
// 										}
// 										className="w-full h-full p-2 pr-2 text-primary"
// 										required
// 									>
// 										<option value="">
// 											Select a member
// 										</option>
// 										{users.map((user) => (
// 											<option
// 												key={user.id}
// 												value={user.id}
// 											>
// 												{user.name}
// 											</option>
// 										))}
// 									</select>
// 								</div>
// 							</div>
// 						)}
// 						<button
// 							type="submit"
// 							className="w-full mt-20 bg-primary text-2xl text-white rounded-2xl p-2 "
// 						>
// 							Confirm
// 						</button>
// 					</form>
// 					{errorMessage && <p className="text-red">{errorMessage}</p>}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default Transactions;
