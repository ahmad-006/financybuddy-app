import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faReceipt,
  faChartPie,
  faChartLine,
  faUser,
  faSignOutAlt,
  faBars,
  faTimes,
  faChevronLeft,
  faChevronRight,
  faRepeat,
  faCalendarAlt,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "@/utils/fetchData";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await logoutUser();
      if (res.status !== "success") throw new Error(res.message);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  const menuItems = [
    { path: "/dashboard", icon: faHome, label: "Dashboard" },
    { path: "/transactions", icon: faReceipt, label: "Transactions" },
    { path: "/recurring-transactions", icon: faRepeat, label: "Recurring" },
    { path: "/budgets", icon: faChartPie, label: "Budgets" },
    { path: "/special-budgets", icon: faCalendarAlt, label: "Special Budgets" },
    { path: "/savings", icon: faDollarSign, label: "Savings" },
    { path: "/report", icon: faChartLine, label: "Report" },
  ];

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <FontAwesomeIcon icon={isMobileOpen ? faTimes : faBars} />
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 bg-stone-800 shadow-lg z-40 transition-all duration-300 flex flex-col
          ${isOpen ? "w-64" : "w-20"} 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-stone-700 flex-shrink-0">
          {(isOpen || isMobileOpen) && (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center mr-2">
                <FontAwesomeIcon icon={faHome} className="text-white" />
              </div>
              <h1 className="text-white font-bold text-xl">FinancyBuddy</h1>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-full hover:bg-stone-700 text-stone-400 hidden md:inline-block"
          >
            <FontAwesomeIcon icon={isOpen ? faChevronLeft : faChevronRight} />
          </button>
        </div>

        {/* Main navigation */}
        <nav className="mt-6 flex-1 min-h-0 overflow-y-auto">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg transition-colors
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-stone-300 hover:bg-stone-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileOpen(false)}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  {(isOpen || isMobileOpen) && <span className="ml-3">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User profile and sign out */}
        <div className="p-3 border-t border-stone-700 flex-shrink-0">
          <NavLink
            to="/user-profile"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg transition-colors mb-2
              ${
                isActive
                  ? "bg-stone-700 text-white"
                  : "text-stone-300 hover:bg-stone-700 hover:text-white"
              }`
            }
            onClick={() => setIsMobileOpen(false)}
          >
            <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
            {(isOpen || isMobileOpen) && <span className="ml-3">Profile</span>}
          </NavLink>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center p-2 rounded-lg bg-stone-700 hover:bg-red-600 text-white transition-colors"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
            {(isOpen || isMobileOpen) && <span className="ml-3">Sign Out</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
