import { JSX, useRef, useState } from "react";
import { initiatePasswordReset } from "../../api";
import axios from "axios";
import { Outlet, useLocation } from "react-router";

const ResetPassword = () => {
    const location = useLocation();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const emailInput = useRef<HTMLInputElement>(null);


    const isConfirmPage = location.pathname.includes("confirm");
    if (isConfirmPage) {
        return <Outlet />;
    }

    const submitEmail = async () => {
        if (!emailInput.current) return;
        if (emailInput.current.value.trim() === "") return;
        try {
            setLoading(true);
            const status = await initiatePasswordReset(emailInput.current?.value.trim());
            if (status) {
                setLoading(false);
                setSuccess("Check your Email, password reset URL is sent");
                emailInput.current.value = "";
            }
        } catch (err) {
            setLoading(false);
            if (axios.isAxiosError(err)) {
                setError(err.message);
            } else {
                setError("Unknown error occurred during the password reset initiation");
            }
        }
    };

    let response: JSX.Element = <></>;
    if (error) {
        response = <p className="text-red">{error}</p>
    }

    if (success) {
        response = (<p className="text-green">{success}</p>);
    }

    return (
        <div className="flex flex-col justify-center items-center gap-10">
            <div className="flex flex-col gap-3 w-full">
                <h1 className="">Email</h1>
                <input type="text" placeholder="email@example.com" className="border border-primary px-3 py-2.5 w-full outline-none rounded-xl" ref={emailInput} />
                {response}
            </div>
            <button
                className="bg-primary w-full rounded-xl py-3"
                onClick={() => submitEmail()}
                disabled={loading}
            >
                {loading ? "loading..." : "Send Verification Code"}
            </button>
        </div>
    )
}

export default ResetPassword;
