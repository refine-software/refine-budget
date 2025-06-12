import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";
import useTokenRefresher from "../hooks/useTokenRefresher";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import Header from "../components/navbar/Header";

const Root = () => {
	useTokenRefresher();
	const auth = useContext(AuthContext);

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
