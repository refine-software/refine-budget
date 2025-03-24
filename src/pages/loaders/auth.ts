import { redirect } from "react-router";
import { getAccessToken, getDeviceId } from "../../utils";

export function authGuardLoader(): null | Response {
  console.log("Checking auth...");
  const deviceId = getDeviceId();
  if (!deviceId) return redirect("/login");

  const accessToken = getAccessToken();
  if (!accessToken) return redirect("/login");

  // TODO: check token expiration (access and refresh).

  return accessToken ? null : redirect("/login");
}
