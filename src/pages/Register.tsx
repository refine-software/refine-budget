import { useContext, useEffect } from "react";
import AuthNav from "../components/navbar/AuthNav";
import { AuthContext } from "../store/auth-context";
import { useNavigate } from "react-router";

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
        </>
    );
}

export default Register;
