import { useLocation, useNavigate } from "react-router";
import LeftArrow from "/Vector.svg";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

const excludedPaths: string[] = ["/", "/login", "/register", "/reset-password/confirm"];

const Header = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <header className="bg-primary h-72 absolute top-0 w-full z-10">
            <h2 className="flex items-center justify-center px-10 h-20 text-2xl font-medium">
                {!excludedPaths.includes(pathname) && (
                    <button
                        className="absolute left-4 cursor-pointer px-4"
                        onClick={() => navigate(-1)}
                    >
                        <img src={LeftArrow} alt="going back icon" />
                    </button>
                )}
                {getHeaderTitle(pathname, auth.user.name)}
            </h2>
        </header>
    );
};

function getHeaderTitle(
    pathname: string,
    username: string,
): string | React.ReactElement {
    switch (pathname) {
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
            return "Users";
        case "/transactions":
            return "Transactions";
        case "/manage-emails":
            return "Manage Emails";
        case "/reset-password":
            return "Password Reset";
        case "/reset-password/confirm":
            return "Confirm Reset"
        default:
            return "";
    }
}

export default Header;
