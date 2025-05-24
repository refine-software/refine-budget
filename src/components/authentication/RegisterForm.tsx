import { useEffect, useState } from "react";
import { useFetcher, useNavigate, useNavigation } from "react-router";

const RegisterForm = () => {
    const navigation = useNavigation();
    const navigate = useNavigate();
    const fetcher = useFetcher<number | undefined>();
    const [preview, setPreview] = useState<string>("/choose-image.svg");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        } else {
            setPreview("/choose-image.svg");
        }
    };

    useEffect(() => {
        return () => {
            if (preview && preview !== "/choose-image.svg") {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    let errorMessage = "";
    if (fetcher.data === 400) {
        errorMessage = "Invalid user data or image upload.";
    } else if (fetcher.data === 403) {
        errorMessage = "Registration forbidden. This email is not allowed.";
    } else if (fetcher.data === 409) {
        errorMessage = "This email is already registered.";
    } else if (fetcher.data === 500) {
        errorMessage = "Internal server error. Please try again later.";
    }

    return (
        <fetcher.Form method="POST" encType="multipart/form-data" className="flex flex-col justify-center items-center gap-10 py-12"
            onSubmit={(e) => {
                if (password !== confirmPassword) {
                    e.preventDefault();
                    setPasswordError("Passwords do not match");
                } else {
                    setPasswordError("");
                }
            }}
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
            <button className="w-full bg-primary p-3 rounded-2xl" type="submit">Register</button>
        </fetcher.Form>
    )
}

export default RegisterForm;
