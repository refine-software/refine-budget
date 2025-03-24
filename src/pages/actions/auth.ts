import axios from "axios";
import { login } from "../../api/auth";

export async function loginAction({ request }: { request: Request }) {
  const data = await request.formData();
  const email = data.get("email") as string;
  const password = data.get("password") as string;

  const res = await login({ email, password, deviceId: "asss" });

  if (axios.isAxiosError(res)) {
    console.log(res);
    return;
  } else if (res instanceof Error) {
    console.log(res);
    return;
  }
}
