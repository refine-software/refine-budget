import { useContext, useEffect } from "react";
import AuthNav from "../components/navbar/AuthNav";
import { AuthContext } from "../store/auth-context";
import { useNavigate } from "react-router";
import RegisterForm from "../components/authentication/RegisterForm";

const Register = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.authenticated)
            navigate("/");
    }, [auth, navigate]);

    return (
        <>
            <AuthNav />
            <RegisterForm />
        </>
    );
}

export default Register;
