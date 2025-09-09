import { useNavigate } from "react-router-dom";

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-16">
      {/* Heading */}
      <div className="text-center mb-12 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400">
          Choose Your Plan
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Select the perfect plan for your financial needs. Start with our free
          plan and upgrade when you're ready.
        </p>
      </div>
      {/* Pricing Cards Container */}
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 max-w-6xl w-full justify-center items-center md:items-stretch">
        {/* Free Plan */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col transform transition-transform duration-300 hover:scale-105">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Free Plan</h2>
            <p className="text-gray-400">Perfect for getting started</p>
          </div>
          <div className="mb-8">
            <p className="text-4xl font-bold">
              $0 <span className="text-lg">/forever</span>
            </p>
            <p className="text-gray-400 mt-2">No credit card required</p>
          </div>
          <ul className="mb-8 text-left space-y-3 text-gray-300 flex-grow">
            <li>✔ Track up to 3 accounts</li>
            <li>✔ Basic expense tracking</li>
            <li>✔ Monthly spending overview</li>
            <li>✔ Get reports in PDF</li>
            <li className="text-gray-500">✖ Budget alerts</li>
            <li className="text-gray-500">✖ Export capabilities</li>
            <li className="text-gray-500">✖ Investment tracking</li>
          </ul>
          <button
            onClick={() => navigate("/signup?plan=free")}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold text-white transition shadow-md"
          >
            Get Started for Free
          </button>
        </div>

        {/* Monthly Plan */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col transform transition-transform duration-300 hover:scale-105 border-2 border-blue-500 relative">
          <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-bold rounded-bl-xl rounded-tr-xl">
            POPULAR
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Monthly Plan</h2>
            <p className="text-blue-200">Full access, cancel anytime</p>
          </div>
          <div className="mb-8">
            <p className="text-4xl font-bold">
              $9 <span className="text-lg">/month</span>
            </p>
            <p className="text-blue-200 mt-2">Billed monthly</p>
          </div>
          <ul className="mb-8 text-left space-y-3 text-blue-100 flex-grow">
            <li>✔ Everything in Free</li>
            <li>✔ Track unlimited accounts</li>
            <li>✔ Advanced expense categorization</li>
            <li>✔ Weekly spending reports</li>
            <li>✔ Budget alerts & notifications</li>
            <li>✔ Export to CSV/PDF</li>
            <li>✔ Priority email support</li>
          </ul>
          <button
            onClick={() => navigate("/signup?plan=monthly")}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold text-white transition shadow-md"
          >
            Get Started
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col transform transition-transform duration-300 hover:scale-105">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Yearly Plan</h2>
            <p className="text-gray-400">Best value for long-term users</p>
          </div>
          <div className="mb-8">
            <div className="flex items-baseline justify-center">
              <p className="text-4xl font-bold">
                $6.30 <span className="text-lg">/month</span>
              </p>
              <span className="ml-3 text-sm line-through text-gray-400">
                $9/mo
              </span>
            </div>
            <p className="text-gray-400 mt-2">Billed annually ($75.60)</p>
            <div className="mt-2 bg-green-900 text-green-200 text-sm font-medium py-1 px-3 rounded-full inline-block">
              Save 30%
            </div>
          </div>
          <ul className="mb-8 text-left space-y-3 text-gray-300 flex-grow">
            <li>✔ Everything in Free</li>
            <li>✔ Track unlimited accounts</li>
            <li>✔ Advanced expense categorization</li>
            <li>✔ Weekly spending reports</li>

            <li>✔ Export to CSV/PDF</li>
            <li>✔ Save 30% compared to monthly</li>
          </ul>
          <button
            onClick={() => navigate("/signup?plan=yearly")}
            className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl font-semibold text-white transition shadow-md"
          >
            Save 30% Annually
          </button>
        </div>
      </div>
      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-300 mb-10">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Can I switch between plans?
            </h3>
            <p className="text-gray-400">
              Yes, you can upgrade, downgrade, or cancel your plan at any time.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Is there a free trial?
            </h3>
            <p className="text-gray-400">
              The Free plan is always free. You can always avail it for free.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-400">
              We accept MaterCard and Visa, Credit Cards and Debit Cards.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              How secure is my financial data?
            </h3>
            <p className="text-gray-400">
              We use bank-level 256-bit encryption and never store your banking
              credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
