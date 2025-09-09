import { NavLink } from "react-router-dom";
import sectionImg from "../../assets/images/home/section3.svg";

export default function LastSection() {
  return (
    <section className="relative py-20 md:py-28 px-4 md:px-8 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950 z-0"></div>
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10 items-center flex flex-col-reverse md:flex-row gap-12 md:gap-16">
        {/* Text */}
        <div className="flex items-start flex-col flex-1">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ready to Transform Your{" "}
            <span className="text-blue-400">Financial Future</span>?
          </h2>
          <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-300">
            Join thousands of users who have already taken control of their
            finances. Our intuitive platform makes money management simple,
            empowering you to make smarter decisions and reach your goals
            faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center">
              <NavLink to={"/signup"} className="flex items-center">
                Get Started Free
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
              </NavLink>
            </button>

            <NavLink to={"/aichatbot"}>
              <button className="px-8 py-3.5 rounded-lg border border-gray-600 text-white font-medium hover:bg-gray-800/30 transition-all flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 00-6 6c0 1.887.454 3.665 1.257 5.234a.5.5 0 00.656.254l2.4-1.2a1 1 0 01.894 0l2.4 1.2a.5.5 0 00.656-.254A5.98 5.98 0 0016 10a6 6 0 00-6-6z" />
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                Get More Information
              </button>
            </NavLink>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-700/50 w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-blue-400">95%</div>
                <div className="text-gray-400 text-sm">
                  Users improve savings
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">4.8/5</div>
                <div className="text-gray-400 text-sm">
                  Customer satisfaction
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">24/7</div>
                <div className="text-gray-400 text-sm">Support available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center flex-1">
          <div className="relative">
            <img
              src={sectionImg}
              alt="Financial growth and success visualization"
              className="w-full max-w-md transform hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/10 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
