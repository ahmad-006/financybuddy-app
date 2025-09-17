import { verifyUser } from "@/utils/fetchData";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await verifyUser();
      setIsVerified(result);
    };
    checkAuth();
  }, []);

  // Still checking
  if (isVerified === null) {
    return <div>Loading...</div>;
  }

  if (!isVerified) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}
