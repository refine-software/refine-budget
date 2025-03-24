import { v4 } from "uuid";

export function getDeviceId(): string | null {
  return localStorage.getItem("deviceId");
}

export function setDeviceId(): void {
  const uuid = v4();
  localStorage.setItem("deviceId", uuid);
}
