import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import AIChat from "../components/homepage/ChatIcon";
import Footer from "@/components/homepage/Footer";
import ScrollToTop from "../components/ScrollToTop";

function AppLayout() {
  const location = useLocation();
  const [showChat, setShowChat] = useState(false);

  const noChatAndFooterPaths = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/aichatbot",
  ];

  const shouldShowChatAndFooter = !noChatAndFooterPaths.includes(
    location.pathname
  );

  // Delay chat icon to allow animations to complete
  useEffect(() => {
    if (shouldShowChatAndFooter) {
      const timer = setTimeout(() => {
        setShowChat(true);
      }, 2000); // 2 second delay to allow homepage animations to complete

      return () => clearTimeout(timer);
    } else {
      setShowChat(false);
    }
  }, [shouldShowChatAndFooter, location.pathname]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <div className="w-full flex flex-col">
        <Outlet />
      </div>
      {shouldShowChatAndFooter && <Footer />}
      {showChat && <AIChat />}
    </div>
  );
}

export default AppLayout;
