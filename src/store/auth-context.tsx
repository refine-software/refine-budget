import { createContext } from "react";
import { AuthContextType, Role } from "../types";

export const AuthContext = createContext<AuthContextType>({
	authenticated: false,
	loading: true,
	role: Role.user,
	login(): void { },
	logout(): void { },
	setAdmin(): void { },
});
