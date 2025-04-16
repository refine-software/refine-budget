import { useContext, useEffect } from "react";
import LoginForm from "../components/authentication/LoginForm";
import AuthNav from "../components/navbar/AuthNav";
import { AuthContext } from "../store/auth-context";
import { useNavigate } from "react-router";

const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.authenticated)
            navigate("/");
    }, [auth, navigate]);

    return (
        <div className="flex flex-col items-center justify-center gap-12">
            <AuthNav />
            <LoginForm />
        </div>
    );
};

export default Login;
