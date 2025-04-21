import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loginAction } from "./pages/actions";
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
					<ProtectedRoute>
						<Control />
					</ProtectedRoute>
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
			},
		],
	},
]);

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<RouterProvider router={router} />
			</AuthContextProvider>
		</QueryClientProvider>
	);
}

export default App;
