import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile && isMobileOpen) {
        setIsMobileOpen(false);
      }

      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileOpen]);

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
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-lg bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <FontAwesomeIcon icon={isMobileOpen ? faTimes : faBars} />
      </button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      <div
        className={`fixed md:relative top-0 left-0 bg-white shadow-xl border-r border-gray-200 z-40 transition-all duration-300 flex flex-col dashboard-sidebar ios-fix-h-screen
          ${isOpen ? "w-64" : "w-16"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isMobile ? "!w-64 h-full" : "h-screen"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          {(isOpen || isMobileOpen || isMobile) && (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mr-2">
                <FontAwesomeIcon icon={faHome} className="text-white text-sm" />
              </div>
              <h1 className="text-gray-900 font-bold text-xl">FinancyBuddy</h1>
            </div>
          )}
          {!isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-all"
            >
              <FontAwesomeIcon icon={isOpen ? faChevronLeft : faChevronRight} />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-all duration-300
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border border-blue-200 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                  onClick={() => setIsMobileOpen(false)}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  {(isOpen || isMobileOpen || isMobile) && (
                    <span className="ml-3 truncate">{item.label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-2 border-t border-gray-200 flex-shrink-0 sidebar-footer">
          <NavLink
            to="/user-profile"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-all duration-300 mb-1
              ${
                isActive
                  ? "bg-blue-50 text-blue-600 border border-blue-200 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
            onClick={() => setIsMobileOpen(false)}
          >
            <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
            {(isOpen || isMobileOpen || isMobile) && (
              <span className="ml-3">Profile</span>
            )}
          </NavLink>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center p-3 rounded-lg bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
            {(isOpen || isMobileOpen || isMobile) && (
              <span className="ml-3">Sign Out</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
