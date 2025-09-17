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
    setApiError(null); // Clear previous API errors
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
    <div className="min-h-screen bg-gradient-to-br from-stone-900 to-stone-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-stone-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Reset Your Password
            </h2>
            <p className="text-stone-400 mb-8">
              Enter your new password below.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {apiError && (
              <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg">
                <p className="text-red-400 text-sm text-center">{apiError}</p>
              </div>
            )}
            {successMessage && (
              <div className="p-3 bg-green-900/30 border border-green-700 rounded-lg">
                <p className="text-green-400 text-sm text-center">
                  {successMessage}
                </p>
              </div>
            )}
            <div className="space-y-2">
              <div className="text-sm font-medium text-white">New Password</div>
              <input
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="w-full pl-4 pr-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-white">
                Confirm New Password
              </div>
              <input
                type="password"
                {...register("confirmNewPassword", {
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                className="w-full pl-4 pr-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-50"
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
