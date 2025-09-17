import { sendPasswordResetLink } from "@/utils/fetchData";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await sendPasswordResetLink(email);
    if (res.status === "success") {
      setSubmitted(true);
      setIsLoading(false);
      setError(null);
    } else {
      setError(res?.response?.data?.message || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 to-stone-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-stone-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          {submitted ? (
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Check Your Email</h2>
              <p className="text-stone-300">
                We have sent a password reset link to your email address.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Forgot Password
                </h2>
                <p className="text-stone-400 mb-8">
                  Enter your email address and we will send you a link to reset
                  your password.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    placeholder="Email Address"
                    required
                    className="w-full pl-4 pr-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {error && (
                  <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg mt-2">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  {isLoading ? "Sending..." : "Send Link"}
                </button>
              </form>
            </>
          )}
          <div className="mt-6 text-center">
            <p className="text-stone-400">
              Remember your password?{" "}
              <NavLink
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
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
