import { getAccessToken } from "../../utils";
import { User } from "../../types";
import api from "../axiosConfig";
import axios from "axios";

const getAdminUsers = async (): Promise<User[]> => {
	const accTokenObj = getAccessToken();
	if (!accTokenObj) throw new Error("Unauthorized");

	const res = await api.get("/admin/users", {
		headers: {
			Authorization: `Bearer ${accTokenObj.accessToken}`,
		},
	});
	console.log(res.data);
	return res.data as User[];
};

const editUserDebt = async (
	debt: number,
	user_id: number
): Promise<boolean> => {
	try {
		const accTokenObj = getAccessToken();
		if (!accTokenObj) throw new Error("Unauthorized");

		await api.patch(
			`/admin/user/debt`,
			{ debt, user_id },
			{
				headers: {
					Authorization: `Bearer ${accTokenObj.accessToken}`,
				},
			}
		);
		return true;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			console.error("Error editing user debt:", err.response?.data);
			return false;
		} else {
			console.error("An unknown error occurred while editing user debt.");
			return false;
		}
	}
};

const relieveUserDebt = async (userId: number): Promise<number> => {
	const accTokenObj = getAccessToken();
	if (!accTokenObj) throw new Error("Unauthorized");
	const res = await api.patch(
		`/admin/user/debt-relief/${userId}`,
		{},
		{
			headers: {
				Authorization: `Bearer ${accTokenObj.accessToken}`,
			},
		}
	);
	return res.status;
};

const editUserRole = async (
	role: string,
	user_id: number
): Promise<boolean> => {
	try {
		const accTokenObj = getAccessToken();
		if (!accTokenObj) throw new Error("Unauthorized");

		await api.patch(
			`/admin/user/role`,
			{ role, user_id },
			{
				headers: {
					Authorization: `Bearer ${accTokenObj.accessToken}`,
				},
			}
		);
		return true;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			console.error("Error editing user role:", err.response?.data);
			return false;
		} else {
			console.error("An unknown error occurred while editing user role.");
			return false;
		}
	}
};

const deleteUser = async (userId: number): Promise<number> => {
	const accTokenObj = getAccessToken();
	if (!accTokenObj) throw new Error("Unauthorized");

	const res = await api.delete(`/admin/user/${userId}`, {
		headers: {
			Authorization: `Bearer ${accTokenObj.accessToken}`,
		},
	});
	return res.status;
};

const debtReliefAll = async (): Promise<boolean> => {
	try {
		const accTokenObj = getAccessToken();
		if (!accTokenObj) throw new Error("Unauthorized");

		await api.patch(
			`/admin/users/debt-relief`,
			{},
			{
				headers: {
					Authorization: `Bearer ${accTokenObj.accessToken}`,
				},
			}
		);
		return true;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			console.error(
				"Error relieving debt for all users:",
				err.response?.data
			);
			return false;
		} else {
			console.error(
				"An unknown error occurred while relieving debt for all users."
			);
			return false;
		}
	}
};

export {
	getAdminUsers,
	editUserDebt,
	relieveUserDebt,
	editUserRole,
	deleteUser,
	debtReliefAll,
};
