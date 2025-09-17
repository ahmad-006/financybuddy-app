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
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-700 text-lg">Verifying your session...</p>
      </div>
    );
  }

  if (!isVerified) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}
