import api from "../axiosConfig";
import { getAccessToken } from "../../utils";

export const depositTransaction = async (
	amount: number,
	depositType: string,
	details: string,
	subscriberId: number
): Promise<number | Error> => {
	try {
		const accTokenObj = getAccessToken();
		if (accTokenObj === null) throw new Error("you're not authorized");
		const res = await api.post(
			"/admin/transaction/deposit",
			{
				amount,
				deposit_type: depositType,
				details,
				subscriber_id: subscriberId,
			},
			{
				headers: {
					Authorization: `Bearer ${accTokenObj.accessToken}`,
				},
			}
		);
		return res.status;
	} catch (err) {
		console.error("Error processing deposit transaction:", err);
		return new Error("Failed to process deposit transaction.");
	}
};

export const withdrawTransaction = async (
	amount: number,
	details: string
): Promise<number | Error> => {
	try {
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
	} catch (err) {
		console.error("Error processing withdrawal transaction:", err);
		return new Error("Failed to process withdrawal transaction.");
	}
};
