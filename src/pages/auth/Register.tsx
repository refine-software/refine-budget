import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../store/auth-context";
import RegisterForm from "../../components/authentication/RegisterForm";
import AuthNav from "../../components/navbar/AuthNav";

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
