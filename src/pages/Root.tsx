import { useContext } from "react";
import { Location, Outlet, useLocation } from "react-router";
import Navbar from "../components/navbar/Navbar";
import { AuthContext } from "../store/auth-context";
import useTokenRefresher from "../hooks/useTokenRefresher";
import { getDeviceId } from "../utils";
import { NavLink } from "react-router";
import LeftArrow from "../../public/Vector.svg";

const Root = () => {
	const location = useLocation();
	const auth = useContext(AuthContext);
	const deviceId = getDeviceId();
	useTokenRefresher(deviceId);

	return (
		<div className="relative">
			<header className="bg-primary h-72 absolute top-0 w-full z-10">
				<h2 className="flex items-center justify-center px-10 h-20 text-2xl font-medium">
					{getHeaderTitle(location, auth.user.name)}
				</h2>
			</header>
			<main className="min-h-container absolute top-20 w-full z-20 bg-dark py-10 px-8">
				<Outlet />
			</main>
			{auth.authenticated ? <Navbar /> : <></>}
		</div>
	);
};

function getHeaderTitle(
	location: Location,
	username: string
): string | JSX.Element {
	switch (location.pathname) {
		case "/":
			return "Sup " + username;
		case "/login":
			return "Login";
		case "/register":
			return "Register";
		case "/history":
			return "History";
		case "/profile":
			return "Profile";
		case "/control":
			return "Control";
		case "/users":
			return (
				<div className="flex items-center">
					<NavLink to="/control" className="absolute left-4">
						<img src={LeftArrow} alt="going back icon" />
					</NavLink>{" "}
					Users
				</div>
			);
		case "/transactions":
			return (
				<div className="flex items-center">
					<NavLink to="/control" className="absolute left-4">
						<img src={LeftArrow} alt="going back icon" />
					</NavLink>{" "}
					Transactions
				</div>
			);
		case "/manage-emails":
			return (
				<div className="flex items-center">
					<NavLink to="/control" className="absolute left-4">
						<img src={LeftArrow} alt="going back icon" />
					</NavLink>{" "}
					Manage Emails
				</div>
			);
		default:
			return "";
	}
}

export default Root;
