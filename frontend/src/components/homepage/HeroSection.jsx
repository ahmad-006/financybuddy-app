// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import heroSVG from "../../assets/images/home/hero.svg";

function HeroSection({ navigate }) {
  return (
    <section className="min-h-screen flex items-center justify-center py-5 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 order-1 lg:order-2"
          >
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 max-w-sm mx-auto">
              <img
                src={heroSVG}
                alt="Financial Dashboard"
                className="w-full h-auto"
              />
            </div>

            <div className="relative -mt-5 max-w-sm mx-auto">
              <motion.div
                className="absolute -top-2 -right-2 bg-white rounded-lg p-3 shadow-lg border border-gray-100"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-green-600 font-bold text-sm">+32%</div>
                <div className="text-gray-500 text-xs">Savings</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2 bg-white rounded-lg p-3 shadow-lg border border-gray-100"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="text-blue-600 font-bold text-sm">95%</div>
                <div className="text-gray-500 text-xs">Success</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 order-2 lg:order-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="text-blue-700 text-sm font-medium">
                FINANCIAL FREEDOM AWAITS
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight">
              Master Your
              <br />
              <span className="text-blue-600">Financial Future</span>
            </h1>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Transform how you manage money with elegant design and powerful
              insights. Achieve your goals with precision and clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center font-medium text-sm"
              >
                Start Free Trial
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-all duration-300 text-sm">
                View Demo
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-3 pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white shadow-lg"
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                <span className="font-semibold text-gray-900">5,000+</span>{" "}
                professionals trust us
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
