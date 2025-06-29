import axios from "axios";
import { login, register } from "../../api/auth";
import { getDeviceId, setAccessToken, setDeviceId, setRole } from "../../utils";
import { getUser } from "../../api";
import { RegisterReq } from "../../types";

export async function registerAction({ request }: { request: Request }) {
	const data = await request.formData();

	const image = data.get("image");
	const file = image instanceof File && image.size > 0 ? image : null;

	const requestData: RegisterReq = {
		name: data.get("name") as string,
		email: data.get("email") as string,
		password: data.get("password") as string,
		image: file,
	};

	const res = await register(requestData);
	if (axios.isAxiosError(res)) {
		return { success: false, status: res.status, err: res };
	} else if (res instanceof Error) {
		return { success: false, status: null, err: res };
	}

	return { success: true, status: res, err: null };
}

export async function loginAction({ request }: { request: Request }) {
	const data = await request.formData();
	const email = data.get("email") as string;
	const password = data.get("password") as string;

	let deviceId = getDeviceId();
	if (deviceId === null) setDeviceId();

	deviceId = getDeviceId();
	if (deviceId === null) throw new Error("Cannot get deviceId");

	const res = await login({ email, password, deviceId: deviceId });

	if (axios.isAxiosError(res)) {
		console.error(res);
		return;
	} else if (res instanceof Error) {
		console.error(res);
		return;
	}
	console.log(res);

	setAccessToken({
		accessToken: res.access_token,
		accessTokenExp: new Date(Date.now() + 1000 * 600),
	});
	setRole(res.role);

	const userRes = await getUser();

	return { success: true, role: res.role, user: userRes };
}
