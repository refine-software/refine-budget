import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../store/auth-context";
import { getHeaderTitle } from "../../utils/routeTitles";
import next from "../../assets/next.png";

const excludedPaths: string[] = ["/", "/login", "/register", "/reset-password/confirm"];

const Header = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const shouldShowBackButton = !excludedPaths.includes(pathname);

    return (
        <header className="bg-primary w-full z-10">
            <h2 className="flex items-center justify-center px-10 h-20 text-2xl font-medium text-white relative">
                {shouldShowBackButton && (
                    <button
                        className="absolute left-3 cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        <img src={next} alt="Go back" className="w-12 rotate-180" />
                    </button>
                )}
                {getHeaderTitle(pathname, auth.user.name)}
            </h2>
        </header>
    );
};

export default Header;
