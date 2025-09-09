import { Navigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faIdCard,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { supabase } from "../supabase-client/supabase-client";
import { useEffect, useState } from "react";
import { HidePasswordIcon, ShowPasswordIcon } from "../utils/iconFunc";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // const navigate = useNavigate();
  const [SignUpError, setSignUpError] = useState("");
  const [isCreatingAccount, setisCreatingAccount] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [users, setUsers] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const password = watch("password");

  useEffect(() => {
    const check = async () => {
      const { data, error } = await supabase.rpc("get_users_by_status");
      if (!error) {
        console.log(data);
        setUsers(data);
        return;
      }
      console.log(error);
    };
    check();
  }, []);
  const onSubmit = async (info) => {
    setisCreatingAccount(true);
    setIsCreated(false);
    setSignUpError("");

    const { username, email, password, firstName, lastName } = info;
    const isAlreadyRegistered = users.some((user) => user.email === email);
    if (isAlreadyRegistered) {
      setSignUpError("Email is already registered");
      setisCreatingAccount(false);
      return;
    }

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, first_name: firstName, last_name: lastName }, // 👈 store username in user_metadata
      },
    });

    if (authError) {
      console.error("Signup error:", authError.message);
      setSignUpError(authError);
      alert(authError.message);
      setisCreatingAccount(false);
      return;
    }

    setisCreatingAccount(false);
    setIsCreated(true);

    // Reset the success message after 5 seconds
    setTimeout(() => {
      setIsCreated(false);
    }, 5000);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 to-stone-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-stone-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-stone-400 mb-8">
              Join us to manage your finances better
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {isCreated && (
              <div>
                <p className="text-xl font-bold font-opensans text-green-700">
                  Account Created check your email for confirmation
                </p>
              </div>
            )}
            {SignUpError !== "" && (
              <div>
                <p className="text-xl font-bold font-opensans text-red-700">
                  {SignUpError}
                </p>
              </div>
            )}
            {/* First Name Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faIdCard} className="text-stone-400" />
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  {...register("firstName", {
                    required: "First name is required",

                    //* MaxLength
                    maxLength: {
                      value: 15,
                      message: "First name must not exceed 15 characters",
                    },

                    //* check Pattern
                    pattern: {
                      value: /^\S+$/,
                      message: "Spaces are not allowed",
                    },
                  })}
                  type="text"
                  placeholder="First Name"
                  className="w-full pl-10 pr-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faIdCard} className="text-stone-400" />
                </div>
                <input
                  id="lastName"
                  name="lastName"
                  {...register("lastName", {
                    required: "Last name is required",

                    //* MaxLength
                    maxLength: {
                      value: 15,
                      message: "Last name must not exceed 15 characters",
                    },

                    //* Check Pattern
                    pattern: {
                      value: /^\S+$/,
                      message: "Spaces are not allowed",
                    },
                  })}
                  type="text"
                  placeholder="Last Name"
                  className="w-full pl-10 pr-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Username Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faUser} className="text-stone-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  {...register("username", {
                    required: "Username is required",

                    //* MaxLength
                    maxLength: {
                      value: 15,
                      message: "Username cannot exceed 15 characters",
                    },

                    //* Check Pattern
                    pattern: {
                      value: /^[a-z0-9._]+$/,
                      message:
                        "Only lowercase letters, numbers, periods, and underscores are allowed",
                    },
                  })}
                  type="text"
                  placeholder="Username"
                  className="w-full pl-10 pr-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-stone-400"
                  />
                </div>
                <input
                  id="email"
                  name="email"
                  {...register("email", {
                    required: "Email is required",

                    //* Check Pattern
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-stone-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  {...register("password", {
                    required: "Password is required",

                    //* minLength
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    //* Check Pattern
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                      message:
                        "Must contain at least 1 uppercase, 1 lowercase, and 1 number",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span
                  onClick={() => setShowPassword((s) => !s)}
                  className="cursor-pointer absolute md:top-2 top-3 right-2"
                >
                  {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
                </span>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-stone-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span
                  onClick={() => setShowPassword((s) => !s)}
                  className="cursor-pointer absolute md:top-2 top-3 right-2"
                >
                  {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            {!SignUpError && (
              <div>
                <p className="mt-1 text-sm text-red-400">{errors.message}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 mt-6"
              disabled={isCreatingAccount}
            >
              {isCreatingAccount ? "Creating..." : "Create Account"}
              {!isCreatingAccount && (
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-stone-400">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
              >
                Login here
              </NavLink>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-700 px-8 py-4">
          <p className="text-xs text-stone-400 text-center">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
