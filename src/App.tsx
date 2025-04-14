import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./pages/Root";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { loginAction } from "./pages/actions";
import ProtectedRoute from "./pages/ProtectedRoute";
import AuthContextProvider from "./store/auth-context";

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
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	);
}

export default App;
