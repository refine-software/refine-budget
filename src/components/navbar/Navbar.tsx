import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { AuthContext } from "../../store/auth-context";
import { Role } from "../../types";
import home from "/home.svg";
import homeActive from "/home-active.svg";
import history from "/history.svg";
import historyActive from "/history-active.svg";
import profile from "/profile.svg";
import profileActive from "/profile-active.svg";
import control from "/control.svg";
import controlActive from "/control-active.svg";

const Navbar = () => {
	const auth = useContext(AuthContext);
	const { role } = auth;
	const location = useLocation();
	const [isAdmin, setIsAdmin] = useState<boolean>(role === Role.ADMIN);

	useEffect(() => {
		setIsAdmin(auth.role === Role.ADMIN);
	}, [auth]);

	return (
		<nav className="bg-primary fixed w-full overflow-hidden bottom-0 z-30 ">
			<div className="py-4 px-6 flex justify-around gap-4">
				<NavLink to={"/"}>
					{({ isActive }) => (
						<img src={isActive ? homeActive : home} alt="Home" />
					)}
				</NavLink>
				<NavLink to={"/history"}>
					{({ isActive }) => (
						<img src={isActive ? historyActive : history} alt="history" />
					)}
				</NavLink>
				<NavLink to={"/profile"}>
					{({ isActive }) => (
						<img src={isActive ? profileActive : profile} alt="Home" />
					)}
				</NavLink>
				{isAdmin && (
					<NavLink
						to={"/control"}
						className={({ isActive }) => {
							return isActive ||
								["/users", "/transactions", "/manage-emails"].includes(
									location.pathname,
								)
								? "active-class"
								: "";
						}}
					>
						{({ isActive }) => {
							return (
								<img
									src={
										isActive ||
											["/users", "/transactions", "/manage-emails"].includes(
												location.pathname,
											)
											? controlActive
											: control
									}
									alt="Control"
								/>
							);
						}}
					</NavLink>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
