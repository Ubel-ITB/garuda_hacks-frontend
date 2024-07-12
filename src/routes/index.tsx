import { Outlet, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Layout from "./Layout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import IsLoggedIn from "./loaders/IsLoggedIn";
import ReportPage from "../pages/ReportPage/ReportPage";
import NewsPage from "../pages/NewsPage/NewsPage";
import { CurrentUserProvider } from "../lib/contexts/CurrentUserContext";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <CurrentUserProvider>
        <Outlet />
      </CurrentUserProvider>
    ),
    children: [
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
          {
            path: "news",
            element: <NewsPage />,
          },
        ],
      },
      {
        //protected routes
        path: "/",
        loader: IsLoggedIn,
        element: <Layout />,
        children: [
          {
            path: "profile/:username",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
