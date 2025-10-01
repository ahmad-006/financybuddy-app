import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHome,
  faTags,
  faInfoCircle,
  faUser,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 py-4 flex justify-between px-5 lg:px-16 items-center bg-white shadow-sm border-b border-gray-100 z-50">
        <NavLink to={"/"} className="flex items-center group">
          <Logo />
        </NavLink>

        <ul className="hidden md:flex space-x-2 text-gray-700">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 ${
                  isActive ? "text-blue-600 bg-blue-50 font-semibold" : ""
                }`
              }
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/guide"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 ${
                  isActive ? "text-blue-600 bg-blue-50 font-semibold" : ""
                }`
              }
            >
              <FontAwesomeIcon icon={faTags} className="mr-2" />
              Guide
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 ${
                  isActive ? "text-blue-600 bg-blue-50 font-semibold" : ""
                }`
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
              About
            </NavLink>
          </li>
        </ul>

        <div className="hidden md:flex">
          <NavLink
            to="/login"
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Login
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </NavLink>
        </div>

        <button
          className="md:hidden text-xl text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-70"
            onClick={closeMenu}
          ></div>

          {/* Slide-in Menu */}
          <div
            className={`absolute top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-2xl transform transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Logo />
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>

            {/* Navigation Links */}
            <ul className="p-6 space-y-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 ${
                      isActive ? "text-blue-600 bg-blue-50 font-semibold" : ""
                    }`
                  }
                  onClick={closeMenu}
                >
                  <FontAwesomeIcon icon={faHome} className="mr-3" />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/guide"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 ${
                      isActive ? "text-blue-600 bg-blue-50 font-semibold" : ""
                    }`
                  }
                  onClick={closeMenu}
                >
                  <FontAwesomeIcon icon={faTags} className="mr-3" />
                  Guide
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 ${
                      isActive ? "text-blue-600 bg-blue-50 font-semibold" : ""
                    }`
                  }
                  onClick={closeMenu}
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-3" />
                  About
                </NavLink>
              </li>
              <li className="pt-4 border-t border-gray-200">
                <NavLink
                  to="/login"
                  className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 mt-4 shadow-lg"
                  onClick={closeMenu}
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="h-20"></div>
    </>
  );
}

export default Navbar;
