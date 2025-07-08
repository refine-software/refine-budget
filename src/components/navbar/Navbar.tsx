import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { AuthContext } from "../../store/auth-context";
import { Role } from "../../types";

import home from "../../assets/home.svg";
import homeActive from "../../assets/home-active.svg";
import history from "../../assets/history.svg";
import historyActive from "../../assets/history-active.svg";
import profile from "../../assets/profile.svg";
import profileActive from "../../assets/profile-active.svg";
import control from "../../assets/control.svg";
import controlActive from "../../assets/control-active.svg";

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
			<div className="h-20 px-7 flex justify-between items-center gap-4">
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
