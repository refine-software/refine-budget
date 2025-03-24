import { useContext } from "react";
import { Location, Outlet, useLocation } from "react-router";
import Navbar from "../components/navbar/Navbar";
// import Providers from "../providers";
import { AuthContext } from "../context/authContext";

const Root = () => {
    // const accessToken = useLoaderData<string | null>();
    const location = useLocation();
    const auth = useContext(AuthContext);

    return (
        // <Providers>
        <div className="relative">
            <header className="bg-primary h-72 absolute top-0 w-full z-10">
                <h2 className="flex items-center px-10 h-20 text-xl font-medium">{getHeaderTitle(location)}</h2>
            </header>
            <main className="min-h-container absolute top-20 w-full z-20 bg-dark rounded-t-[50px] py-10 px-8">
                <Outlet />
            </main>
            {auth.authenticated ? <Navbar /> : <></>}
        </div>
        // </Providers>
    );
};

function getHeaderTitle(location: Location): string {
    switch (location.pathname) {
        case "/":
            return "Home";
        case "/login":
            return "Login";
        case "/register":
            return "Register";
        default:
            return "";
    }
};

export default Root;
