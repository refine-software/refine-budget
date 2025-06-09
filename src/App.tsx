import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loginAction, registerAction } from "./pages/actions";
import Root from "./pages/Root";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./pages/protection/ProtectedRoute";
import AuthContextProvider from "./store/AuthContextProvider";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Control from "./pages/Control";
import VerifyOtp from "./pages/VerifyOtp";
import { RegisterProvider } from "./store/RegisterContextProvider";
import Users from "./pages/adminUsers";
import Transactions from "./pages/adminTransactions";
import ManageEmails from "./pages/adminManageEmails";
import { AuthContext } from "./store/auth-context";
import { Role } from "./types";
import { useContext } from "react";
import AdminRoute from "./pages/protection/AdminRoute";

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
			},
			{
				path: "history",
				element: (
					<ProtectedRoute>
						<History />
					</ProtectedRoute>
				),
			},
			{
				path: "profile",
				element: (
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				),
			},
			{
				path: "control",
				element: (
					<AdminRoute>
						<Control />
					</AdminRoute>
				),
			},
			{
				path: "users",
				element: (
					<AdminRoute>
						<Users />
					</AdminRoute>
				),
			},
			{
				path: "transactions",
				element: (
					<AdminRoute>
						<Transactions />
					</AdminRoute>
				),
			},
			{
				path: "manage-emails",
				element: (
					<AdminRoute>
						<ManageEmails />
					</AdminRoute>
				),
			},
			{
				path: "login",
				element: <Login />,
				errorElement: <Error />,
				action: loginAction,
			},
			{
				path: "register",
				element: <Register />,
				errorElement: <Error />,
				action: registerAction,
			},
			{
				path: "register/verify",
				element: <VerifyOtp />,
				errorElement: <Error />,
			},
		],
	},
]);

function App() {
	const { role } = useContext(AuthContext);
	const isAdmin = role === Role.ADMIN;

	return (
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<RegisterProvider>
					<RouterProvider router={router} />
				</RegisterProvider>
			</AuthContextProvider>
		</QueryClientProvider>
	);
}

export default App;
