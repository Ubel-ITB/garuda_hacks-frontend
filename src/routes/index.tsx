import { Outlet, createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Layout from "./Layout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import IsLoggedIn from "./loaders/IsLoggedIn";
import NewsPage from "../pages/NewsPage/NewsPage";
import { CurrentUserProvider } from "../lib/contexts/CurrentUserContext";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ReportPageCreate from "../pages/ReportPage/ReportPageCreate";
import ReportPage from "../pages/ReportPage/ReportPage";
import CreateNewsPage from "../pages/NewsPage/CreateNewsPage.tsx/CreateNewsPage";
import ProfilePageEdit from "../pages/ProfilePage/ProfileEdit";
import DetailsPage from "../pages/NewsPage/DetailsPage/DetailsPage";
import AllNewsPage from "../pages/NewsPage/AllNewsPage.tsx/AllNewsPage";

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
            path: "sign-in",
            element: <LoginPage />,
          },
          {
            path: "sign-up",
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
            path: "reports",
            element: <ReportPage />,
          },
          {
            path: "news",
            element: <NewsPage />,
          },
          {
            path: "news/:postId",
            element: <DetailsPage />,
          },
          {
            path: "news/all-news",
            element: <AllNewsPage />,
          },
        ],
      },
      {
        path: "/create",
        element: <Outlet />,
        children: [
          {
            path: "news",
            element: <CreateNewsPage />,
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
            path: "profile",
            loader: () => {
              return redirect("/");
            },
          },
          {
            path: "profile/:username",
            element: <ProfilePage />,
          },
          {
            path: "reports/create",
            element: <ReportPageCreate />,
          },
          {
            path: "profile/:username/edit",
            element: <ProfilePageEdit />,
          },
        ],
      },
    ],
  },
]);

export default router;
