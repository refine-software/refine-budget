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

export const withdrawTransaction = async (
	amount: number,
	details: string
): Promise<number> => {
	const accTokenObj = getAccessToken();
	if (accTokenObj === null) throw new Error("you're not authorized");
	const res = await api.post(
		"/admin/transaction/withdrawal",
		{
			amount,
			details,
		},
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