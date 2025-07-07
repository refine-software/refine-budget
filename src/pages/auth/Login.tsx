import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../store/auth-context";
import LoginForm from "../../components/authentication/LoginForm";
import AuthNav from "../../components/navbar/AuthNav";

const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.authenticated && !auth.loading)
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
