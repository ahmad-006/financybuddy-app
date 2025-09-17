import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faReceipt,
  faChartPie,
  faChartLine,
  
} from "@fortawesome/free-solid-svg-icons";

const BottomNavBar = () => {
  const menuItems = [
    { path: "/dashboard", icon: faHome, label: "Dashboard" },
    { path: "/transactions", icon: faReceipt, label: "Transactions" },
    { path: "/budgets", icon: faChartPie, label: "Budgets" },
    { path: "/report", icon: faChartLine, label: "Report" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-stone-800 shadow-lg md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full transition-colors
              ${
                isActive
                  ? "text-blue-500"
                  : "text-stone-400 hover:text-blue-500"
              }`
            }
          >
            <FontAwesomeIcon icon={item.icon} className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNavBar;
