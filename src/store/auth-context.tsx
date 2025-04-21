import { createContext } from "react";
import { AuthContextType, Role, User } from "../types";

export const AuthContext = createContext<AuthContextType>({
	user: {} as User,
	authenticated: false,
	loading: true,
	role: Role.user,
	login(): void { },
	logout(): void { },
	setAdmin(): void { },
	setUserCtx(): void { },
});
