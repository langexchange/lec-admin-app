import { selectCredentials } from "./features/authSlice";
import { useAppSelector } from "./app/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes: React.FC = () => {
  const credentials = useAppSelector(selectCredentials);
  const location = useLocation();

  console.log("ProtectedRoutes", credentials);
  if (!credentials.token)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
