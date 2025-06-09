import { Role } from "../../types";

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
