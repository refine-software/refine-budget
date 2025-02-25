import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./pages/Root";
import Error from "./pages/Error";
import Home from "./pages/Home";

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
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
