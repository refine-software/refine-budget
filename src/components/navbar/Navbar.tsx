import { useContext } from "react";
import { NavLink, useLocation } from "react-router";
import { AuthContext } from "../../store/auth-context";
import { Role } from "../../types";

const Navbar = () => {
	const { role } = useContext(AuthContext);
	const isAdmin = role === Role.ADMIN;

	return (
		<nav className="bg-primary fixed w-full overflow-hidden bottom-0 z-50 ">
			<div className="py-5 px-8 flex justify-around gap-4">
				<NavLink to={"/"}>
					{({ isActive }) => (
						<img
							src={
								isActive
									? "./public/home-active.svg"
									: "/public/home.svg"
							}
							alt="Home"
						/>
					)}
				</NavLink>
				<NavLink to={"/history"}>
					{({ isActive }) => (
						<img
							src={
								isActive
									? "/public/history-active.svg"
									: "/public/history.svg"
							}
							alt="history"
						/>
					)}
				</NavLink>
				<NavLink to={"/profile"}>
					{({ isActive }) => (
						<img
							src={
								isActive
									? "/public/profile-active.svg"
									: "/public/profile.svg"
							}
							alt="Home"
						/>
					)}
				</NavLink>
				{isAdmin && (
					<NavLink
						to={"/control"}
						className={({ isActive }) => {
							const location = useLocation();
							return isActive ||
								[
									"/users",
									"/transactions",
									"/manage-emails",
								].includes(location.pathname)
								? "active-class"
								: "";
						}}
					>
						{({ isActive }) => {
							const location = useLocation();
							return (
								<img
									src={
										isActive ||
										[
											"/users",
											"/transactions",
											"/manage-emails",
										].includes(location.pathname)
											? "/public/control-active.svg"
											: "/public/control.svg"
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
