import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../utils/lazyLoad";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <h1>register</h1>,
  },
]);

export default router;
