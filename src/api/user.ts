import axios from "axios";
import { User } from "../types";
import api from "./axiosConfig";
import { getAccessToken, getDeviceId } from "../utils";

const getUser = async (): Promise<User> => {
	const accTokenObj = getAccessToken();
	if (!accTokenObj) throw new Error("Unauthorized");
	const res = await api.get("user", {
		headers: {
			Authorization: `Bearer ${accTokenObj.accessToken}`,
		},
	});
	return res.data as User;
};

const updateUsername = async (name: string): Promise<{ name: string }> => {
	try {
		const accTokenObj = getAccessToken();
		if (!accTokenObj) throw new Error("Unauthorized");

		const res = await api.patch(
			"/user/name",
			{ name },
			{
				headers: { Authorization: `Bearer ${accTokenObj.accessToken}` },
			}
		);
		return res.data as User;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			throw new Error(
				`Failed to update username: ${err.response?.data?.message || err.message
				}`
			);
		} else {
			throw new Error(
				"An unknown error occurred while updating username."
			);
		}
	}
};

const updateProfileImage = async (file: File): Promise<{ image: string }> => {
	try {
		const accTokenObj = getAccessToken();
		if (!accTokenObj) throw new Error("Unauthorized");

		const formData = new FormData();
		formData.append("image", file);

		const res = await api.patch("/user/image", formData, {
			headers: {
				Authorization: `Bearer ${accTokenObj.accessToken}`,
				"Content-Type": "multipart/form-data",
			},
		});
		return res.data as { image: string };
	} catch (err) {
		if (axios.isAxiosError(err)) {
			console.error("Error response:", err.response?.data);
			throw new Error(
				`Failed to update profile image: ${err.response?.data?.message || err.message
				}`
			);
		} else {
			throw new Error(
				"An unknown error occurred while updating profile image."
			);
		}
	}
};

const logoutUser = async (): Promise<number> => {
	const accTokenObj = getAccessToken();
	if (!accTokenObj) throw new Error("Unauthorized");

	const deviceId = getDeviceId();
	if (!deviceId) throw new Error("No deviceId found, bad logout.");

	const res = await api.post("/user/logout", null, {
		headers: {
			Authorization: `Bearer ${accTokenObj.accessToken}`,
			"Device-ID": deviceId,
		},
	});
	return res.status;
};

export { getUser, updateUsername, updateProfileImage, logoutUser };
