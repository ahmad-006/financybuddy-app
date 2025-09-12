import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import AIChat from "../components/homepage/ChatIcon";
import Footer from "@/components/homepage/Footer";
import ScrollToTop from "../components/ScrollToTop";

function AppLayout() {
  return (
    <div className="min-h-screen absolute bg-gray-900 ">
      <ScrollToTop />
      <Navbar />
      <div className="w-screen flex relative bottom-0 flex-col bg-gray-900 ">
        <Outlet />
      </div>
      <Footer />
      <AIChat />
    </div>
  );
}

export default AppLayout;
