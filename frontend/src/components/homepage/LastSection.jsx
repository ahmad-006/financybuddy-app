// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import sectionImg from "../../assets/images/home/section3.svg";

export default function LastSection() {
  return (
    <section className="py-16 px-4 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Image - On top for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 order-1 lg:order-2"
          >
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 max-w-sm mx-auto">
              <img
                src={sectionImg}
                alt="Financial Growth"
                className="w-full h-auto"
              />
            </div>

            {/* Floating Elements - Fixed positioning */}
            <div className="relative -mt-6 max-w-sm mx-auto">
              <motion.div
                className="absolute -top-3 -right-3 bg-white rounded-lg p-2 shadow-lg border border-gray-100"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-green-600 font-bold text-xs">+47%</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-3 -left-3 bg-white rounded-lg p-2 shadow-lg border border-gray-100"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-600 font-bold text-xs">↑32%</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content - Below image for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 order-2 lg:order-1 text-center lg:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Ready to
              <br />
              <span className="text-blue-600">Transform Your</span>
              <br />
              Finances?
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Join thousands of professionals who have already elevated their
              financial management. Start your journey to financial clarity
              today.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center font-medium text-sm"
              >
                <NavLink to={"/signup"} className="flex items-center">
                  Get Started Free
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
                </NavLink>
              </motion.button>

              <NavLink to={"/aichatbot"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-all duration-300 text-sm"
                >
                  Learn More
                </motion.button>
              </NavLink>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              {[
                { value: "95%", label: "Save More" },
                { value: "4.9/5", label: "Rated" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
