import axios from "axios";
import { login } from "../../api/auth";
import { getDeviceId, setDeviceId } from "../../utils";

export async function loginAction({ request }: { request: Request }) {
  const data = await request.formData();
  const email = data.get("email") as string;
  const password = data.get("password") as string;

  let deviceId = getDeviceId();
  if (deviceId === null) setDeviceId();

  deviceId = getDeviceId();
  if (deviceId === null)
    throw new Error("Cannot get deviceId");

  const res = await login({ email, password, deviceId: deviceId });

  if (axios.isAxiosError(res)) {
    console.log(res);
    return;
  } else if (res instanceof Error) {
    console.log(res);
    return;
  }
}
