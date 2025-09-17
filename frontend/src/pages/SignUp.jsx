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

  // New state for OTP flow
  const [currentStep, setCurrentStep] = useState("signup"); // 'signup' or 'otp'
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

  // OTP Verification Form
  if (currentStep === "otp") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-900 to-stone-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-stone-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="text-blue-400 text-5xl mb-4"
              />
              <h2 className="text-3xl font-bold text-white mb-2">
                Verify Your Email
              </h2>
              <p className="text-stone-400 mb-4">
                We've sent a verification code to
              </p>
              <p className="text-blue-400 font-semibold mb-6">{userEmail}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmitOTP)} className="space-y-6">
              {signUpError && (
                <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg">
                  <p className="text-red-400 text-sm">{signUpError}</p>
                </div>
              )}

              {/* OTP Input Field */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="text-stone-400"
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
                    className="w-full pl-10 pr-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-xl tracking-widest"
                  />
                </div>
                {errors.otp && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.otp.message}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out disabled:opacity-50"
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
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="text-stone-400 hover:text-stone-300 text-sm font-medium transition-colors duration-300"
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

  // Original SignUp Form (rendered by default)
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

          <form onSubmit={handleSubmit(onSubmitSignUp)} className="space-y-4">
            {signUpError && (
              <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg">
                <p className="text-red-400 text-sm">{signUpError}</p>
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
                  className="w-full pl-10 pr-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.lastName.message}
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
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    // pattern: {
                    //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    //   message:
                    //     "Must contain at least 1 uppercase, 1 lowercase, and 1 number",
                    // },
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 mt-6 disabled:opacity-50"
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
