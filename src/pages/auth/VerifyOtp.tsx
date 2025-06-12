import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { RegisterContext } from "../../store/register-context";
import { resendVerificationCode, verifyAccount } from "../../api";

/**
 * TODO: when the user clicks resend verification we should:
 * 1. Hide the error msg.
 * 2. The input should be empty.
 * 3. The timer resets
 */

const VerifyOtp = () => {
    const { email } = useContext(RegisterContext);
    const navigate = useNavigate();

    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [resendTimer, setResendTimer] = useState<number>(60);
    const [verifyStatus, setVerifyStatus] = useState<{ status: number | undefined, msg: string }>({} as { status: number | undefined, msg: string });
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (!email) navigate("/register");
    }, [email, navigate]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (resendTimer) {
                setResendTimer((prev) => {
                    if (prev)
                        return prev - 1;
                    else return 0;
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    })

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join("");
        if (code.length !== 6) return;

        const res = await verifyAccount(email, code);
        if (axios.isAxiosError(res)) {
            console.log(res.response?.data.message);
            setVerifyStatus({ status: res.status, msg: res.response?.data.message })
        }
        console.log("OTP submitted:", code, "for", email);
        console.log("Status:", res);
        if (res === 200) navigate("/login");
    };

    const resendVerificationCodeSubmit = async () => {
        const status = await resendVerificationCode(email);
        if (status === 200) console.log("OTP SENT TO YOUR EMAIL");
    }

    return (
        <div className="text-white px-2 py-4 flex flex-col gap-24">
            <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-black">Enter Verification Code</h1>
                <p className="text-gray-300">
                    Enter code that we have sent to your email <br />
                    <span className="text-white font-medium">{email}</span>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-24">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            {otp.map((digit, idx) => (
                                <input
                                    key={idx}
                                    ref={(el) => { inputsRef.current[idx] = el; }}
                                    maxLength={1}
                                    className="w-12 h-12 text-center text-xl border border-primary rounded-md text-white focus:outline-none focus:border-2 focus:border-orange-400"
                                    value={digit}
                                    onChange={(e) => handleChange(idx, e.target.value)}
                                />
                            ))}
                        </div>
                        {
                            verifyStatus.status === 401 ?
                                <p className="text-red">{verifyStatus.msg}</p>
                                : ""
                        }
                    </div>

                    <button
                        type="button"
                        className="text-orange-500 font-medium disabled:text-gray-500"
                        onClick={resendVerificationCodeSubmit}
                        disabled={resendTimer > 0}
                    >
                        {resendTimer > 0 ? resendTimer : ""} Resend code
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-orange-500 text-white py-3 px-6 rounded-full w-full max-w-xs"
                >
                    Confirm
                </button>
            </form>
        </div>
    );
};

export default VerifyOtp;
