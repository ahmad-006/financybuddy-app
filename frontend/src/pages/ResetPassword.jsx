import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { resetForgotPassword } from "@/utils/fetchData";

export default function ResetPassword() {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const { newPassword } = data;
      const res = await resetForgotPassword(token, newPassword);

      if (res && res.message && !res.response) {
        setSuccessMessage(res.message || "Password reset successfully!");
        setApiError(null);
      } else if (
        res &&
        res.response &&
        res.response.data &&
        res.response.data.message
      ) {
        setApiError(res.response.data.message);
        setSuccessMessage(null);
      } else if (res && res.message) {
        setApiError(res.message);
        setSuccessMessage(null);
      } else {
        setApiError("Failed to reset password.");
        setSuccessMessage(null);
      }
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setApiError(error.response.data.message);
      } else if (error && error.message) {
        setApiError(error.message);
      } else {
        setApiError("Failed to reset password.");
      }
      setSuccessMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Reset Your Password
            </h2>
            <p className="text-gray-600">Enter your new password below.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {apiError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{apiError}</p>
              </div>
            )}
            {successMessage && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm text-center">
                  {successMessage}
                </p>
              </div>
            )}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">
                New Password
              </div>
              <input
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.newPassword && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">
                Confirm New Password
              </div>
              <input
                type="password"
                {...register("confirmNewPassword", {
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.confirmNewPassword && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
