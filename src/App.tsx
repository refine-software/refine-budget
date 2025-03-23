import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./pages/Root";
import Error from "./pages/Error";
import Home from "./pages/Home";
import { authLoader, checkAuthLoader } from "./api/auth";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: authLoader,
    id: "root",
    children: [
      {
        index: true,
        element: <Home />,
        loader: checkAuthLoader,
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <Error />,
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
