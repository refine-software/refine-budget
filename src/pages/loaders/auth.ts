import { redirect } from "react-router";
import { getAccessToken, getDeviceId, setAccessToken } from "../../utils";
import { refreshTokens } from "../../api";
import axios from "axios";

export async function authGuardLoader(): Promise<null | Response> {
  console.log("Checking auth...");
  const deviceId = getDeviceId();
  if (!deviceId) return redirect("/login");

  const accessTokenObj = getAccessToken();
  if (accessTokenObj === null) return redirect("/login");

  const { accessTokenExp } = accessTokenObj;
  if (accessTokenExp > new Date) return null;

  const refreshTokenRes = await refreshTokens(deviceId);
  if (axios.isAxiosError(refreshTokenRes)) {
    // TODO: check for different error status
    return redirect("/login");
  }
  if (refreshTokenRes instanceof Error)
    return redirect("/login");


  setAccessToken({ accessToken: refreshTokenRes.access_token, accessTokenExp: new Date(Date.now() + 1000 * 600) });

  return null;
}
