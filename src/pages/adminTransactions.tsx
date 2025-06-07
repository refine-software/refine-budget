import { useState } from "react";
import { withdrawTransaction } from "../api/admin/transactions";

const Transactions = () => {
	const [formType, setFormType] = useState<"withdraw" | "deposit">("deposit");
	const [withdrawAmount, setWithdrawAmount] = useState("");
	const [withdrawDescription, setWithdrawDescription] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

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
				alert("Withdrawal successful!");
				setWithdrawAmount("");
				setWithdrawDescription("");
			}
		} catch (error) {
			setErrorMessage("An unexpected error occurred.");
		}
	};

	return (
		<div>
			<h1>Transactions type</h1>
			<div>
				<select
					onChange={(e) =>
						setFormType(e.target.value as "withdraw" | "deposit")
					}
					defaultValue="deposit"
				>
					<option value="withdraw">Withdraw</option>
					<option value="deposit">Deposit</option>
				</select>
			</div>
			{formType === "withdraw" && (
				<div>
					<h2>Withdraw Form</h2>
					<form onSubmit={handleWithdrawSubmit}>
						<div>
							<label>Amount:</label>
							<input
								type="number"
								value={withdrawAmount}
								onChange={(e) =>
									setWithdrawAmount(e.target.value)
								}
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
								required
							/>
						</div>
						<button type="submit">Confirm</button>
					</form>
					{errorMessage && (
						<p style={{ color: "red" }}>{errorMessage}</p>
					)}
				</div>
			)}
			{formType === "deposit" && (
				<div>
					<h2>Deposit Form</h2>
					{/* ...deposit form fields... */}
				</div>
			)}
		</div>
	);
};

export default Transactions;
