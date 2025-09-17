import transactionSVG from "../../assets/images/home/transaction.svg";
import savingSVG from "../../assets/images/home/saving.svg";
import aiSVG from "../../assets/images/home/ai.svg";
import rtSVG from "../../assets/images/home/RT.svg";
import reportSVG from "../../assets/images/home/reports.svg";
import budgetSVG from "../../assets/images/home/budget.svg";

function Features() {
  return (
    <section
      className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden"
      id="features"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      <div className="absolute top-10 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Everything You Need for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Financial Success
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Powerful tools designed to give you complete control and insight
            into your financial health
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl cursor-pointer hover:-translate-y-2 shadow-xl p-8 flex flex-col items-start text-left hover:shadow-2xl transition-all duration-300 border border-gray-700/50">
            <div className="p-3 bg-blue-900/30 rounded-xl mb-6">
              <img
                src={transactionSVG}
                alt="Transactions"
                className="w-12 h-12"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Effortless Transaction Tracking
            </h3>
            <p className="text-gray-300 text-base">
              Instantly log and categorize income and expenses. Get a clear
              picture of where your money comes from and where it goes.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl cursor-pointer hover:-translate-y-2 shadow-xl p-8 flex flex-col items-start text-left hover:shadow-2xl transition-all duration-300 border border-gray-700/50">
            <div className="p-3 bg-purple-900/30 rounded-xl mb-6">
              <img
                src={budgetSVG}
                alt="Budget Management"
                className="w-12 h-12"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Intelligent Budgeting
            </h3>
            <p className="text-gray-300 text-base">
              Create customized budgets that adapt to your spending patterns.
              Receive smart alerts before you exceed your limits.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl cursor-pointer hover:-translate-y-2 shadow-xl p-8 flex flex-col items-start text-left hover:shadow-2xl transition-all duration-300 border border-gray-700/50">
            <div className="p-3 bg-green-900/30 rounded-xl mb-6">
              <img src={reportSVG} alt="Reports" className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Visual Financial Reports
            </h3>
            <p className="text-gray-300 text-base">
              Beautiful charts and insightful summaries help you understand your
              financial trends at a glance.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl cursor-pointer hover:-translate-y-2 shadow-xl p-8 flex flex-col items-start text-left hover:shadow-2xl transition-all duration-300 border border-gray-700/50">
            <div className="p-3 bg-amber-900/30 rounded-xl mb-6">
              <img src={aiSVG} alt="AI Assistant" className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              AI-Powered Insights
            </h3>
            <p className="text-gray-300 text-base">
              Ask questions in plain English and get instant answers about your
              finances with our smart AI assistant.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl cursor-pointer hover:-translate-y-2 shadow-xl p-8 flex flex-col items-start text-left hover:shadow-2xl transition-all duration-300 border border-gray-700/50">
            <div className="p-3 bg-red-900/30 rounded-xl mb-6">
              <img
                src={rtSVG}
                alt="Recurring Transactions"
                className="w-12 h-12"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Automated Bill Tracking
            </h3>
            <p className="text-gray-300 text-base">
              Never miss a payment. Schedule recurring transactions and let the
              system handle your regular bills automatically.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl cursor-pointer hover:-translate-y-2 shadow-xl p-8 flex flex-col items-start text-left hover:shadow-2xl transition-all duration-300 border border-gray-700/50">
            <div className="p-3 bg-teal-900/30 rounded-xl mb-6">
              <img src={savingSVG} alt="Saving Goals" className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Goal-Oriented Savings
            </h3>
            <p className="text-gray-300 text-base">
              Set specific financial targets and watch your progress with
              motivating visual trackers and milestone celebrations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
