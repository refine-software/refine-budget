import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./pages/Root";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { loginAction } from "./pages/actions";
import { authGuardLoader } from "./pages/loaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    id: "root",
    children: [
      {
        index: true,
        element: <Home />,
        loader: authGuardLoader,
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
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
