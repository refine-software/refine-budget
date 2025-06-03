import { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../store/auth-context";
import { Role } from "../../types";

const Navbar = () => {
	const { role } = useContext(AuthContext);
	const isAdmin = role === Role.admin;

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
					<NavLink to={"/control"}>
						{({ isActive }) => (
							<img
								src={
									isActive
										? "/public/control-active.svg"
										: "/public/control.svg"
								}
								alt="Home"
							/>
						)}
					</NavLink>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
