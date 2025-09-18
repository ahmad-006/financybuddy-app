import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const mainContentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Detect screen size changes
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

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
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  return (
    <div
      className={`dashboard-layout flex ${isMobile ? "flex-col mobile-view" : ""} bg-stone-900 text-white h-screen`}
    >
      <DashboardSidebar />
      <main
        ref={mainContentRef}
        className={`flex-1 overflow-y-auto bg-stone-900 main-content ${isMobile ? "h-full" : ""}`}
        style={isMobile ? { marginLeft: 0 } : {}}
      >
        <Outlet />
      </main>
    </div>
  );
}
