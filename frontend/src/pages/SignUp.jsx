import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faIdCard,
  faArrowRight,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { HidePasswordIcon, ShowPasswordIcon } from "../utils/iconFunc";
import { registerUser, verifyOTP } from "@/utils/fetchData";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const otpInputRef = useRef(null);
  const [signUpError, setSignUpError] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState("signup");
  const [userEmail, setUserEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [userData, setUserData] = useState([]);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const password = watch("password");

  const onSubmitSignUp = async (dataForm) => {
    setIsCreatingAccount(true);
    setSignUpError("");

    try {
      const { firstName, lastName, email, password } = dataForm;
      const data = {
        name: firstName + " " + lastName,
        email,
        password,
      };

      setUserData(data);
      const res = await registerUser(data);
      if (res.status !== "success")
        throw new Error(
          res?.response?.data?.message || "Sign up failed please try again"
        );
      setUserEmail(email);
      setCurrentStep("otp");
    } catch (error) {
      setSignUpError(error.message || "Registration failed");
    } finally {
      setIsCreatingAccount(false);
    }
  };

  const onSubmitOTP = async (otpData) => {
    setIsVerifying(true);
    setSignUpError("");

    try {
      const { otp } = otpData;
      const res = await verifyOTP({
        otp: Number(otp.trim()),
        email: userEmail,
      });
      if (res.status === "fail") throw new Error(res);
      reset();
      navigate("/dashboard");
      setCurrentStep("signup");
    } catch (error) {
      setSignUpError(error.message || "OTP verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleBackToSignUp = () => {
    setCurrentStep("signup");
    setSignUpError("");
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);
    setSignUpError("");

    try {
      await registerUser(userData);
      setResendCooldown(60);
    } catch (error) {
      setSignUpError(error.message || "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  useEffect(() => {
    if (currentStep === "otp") {
      setValue("otp", "");
      otpInputRef.current?.focus();
    }
  }, [currentStep, setValue]);

  if (currentStep === "otp") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  className="text-white text-xl"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Verify Your Email
              </h2>
              <p className="text-gray-600 mb-4">
                We've sent a verification code to
              </p>
              <p className="text-blue-600 font-semibold mb-6">{userEmail}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmitOTP)} className="space-y-6">
              {signUpError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{signUpError}</p>
                </div>
              )}

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="text-gray-400"
                    />
                  </div>
                  <input
                    id="otp"
                    name="otp"
                    ref={otpInputRef}
                    {...register("otp", {
                      required: "Verification code is required",
                      pattern: {
                        value: /^\d{6}$/,
                        message: "Please enter a valid 6-digit code",
                      },
                    })}
                    type="text"
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-xl tracking-widest"
                  />
                </div>
                {errors.otp && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.otp.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50"
                  disabled={isVerifying}
                >
                  {isVerifying ? "Verifying..." : "Verify Code"}
                  {!isVerifying && (
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-300 disabled:opacity-50"
                  disabled={resendCooldown > 0 || isResending}
                >
                  {isResending
                    ? "Sending..."
                    : resendCooldown > 0
                      ? `Resend OTP in (${resendCooldown}s)`
                      : "Didn't receive the code? Resend"}
                </button>

                <button
                  type="button"
                  onClick={handleBackToSignUp}
                  className="text-gray-600 hover:text-gray-700 text-sm font-medium transition-colors duration-300"
                >
                  ← Back to sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faIdCard} className="text-white text-xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">
              Join us to manage your finances better
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmitSignUp)} className="space-y-4">
            {signUpError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{signUpError}</p>
              </div>
            )}

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faIdCard} className="text-gray-400" />
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  {...register("firstName", {
                    required: "First name is required",
                    maxLength: {
                      value: 15,
                      message: "First name must not exceed 15 characters",
                    },
                    pattern: {
                      value: /^\S+$/,
                      message: "Spaces are not allowed",
                    },
                  })}
                  type="text"
                  placeholder="First Name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faIdCard} className="text-gray-400" />
                </div>
                <input
                  id="lastName"
                  name="lastName"
                  {...register("lastName", {
                    required: "Last name is required",
                    maxLength: {
                      value: 15,
                      message: "Last name must not exceed 15 characters",
                    },
                    pattern: {
                      value: /^\S+$/,
                      message: "Spaces are not allowed",
                    },
                  })}
                  type="text"
                  placeholder="Last Name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-400"
                  />
                </div>
                <input
                  id="email"
                  name="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span
                  onClick={() => setShowPassword((s) => !s)}
                  className="cursor-pointer absolute top-3 right-3"
                >
                  {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
                </span>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span
                  onClick={() => setShowPassword((s) => !s)}
                  className="cursor-pointer absolute top-3 right-3"
                >
                  {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 mt-6 disabled:opacity-50"
              disabled={isCreatingAccount}
            >
              {isCreatingAccount ? "Creating..." : "Create Account"}
              {!isCreatingAccount && (
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Login here
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
