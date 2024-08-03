import { createBrowserRouter } from "react-router-dom";
import Root from "./Layout/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);
