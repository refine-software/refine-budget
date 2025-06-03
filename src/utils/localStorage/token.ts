import { dateConversion } from "../date";

type AccessToken = {
	accessToken: string;
	accessTokenExp: Date;
};

export function getAccessToken(): AccessToken | null {
	const token = localStorage.getItem("accessToken");
	const tokenExp = localStorage.getItem("accessTokenExp");
	if (!token || !tokenExp) return null;

	const date = dateConversion(tokenExp);
	if (date === null) {
		console.log("bad date");
		return null;
	}

	return { accessToken: token, accessTokenExp: date };
}

export function setAccessToken(accessToken: AccessToken): void {
	const { accessToken: token, accessTokenExp } = accessToken;
	const exp = accessTokenExp.toLocaleString();
	localStorage.setItem("accessToken", token);
	localStorage.setItem("accessTokenExp", exp);
}
export function clearAccessToken(): void {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("accessTokenExp");
}
