import { useContext } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/navbar/Header";
import useTokenRefresher from "../hooks/useTokenRefresher";
import { AuthContext } from "../store/auth-context";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const Root = () => {
	const auth = useContext(AuthContext);
	useTokenRefresher();

	if (auth.loading) {
		return (
			<main className="h-lvh w-full bg-dark py-10 px-6 flex justify-center items-center">
				<LoadingSpinner size="huge" />
			</main>
		);
	}

	return (
		<div className="relative">
			<Header />
			<main className="min-h-container absolute top-20 w-full z-20 bg-dark py-10 px-6">
				<Outlet />
			</main>
			{auth.authenticated ? <Navbar /> : <></>}
		</div>
	);
};

export default Root;