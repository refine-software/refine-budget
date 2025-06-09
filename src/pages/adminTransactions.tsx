import { useState } from "react";
import {
	withdrawTransaction,
	depositTransaction,
} from "../api/admin/transactions";
import { getAdminUsers } from "../api/admin/users";
import { useQuery } from "@tanstack/react-query";
import { DepositTypes, TransactionTypes } from "../types";

const Transactions = () => {
	const [formType, setFormType] = useState<TransactionTypes>(
		TransactionTypes.withdrawal
	);
	//........
	const [withdrawAmount, setWithdrawAmount] = useState("");
	const [withdrawDescription, setWithdrawDescription] = useState("");
	//......
	const [errorMessage, setErrorMessage] = useState("");
	//.........
	const [depositAmount, setDepositAmount] = useState<number>(0);
	const [depositType, setDepositType] = useState<DepositTypes>(
		DepositTypes.subscription
	);
	const [depositDetails, setDepositDetails] = useState("");
	const [subscriberId, setSubscriberId] = useState(0);
	const { data: users = [], isError } = useQuery({
		queryKey: ["Users"],
		queryFn: getAdminUsers,
	});

	const handleWithdrawSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await withdrawTransaction(
				parseFloat(withdrawAmount),
				withdrawDescription
			);
			if (response instanceof Error) {
				setErrorMessage(response.message);
			} else {
				setWithdrawAmount("");
				setWithdrawDescription("");
			}
		} catch (error) {
			setErrorMessage("An unexpected error occurred.");
		}
	};

	const handleDepositSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await depositTransaction({
				amount: depositAmount,
				deposit_type: depositType,
				details: depositDetails,
				subscriber_id: subscriberId || undefined, // Use undefined if no subscriber is selected
			});
			if (response instanceof Error) {
				setErrorMessage(response.message);
			} else {
				setDepositAmount(0);
				setDepositType(DepositTypes.subscription);
				setDepositDetails("");
				setSubscriberId(0);
			}
		} catch (error) {
			setErrorMessage("An unexpected error occurred.");
		}
	};

	return (
		<div className="w-full flex flex-col ">
			<h1>Transactions type</h1>
			<div className="w-full h-11 border border-primary rounded-2xl">
				<select
					onChange={(e) =>
						setFormType(e.target.value as TransactionTypes)
					}
					className="w-full h-full p-2 pr-2 text-primary"
					defaultValue={TransactionTypes.withdrawal}
				>
					<option value={TransactionTypes.withdrawal}>
						Withdraw
					</option>
					<option value={TransactionTypes.deposit}>Deposit</option>
				</select>
			</div>
			{formType === TransactionTypes.withdrawal && (
				<div className="w-full flex flex-col gap-3">
					<form onSubmit={handleWithdrawSubmit}>
						<div>
							<label>Amount:</label>
							<input
								type="number"
								value={withdrawAmount}
								onChange={(e) =>
									setWithdrawAmount(e.target.value)
								}
								className="w-full text-primary border border-primary rounded-2xl p-2"
								placeholder="Enter amount"
								required
							/>
						</div>
						<div>
							<label>Description:</label>
							<input
								type="text"
								value={withdrawDescription}
								onChange={(e) =>
									setWithdrawDescription(e.target.value)
								}
								className="w-full text-primary border border-primary rounded-2xl p-2"
								placeholder="Enter description"
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full mt-20 bg-primary text-2xl text-white rounded-2xl p-2 "
						>
							Confirm
						</button>
					</form>
					{errorMessage && <p className="text-red">{errorMessage}</p>}
				</div>
			)}
			{formType === TransactionTypes.deposit && (
				<div className="w-full flex flex-col gap-3">
					<form onSubmit={handleDepositSubmit}>
						<div>
							<label>Amount:</label>
							<input
								type="number"
								value={depositAmount}
								className="w-full text-primary border border-primary outline-0 rounded-2xl p-2"
								placeholder="Enter amount"
								onChange={(e) =>
									setDepositAmount(parseInt(e.target.value))
								}
								required
							/>
						</div>
						<div>
							<label>Deposit Type:</label>
							<div className="w-full border border-primary rounded-2xl">
								<select
									value={depositType}
									onChange={(e) =>
										setDepositType(
											e.target.value as DepositTypes
										)
									}
									className="w-full h-full p-2 pr-2 text-primary"
									required
								>
									<option value={DepositTypes.subscription}>
										Subscription
									</option>
									<option value={DepositTypes.donation}>
										Donation
									</option>
									<option value={DepositTypes.income}>
										Income
									</option>
									<option value={DepositTypes.other}>
										Other
									</option>
								</select>
							</div>
						</div>
						<div>
							<label>Details:</label>
							<input
								type="text"
								value={depositDetails}
								className="w-full text-primary border border-primary outline-0 rounded-2xl p-2"
								onChange={(e) =>
									setDepositDetails(e.target.value)
								}
								placeholder="Enter details"
								required
							/>
						</div>
						{depositType === DepositTypes.subscription && (
							<div>
								<label>Member:</label>
								<div className="w-full border border-primary rounded-2xl">
									<select
										value={subscriberId}
										onChange={(e) =>
											setSubscriberId(
												parseInt(e.target.value)
											)
										}
										className="w-full h-full p-2 pr-2 text-primary"
										required
									>
										<option value="">
											Select a member
										</option>
										{users.map((user) => (
											<option
												key={user.id}
												value={user.id}
											>
												{user.name}
											</option>
										))}
									</select>
								</div>
							</div>
						)}
						<button
							type="submit"
							className="w-full mt-20 bg-primary text-2xl text-white rounded-2xl p-2 "
						>
							Confirm
						</button>
					</form>
					{errorMessage && <p className="text-red">{errorMessage}</p>}
				</div>
			)}
		</div>
	);
};

export default Transactions;
