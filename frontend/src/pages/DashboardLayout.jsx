import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const mainContentRef = useRef(null);

  useEffect(() => {
    // to scroll to top when route changes
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
    
    // Add dashboard-active class to prevent body scroll
    document.body.classList.add("dashboard-active");
    document.documentElement.classList.add("dashboard-active");
    document.getElementById("root").classList.add("dashboard-active");

    // Cleanup when leaving dashboard
    return () => {
      document.body.classList.remove("dashboard-active");
      document.documentElement.classList.remove("dashboard-active");
      document.getElementById("root").classList.remove("dashboard-active");
    };
  }, [pathname]);

  return (
    <div className="dashboard-layout flex bg-stone-900 text-white">
      <DashboardSidebar />
      <main
        ref={mainContentRef}
        className="flex-1 overflow-y-auto bg-stone-900"
      >
        <Outlet />
      </main>
    </div>
  );
}
