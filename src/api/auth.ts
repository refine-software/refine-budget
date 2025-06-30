import {
	LoginReqType,
	LoginResType,
	RefreshResType,
	RegisterReq,
} from "../types";
import { getDeviceId } from "../utils";
import api from "./axiosConfig";
import axios, { AxiosError, AxiosResponse } from "axios";

async function register(
	formData: RegisterReq
): Promise<number | AxiosError | Error> {
	try {
		const data = new FormData();
		data.append("name", formData.name);
		data.append("email", formData.email);
		data.append("password", formData.password);
		if (formData.image) {
			data.append("image", formData.image);
		}

		const res = await api.post("auth/register", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return res.status;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err;
		} else {
			return new Error("An unknown error occurred");
		}
	}
}

async function resendVerificationCode(
	email: string
): Promise<number | AxiosError | Error> {
	try {
		const res = await api.post("auth/resend-verification-email", {
			email: email,
		});

		return res.status;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err;
		} else {
			return new Error("An unknown error occurred");
		}
	}
}

async function verifyAccount(
	email: string,
	otp: string
): Promise<number | AxiosError | Error> {
	try {
		const res = await api.post("auth/verify-account", {
			email: email,
			otp: otp,
		});
		return res.status;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err;
		} else {
			return new Error("An unknown error occurred");
		}
	}
}

async function login({
	email,
	password,
	deviceId,
}: LoginReqType): Promise<LoginResType | AxiosError | Error> {
	try {
		const res: AxiosResponse = await api.post(
			"auth/login",
			{
				email: email,
				password: password,
			},
			{
				headers: {
					"Device-ID": deviceId,
				},
			}
		);
		console.log("Login response:", res.data);
		return res.data as LoginResType;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err;
		} else {
			return new Error("An unknown error occurred");
		}
	}
}

async function refreshTokens(): Promise<RefreshResType> {
	const deviceId = getDeviceId();
	console.log("Refreshing tokens with deviceId:", deviceId);
	const res: AxiosResponse = await api.post(
		"auth/refresh",
		{},
		{
			headers: {
				"Device-ID": deviceId,
			},
		}
	);
	return res.data as RefreshResType;
}

async function initiatePasswordReset(email: string): Promise<number> {
	const res = await api.post("auth/reset-password", { email });
	return res.status;
}

async function resetPassword(newPassword: string, token: string): Promise<number> {
	const res = await api.post("auth/reset-password/confirm", {
		new_password: newPassword,
		token: token
	})
	return res.status;
}

export {
	register,
	resendVerificationCode,
	verifyAccount,
	login,
	refreshTokens,
	initiatePasswordReset,
	resetPassword
};
