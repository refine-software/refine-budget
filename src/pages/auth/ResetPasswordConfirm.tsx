import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { resetPassword } from "../../api";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

const ResetPasswordConfirm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const passRef = useRef<HTMLInputElement>(null);
    const confPassRef = useRef<HTMLInputElement>(null);
    const [err, setErr] = useState<string>("");

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    const resetPassMutation = useMutation({
        mutationFn: () => resetPassword.call({}, passRef.current?.value as string, token || ""),
        onSuccess: () => {
            navigate("/login");
        },
        onError(error) {
            if (axios.isAxiosError(error)) {
                if (error.status === 401) setErr("Your token probably expired, try resetting your password again");
                else setErr(error.response?.data.message);
            }
        },
    });

    const submitPassChange = () => {
        if (!passRef.current?.value.trim()) {
            setErr("Please enter a password");
            return;
        }
        if (passRef.current.value !== confPassRef.current?.value) {
            setErr("Your password do not match");
            return;
        }
        setErr("");
        resetPassMutation.mutate();
    }

    return (
        <div className="flex flex-col gap-8">
            <input
                type="password"
                placeholder="Password"
                className="p-3 border border-primary rounded-xl"
                ref={passRef}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                className="p-3 border border-primary rounded-xl"
                ref={confPassRef}
            />
            {err && (<p className="text-red">{err}</p>)}
            <button
                className="bg-primary rounded-xl p-3 text-lg"
                disabled={false}
                onClick={() => submitPassChange()}
            >
                Change Password
            </button>
        </div>
    )
}

export default ResetPasswordConfirm;
