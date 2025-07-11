import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { AuthContextType } from "../types";

export default function useAuth(): AuthContextType {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}
