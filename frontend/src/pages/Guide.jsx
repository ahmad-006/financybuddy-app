import { useNavigate } from "react-router-dom";

export default function Guide() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-16">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-400">
          How FinancyBuddy Works
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Take control of your finances with our simple, manual expense tracking
          approach. No bank connections needed - just straightforward money
          management.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold text-white transition shadow-md"
        >
          Start Tracking Today
        </button>
      </div>

      {/* Steps Section */}
      <div className="max-w-5xl mx-auto mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-12 md:space-y-0">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center w-full md:w-1/3 px-4">
            <div className="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center mb-6 text-2xl font-bold text-blue-400 border-2 border-blue-500">
              1
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">
              Sign Up & Set Up
            </h3>
            <p className="text-gray-300">
              Create your free account in seconds. Set up your spending
              categories and initial budget.
            </p>
          </div>

          {/* Connector Line */}
          <div className="hidden md:flex items-center justify-center w-1/3 relative">
            <div className="absolute h-1 w-full bg-blue-800"></div>
            <div className="absolute w-4 h-4 rounded-full bg-blue-500 left-1/2 transform -translate-x-1/2"></div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center w-full md:w-1/3 px-4">
            <div className="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center mb-6 text-2xl font-bold text-blue-400 border-2 border-blue-500">
              2
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">
              Log Your Expenses
            </h3>
            <p className="text-gray-300">
              Quickly add transactions as you spend. Our simple form makes it
              easy to record purchases.
            </p>
          </div>

          {/* Connector Line */}
          <div className="hidden md:flex items-center justify-center w-1/3 relative">
            <div className="absolute h-1 w-full bg-blue-800"></div>
            <div className="absolute w-4 h-4 rounded-full bg-blue-500 left-1/2 transform -translate-x-1/2"></div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center w-full md:w-1/3 px-4">
            <div className="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center mb-6 text-2xl font-bold text-blue-400 border-2 border-blue-500">
              3
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">
              Track & Analyze
            </h3>
            <p className="text-gray-300">
              View your spending patterns, see category breakdowns, and stay on
              budget with visual reports.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
          Why Manual Tracking Works Better
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-900 flex items-center justify-center mr-4 text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Complete Privacy</h3>
            </div>
            <p className="text-gray-300">
              Your financial data never leaves our secure servers. No bank
              connections means maximum privacy.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-900 flex items-center justify-center mr-4 text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Mindful Spending</h3>
            </div>
            <p className="text-gray-300">
              Manually entering expenses increases awareness of your spending
              habits and helps you make better choices.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-900 flex items-center justify-center mr-4 text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 14v6m-3-3h6M6 10h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-4a2 2 0 11-4 0 2 2 0 014 0zM6 20a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Flexible Categories</h3>
            </div>
            <p className="text-gray-300">
              Create custom spending categories that match your lifestyle. No
              predefined categories to limit you.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-900 flex items-center justify-center mr-4 text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">No Bank Access Needed</h3>
            </div>
            <p className="text-gray-300">
              Use FinancyBuddy anywhere, anytime without needing to connect to
              your bank accounts.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Is my financial data secure?
            </h3>
            <p className="text-gray-400">
              Absolutely. We use industry-standard encryption to protect your
              data, and we never share it with third parties.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              How often should I log my expenses?
            </h3>
            <p className="text-gray-400">
              We recommend logging expenses daily for the most accurate
              tracking, but even weekly updates will help you stay on budget.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Can I access my data on multiple devices?
            </h3>
            <p className="text-gray-400">
              Yes, your data syncs across all your devices. Just log in to
              access your financial information anywhere.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Is there a mobile app?
            </h3>
            <p className="text-gray-400">
              Our web app works perfectly on mobile browsers. You can add it to
              your home screen for easy access.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-3xl mx-auto text-center bg-gray-800 p-8 rounded-2xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Ready to Take Control of Your Finances?
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          Join the community of mindful spenders who are achieving their
          financial goals with FinancyBuddy.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold text-white transition shadow-md"
        >
          Start Tracking For Free
        </button>
        <p className="text-gray-400 mt-4">
          No payment required • No bank connections needed
        </p>
      </div>
    </div>
  );
}
