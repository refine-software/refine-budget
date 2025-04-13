import { Role } from "../../store/auth-context";

export function getRole(): Role | null {
  const role = localStorage.getItem("role") as Role;

  if (!role) return null;

  return (!role) ? null : role;
}

export function setRole(role: Role) {
  localStorage.setItem("role", role)
}
