import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { Role } from "../../types";

const AdminRoute = ({ children }: PropsWithChildren) => {
	const auth = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!auth.authenticated && !auth.loading) navigate("/login");
		if (auth.role !== Role.ADMIN) navigate("/");
	}, [navigate, auth]);

	return children;
};

export default AdminRoute;
