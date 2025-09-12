import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { HidePasswordIcon, ShowPasswordIcon } from "../utils/iconFunc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //login via email and password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
  };

  // // login via google
  // const loginWithGoogle = async () => {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo: "http://localhost:5173/dashboard",
  //     },
  //   });

  //   if (error) {
  //     console.error("Google login error:", error.message);
  //   } else {
  //     console.log("Google login started:", data);
  //   }
  // };

  // // Function for GitHub login
  // const loginWithGitHub = async () => {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: "github",
  //     options: {
  //       redirectTo: "http://localhost:5173/dashboard",
  //     },
  //   });

  //   if (error) {
  //     console.error("GitHub login error:", error.message);
  //   } else {
  //     console.log("GitHub login started:", data);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 to-stone-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-stone-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-stone-400 mb-8">
              Sign in to continue managing your finances
            </p>
          </div>

          <form className="space-y-6">
            {/* Email/Username Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faEnvelope} className="text-stone-400" />
              </div>
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or Username"
                className="w-full pl-10 pr-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="text-stone-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3  bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span
                onClick={() => setShowPassword((s) => !s)}
                className="cursor-pointer absolute md:top-2 top-3 right-2"
              >
                {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
              </span>
            </div>
            {loginError !== "" && (
              <p className="text-red-600 text-lg text-center">
                Wrong Password Or Email
              </p>
            )}
            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <NavLink
                  to="/forgot-password"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </NavLink>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Signing In" : "Sign In"}
              {!loading && (
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              )}
            </button>
            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-stone-600"></div>
              <span className="flex-shrink mx-4 text-stone-400 text-sm">
                or continue with
              </span>
              <div className="flex-grow border-t border-stone-600"></div>
            </div>
            Social Login Options
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="py-2 px-4 flex justify-center items-center bg-stone-700 hover:bg-stone-600 text-white rounded-lg transition-colors"
                // onClick={}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </button>
              <button
                type="button"
                className="py-2 px-4 flex justify-center items-center bg-stone-700 hover:bg-stone-600 text-white rounded-lg transition-colors"
                // onClick={}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307c-1.44-1.44-3.28-2.28-5.854-2.28-5.893 0-10.68 4.827-10.68 10.68s4.787 10.68 10.68 10.68c5.867 0 9.067-3.84 9.067-9.067 0-1.427-.307-2.467-.84-3.36h-8.227z" />
                </svg>
                Google
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-stone-400">
              Don't have an account?{" "}
              <NavLink
                to="/signup"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
                Sign up here
              </NavLink>
            </p>
          </div>
        </div>

        {/* Decorative Footer */}
        <div className="bg-stone-700 px-8 py-4">
          <p className="text-xs text-stone-400 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
