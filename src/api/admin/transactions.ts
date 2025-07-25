import api from "../axiosConfig";
import { getAccessToken } from "../../utils";
import { DepositReq } from "../../types";

export const depositTransaction = async (
	depositReq: DepositReq
): Promise<number | Error> => {
	try {
		const accTokenObj = getAccessToken();
		if (accTokenObj === null) throw new Error("you're not authorized");
		const res = await api.post("/admin/transaction/deposit", depositReq, {
			headers: {
				Authorization: `Bearer ${accTokenObj.accessToken}`,
			},
		});
		return res.status;
	} catch (err) {
		console.error("Error processing deposit transaction:", err);
		return new Error("Failed to process deposit transaction.");
	}
};

export const withdrawTransaction = async (transactionData: {
	amount: number
	details: string
}): Promise<number> => {
	const accTokenObj = getAccessToken();
	if (accTokenObj === null) throw new Error("you're not authorized");
	console.log(transactionData);
	const res = await api.post(
		"/admin/transaction/withdrawal",
		transactionData,
		{
			headers: {
				Authorization: `Bearer ${accTokenObj.accessToken}`,
			},
		}
	);
	return res.status;
};

export const deleteLastTransaction = async (): Promise<number> => {
	const accTokenObj = getAccessToken();
	if (accTokenObj === null) throw new Error("you're not authorized");

	const res = await api.delete(
		"/admin/transaction/last-transaction",
		{
			headers: {
				Authorization: `Bearer ${accTokenObj.accessToken}`,
			},
		}
	);
	return res.status;
}