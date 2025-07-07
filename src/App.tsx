import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loginAction, registerAction } from "./pages/actions";
import { RegisterProvider } from "./store/RegisterContextProvider";
import Root from "./pages/Root";
import Error from "./pages/Error";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/protection/ProtectedRoute";
import AuthContextProvider from "./store/AuthContextProvider";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Control from "./pages/admin/Control";
import AdminRoute from "./pages/protection/AdminRoute";
import Users from "./pages/admin/Users";
import Transactions from "./pages/admin/Transactions";
import ManageEmails from "./pages/admin/ManageEmails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";
import ResetPasswordConfirm from "./pages/auth/ResetPasswordConfirm";
import TransactionDetails from "./pages/TransactionDetails";
import TransactionCards from "./components/history/TransactionCards";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			staleTime: 1000 * 60 * 5,
		}
	}
});

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
				children: [
					{
						index: true,
						element: <TransactionCards />,
					},
					{
						path: ":id",
						element: <TransactionDetails />,
					},
				]
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
			{
				path: "reset-password",
				element: <ResetPassword />,
				children: [
					{
						path: "confirm",
						element: <ResetPasswordConfirm />,
					}
				]
			}
		],
	},
]);

function App() {
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
