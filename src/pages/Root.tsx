import { useContext } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/navbar/Header";
import { AuthContext } from "../store/auth-context";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const Root = () => {
	const auth = useContext(AuthContext);

	if (auth.loading) {
		return (
			<main className="h-lvh w-full bg-dark py-10 px-6 flex justify-center items-center">
				<LoadingSpinner size="huge" />
			</main>
		);
	}

	return (
		<div>
			<Header />
			<main className="main-screen-height w-full z-20 bg-dark pt-8 pb-[122px] px-6">
				<Outlet />
			</main>
			{auth.authenticated ? <Navbar /> : <></>}
		</div>
	);
};

export default Root;