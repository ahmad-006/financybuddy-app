import heroSVG from "../../assets/images/home/hero.svg";

function HeroSection({ navigate }) {
  return (
    <section className="relative flex md:flex-row items-center md:justify-between py-12 md:py-24 px-4 md:px-10 flex-col-reverse text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-indigo-900/30 z-0"></div>

      <div className="flex flex-col items-start text-left mt-10 md:mt-0 md:px-6 max-w-2xl relative z-10">
        <div className="mb-4">
          <span className="bg-blue-800/40 text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
            Your Financial Freedom Starts Here
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Master Your Money,{" "}
          <span className="text-blue-400">Simplify Your Life</span>
        </h1>

        <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
          Take full control of your finances with our intelligent expense
          management platform. Track spending, optimize budgets, and achieve
          your financial goals faster with AI-powered insights and beautiful
          visualizations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center"
            onClick={() => navigate("/signup")}
          >
            Start Free Trial
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <a href="#features" className="sm:w-auto w-full">
            <button className="px-8 py-3.5 rounded-lg border-2 border-indigo-600 text-white font-medium hover:bg-indigo-700/20 transition-all w-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              Explore Features
            </button>
          </a>
        </div>

        <div className="mt-10 flex items-center text-gray-300">
          <div className="flex -space-x-3 mr-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-gray-900"></div>
            <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-gray-900"></div>
            <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-gray-900"></div>
          </div>
          <p className="text-sm">
            <span className="font-semibold text-white">5,000+</span> users
            tracking their finances
          </p>
        </div>
      </div>

      <div className="relative z-10 mb-10 md:mb-0">
        <div className="relative">
          <img
            src={heroSVG}
            alt="Financial dashboard showing charts and statistics"
            className="w-72 md:w-80 lg:w-96 transform hover:scale-105 transition-transform duration-700"
          />
          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-600/20 rounded-full animate-pulse delay-500"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
