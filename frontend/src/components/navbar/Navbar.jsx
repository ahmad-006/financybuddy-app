import { useState } from "react";
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

  return (
    <nav className="sticky top-0 py-3 flex justify-between px-5 lg:px-16 items-center bg-gradient-to-r from-stone-800 to-stone-900 shadow-lg z-50">
      {/* Logo */}
      <NavLink to={"/"} className="flex items-center group">
        <Logo />
      </NavLink>

      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-6 text-white">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-stone-700 ${
                isActive ? "text-blue-400 bg-stone-700 font-semibold" : ""
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
              `flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-stone-700 ${
                isActive ? "text-blue-400 bg-stone-700 font-semibold" : ""
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
              `flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-stone-700 ${
                isActive ? "text-blue-400 bg-stone-700 font-semibold" : ""
              }`
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            About
          </NavLink>
        </li>
      </ul>

      {/* Login button for desktop */}
      <div className="hidden md:flex">
        <NavLink
          to="/login"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Login
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </NavLink>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-2xl text-white p-2 rounded-lg hover:bg-stone-700 transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>

      {/* Mobile dropdown with overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-70"
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* Slide-in menu */}
        <div
          className={`absolute top-0 right-0 h-full w-3/4 max-w-xs bg-stone-800 shadow-2xl transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-6 border-b border-stone-700">
            <div className="flex items-center">
              <Logo />
            </div>
          </div>

          <ul className="p-6 space-y-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg text-white transition-all duration-300 hover:bg-stone-700 ${
                    isActive ? "text-blue-400 bg-stone-700 font-semibold" : ""
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faHome} className="mr-3" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/price"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg text-white transition-all duration-300 hover:bg-stone-700 ${
                    isActive ? "text-blue-400 bg-stone-700 font-semibold" : ""
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faTags} className="mr-3" />
                Prices
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg text-white transition-all duration-300 hover:bg-stone-700 ${
                    isActive ? "text-blue-400 bg-stone-700 font-semibold" : ""
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-3" />
                About
              </NavLink>
            </li>
            <li className="pt-4 border-t border-stone-700">
              <NavLink
                to="/login"
                className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 mt-4"
                onClick={() => setMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
