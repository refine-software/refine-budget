import { useEffect } from "react";
import { Form, useNavigate, useNavigation } from "react-router"
import { getAccessToken } from "../../api/auth";

const LoginForm = () => {
    const navigation = useNavigation();
    const navigate = useNavigate();

    useEffect(() => {
        const accesToken = getAccessToken();
        if (accesToken) {
            navigate("/");
        }
    });

    const isSubmitting = navigation.state === "submitting";

    return (
        <Form method="POST" className="flex flex-col gap-10 w-full">
            <div className="flex flex-col gap-6">
                <input className="border-1 border-primary py-3 px-6 rounded-xl" type="text" name="email" placeholder="Email" />
                <input className="border-1 border-primary py-3 px-6 rounded-xl" type="password" name="password" placeholder="Password" />
            </div>

            <button
                disabled={isSubmitting}
                type="submit"
                className="bg-primary py-2.5 hover:bg-opacity-90 rounded-xl"
            >
                {isSubmitting ? "Loading..." : "Login"}
            </button>
        </Form>
    )
}

export default LoginForm
