import { Outlet, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Layout from "./Layout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import IsLoggedIn from "./loaders/IsLoggedIn";
import ReportPage from "../pages/ReportPage/ReportPage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Outlet />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "report",
        element: <ReportPage />,
      },
    ],
  },
  {
    //protected routes
    path: "/",
    loader: IsLoggedIn,
    children: [{}],
  },
]);

export default router;
