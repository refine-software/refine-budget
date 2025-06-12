import { useContext, useEffect } from "react";
import { useFetcher, useNavigate } from "react-router";
import { AuthContext } from "../../store/auth-context";
import { Role, User } from "../../types";

const LoginForm = () => {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const fetcher = useFetcher<
		{ success: boolean; role: Role; user: User } | undefined
	>();

	useEffect(() => {
		if (fetcher.data?.success) {
			auth.login();
			if (fetcher.data.role === Role.ADMIN) auth.setAdmin();
			auth.setUserCtx(fetcher.data.user);
			navigate("/");
		}
	}, [auth, navigate, fetcher.data]);

	const forgotpasswordHandler = () => {
		navigate("/reset-password");
	}

	const isSubmitting = fetcher.state === "submitting";

	return (
		<fetcher.Form method="POST" className="flex flex-col gap-10 w-full">
			<div className="flex flex-col gap-6">
				<input
					className="border-1 border-primary py-3 px-6 rounded-xl"
					required
					type="text"
					name="email"
					placeholder="Email"
				/>
				<input
					className="border-1 border-primary py-3 px-6 rounded-xl"
					required
					type="password"
					name="password"
					placeholder="Password"
				/>
			</div>

			<button
				disabled={isSubmitting}
				type="submit"
				className="bg-primary py-2.5 hover:bg-opacity-90 rounded-xl"
			>
				{isSubmitting ? "Loading..." : "Login"}
			</button>

			<button type="button" className="text-primary cursor-pointer underline underline-offset-2" onClick={() => forgotpasswordHandler()}>
				Forgot password?
			</button>
		</fetcher.Form>
	);
};

export default LoginForm;
