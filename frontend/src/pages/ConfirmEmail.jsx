import { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { supabase } from "../supabase-client/supabase-client";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function ConfirmEmail() {
  let [searchParams, faEnvelope, faEnvelopeOpenText] = useSearchParams();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const email = searchParams.get("email");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setErrorMessage("Invalid or missing confirmation token.");
      setHasError(true);
      return;
    }

    const confirmEmail = async () => {
      const { error: confirmError } = await supabase.auth.verifyOtp({
        type: "signup",
        token,
        email,
      });

      if (confirmError) {
        setErrorMessage(confirmError.message);
        setHasError(true);
      } else {
        setHasError(false);
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    };

    setTimeout(confirmEmail, 1000);

    return clearTimeout(confirmEmail);
  }, [searchParams, navigate, email]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 to-stone-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-stone-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faEnvelopeOpenText}
                  className="text-white text-2xl"
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">
              Confirm Your Email
            </h2>
            <p className="text-stone-400 mb-6">
              We've sent a confirmation email to:
            </p>

            <div>
              {hasError ? (
                <p className="text-xl text-red-700 text-center">
                  {errorMessage}
                </p>
              ) : (
                <p className="text-xl text-green-700 text-center">
                  Wait Please Confirming
                </p>
              )}
            </div>
            <div className="bg-stone-700 rounded-lg py-3 px-4 mb-6">
              <div className="flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-blue-400 mr-2"
                />
                <span className="text-white font-medium">{email}</span>
              </div>
            </div>

            <p className="text-stone-400 text-sm mb-8">
              Please check your inbox and click the confirmation link to verify
              your email address.
            </p>
          </div>

          <div className="space-y-4">
            {/* Login Button */}
            <NavLink
              to="/login"
              className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Already Confirmed? Login
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </NavLink>

            {/* Resend Email Button */}
            {/* <button
              onClick={handleResendEmail}
              className="w-full flex items-center justify-center py-3 px-4 bg-stone-700 hover:bg-stone-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
              disabled={emailResent}
            >
              <FontAwesomeIcon
                icon={!emailResent ? faRedoAlt : faCheckCircle}
                className="mr-2"
              />
              {!emailResent ? "Resend Confirmation Email" : "Resent"}
            </button> */}
          </div>

          {/* Success Message */}
          {/* {emailResent && (
            <div className="mt-6 p-3 bg-green-900 bg-opacity-30 border border-green-800 rounded-lg flex items-center">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-400 mr-2"
              />
              <span className="text-green-400 text-sm">
                Confirmation email sent successfully!
              </span>
            </div>
          )} */}
        </div>

        {/* Decorative Footer */}
        <div className="bg-stone-700 px-8 py-4">
          <p className="text-xs text-stone-400 text-center">
            Need help? Contact our support team at support@fintrack.com
          </p>
        </div>
      </div>
    </div>
  );
}
