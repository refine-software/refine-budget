import { v4 } from "uuid";
import { dateConversion } from "./date";
import { Role } from "../types";

export function removeAllStorage(): void {
    localStorage.removeItem("role");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExp");
    localStorage.removeItem("deviceId");
}

// ----------------
// Devices
// ----------------
export function getDeviceId(): string | null {
    return localStorage.getItem("deviceId");
}

export function setDeviceId(): void {
    const uuid = v4();
    localStorage.setItem("deviceId", uuid);
}



// ----------------
// Access Tokens
// ----------------
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
        console.error("couldn't convert date");
        return null;
    }

    return { accessToken: token, accessTokenExp: date };
}

export function setAccessToken(accessToken: AccessToken): void {
    const { accessToken: token, accessTokenExp } = accessToken;
    const exp = accessTokenExp.toISOString();
    localStorage.setItem("accessToken", token);
    localStorage.setItem("accessTokenExp", exp);
}

export function clearAccessToken(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExp");
}

// ----------------
// Role
// ----------------
export function getRole(): Role | null {
    const role = localStorage.getItem("role");

    let ERole: Role;

    if (role == "admin") {
        ERole = Role.ADMIN;
    } else if (role == "user") {
        ERole = Role.USER;
    } else return null;

    return ERole;
}

export function setRole(role: Role) {
    localStorage.setItem("role", role.toString());
}
