import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

export const ProtectedRoute = ({ children }) => {
  const {token} = useAuth();

  if (!token) {
    // user is not authenticated
    return <Navigate to="/unauthorized" />;
  }
  return <Outlet />;
};

export default ProtectedRoute