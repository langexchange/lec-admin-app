import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="login" element={<LoginPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Route>
  )
);

export default router;
