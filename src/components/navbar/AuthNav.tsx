import { NavLink } from "react-router";

const AuthNav = () => {
    return (
        <div className="flex justify-center items-center gap-8">
            <NavLink to="/login" className={({ isActive }) =>
                `${isActive ? "bg-primary" : ""} block border-1 border-primary w-32 text-center px-4 py-2 rounded-md`
            }>
                Login
            </NavLink>

            <NavLink to="/register" className={({ isActive }) =>
                `${isActive ? "bg-primary" : ""} block border-1 border-primary w-32 text-center px-4 py-2 rounded-md`
            }>
                Register
            </NavLink>
        </div>
    );
}

export default AuthNav;