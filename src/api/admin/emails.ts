import api from "../axiosConfig";
import { getAccessToken } from "../../utils";

type Email = {
	id: number;
	email: string;
};
export const getUserEmails = async (): Promise<Email[]> => {
	try {
		const accTokenObj = getAccessToken();
		if (accTokenObj === null) throw new Error("you're not authorized");
		const res = await api.get("/admin/allowed-emails", {
			headers: {
				Authorization: `Bearer ${accTokenObj.accessToken}`,
			},
		});

		return res.data as Email[];
	} catch (err) {
		console.error("Error fetching emails:", err);
		throw new Error("Failed to fetch emails.");
	}
};

export const addUserEmail = async (email: string): Promise<number | Error> => {
	try {
		const accTokenObj = getAccessToken();
		if (accTokenObj === null) throw new Error("you're not authorized");
		const res = await api.post(
			"/admin/allowed-email",
			{ email }, // Wrap email in an object
			{
				headers: {
					Authorization: `Bearer ${accTokenObj.accessToken}`,
				},
			}
		);
		return res.status;
	} catch (err) {
		console.error("Error adding email:", err);
		return new Error("Failed to add email.");
	}
};

export const deleteUserEmail = async (id: number): Promise<number | Error> => {
	try {
		const accTokenObj = getAccessToken();
		if (accTokenObj === null) throw new Error("you're not authorized");
		const res = await api.delete(`/admin/allowed-email/${id}`, {
			headers: {
				Authorization: `Bearer ${accTokenObj.accessToken}`,
			},
		});
		return res.status;
	} catch (err) {
		console.error("Error deleting email:", err);
		return new Error("Failed to delete email.");
	}
};

export const depositTransaction = async (
	amount: number
): Promise<number | Error> => {
	try {
		const accTokenObj = getAccessToken();
		if (accTokenObj === null) throw new Error("you're not authorized");
		const res = await api.post(
			"/admin/transaction/deposit",
			{ amount },
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
