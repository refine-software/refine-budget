import { AxiosError } from "axios";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router";
import { RegisterContext } from "../../store/register-context";
import chooseImage from "../../assets/choose-image.svg";

const RegisterForm = () => {
    const navigate = useNavigate();
    const fetcher = useFetcher<{ success: boolean, status: number | null, err: AxiosError | Error } | undefined>();
    const { setEmail } = useContext(RegisterContext);

    const [preview, setPreview] = useState<string>(chooseImage);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [submittedEmail, setSubmittedEmail] = useState("");

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        } else {
            setPreview(chooseImage);
        }
    };

    useEffect(() => {
        return () => {
            if (preview && preview !== chooseImage) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    useEffect(() => {
        if ((fetcher.state === "idle" && fetcher.data?.success && submittedEmail)) {
            setEmail(submittedEmail);
            navigate("/register/verify");
        }
    }, [fetcher.state, fetcher.data, submittedEmail, setEmail, navigate]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;

        if (password !== confirmPassword) {
            e.preventDefault();
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError("");
            setSubmittedEmail(email);
        }
    };

    const isLoading = fetcher.state === "submitting" || fetcher.state === "loading";

    let errorMessage = "";
    if (fetcher.data?.status === 400) errorMessage = "Invalid user data or image upload.";
    else if (fetcher.data?.status === 403) errorMessage = "Registration forbidden. This email is not allowed.";
    else if (fetcher.data?.status === 409) errorMessage = "You've already signed up, try to log in"
    else if (fetcher.data?.status === 500) errorMessage = "Internal server error. Please try again later.";

    return (
        <fetcher.Form method="POST" encType="multipart/form-data" className="flex flex-col justify-center items-center gap-10 py-12"
            onSubmit={handleSubmit}
        >
            {errorMessage && (
                <div className="text-red-600 text-center font-medium">
                    {errorMessage}
                </div>
            )}
            <label
                htmlFor="image"
                className="m-3"
            >
                <img className="rounded-full aspect-square w-40 h-40" src={preview} alt="choose image" />
            </label>
            <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />

            <div className="w-full flex flex-col gap-6">
                <input className="border-1 border-primary py-3 px-6 rounded-xl" type="text" name="name" placeholder="Name" required />
                <input className="border-1 border-primary py-3 px-6 rounded-xl" required type="text" name="email" placeholder="Email" />
                <input
                    className="border-1 border-primary py-3 px-6 rounded-xl"
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    className="border-1 border-primary py-3 px-6 rounded-xl"
                    required
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passwordError && (
                    <div className="text-red-600 text-sm">{passwordError}</div>
                )}
            </div>
            <button className="w-full bg-primary p-3 rounded-2xl" type="submit" disabled={isLoading}>
                Register
            </button>
        </fetcher.Form>
    )
}

export default RegisterForm;
