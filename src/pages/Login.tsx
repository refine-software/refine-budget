import LoginForm from "../components/authentication/LoginForm";
import AuthNav from "../components/navbar/AuthNav";

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-12">
            <AuthNav />
            <LoginForm />
        </div>
    );
};

export default Login;
