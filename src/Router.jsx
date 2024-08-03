import { createBrowserRouter } from "react-router-dom";
import Root from "./Layout/Root";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  // {
  //   path: "/signup",
  //   element: <Login />,
  // },
]);
