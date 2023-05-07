import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import UsersPage from "./pages/UsersPage";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                path: "settings",
                element: <SettingsPage />,
              },
              {
                path: "users",
                element: <UsersPage />,
              },
              {
                path: "admins",
                element: <AdminPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
