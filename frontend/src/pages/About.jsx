import { NavLink } from "react-router-dom";
import aboutSVG from "../assets/images/home/aboutus.svg";

export default function About() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto flex md:flex-row flex-col-reverse gap-12 items-center">
        
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-400">
              About
              <span className="font-macondo"> FinancyBuddy</span>
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              At FinTrack, we're dedicated to revolutionizing how individuals
              manage their finances. Founded in 2020, our mission is to provide
              simple, intelligent, and actionable tools that make budgeting and
              expense tracking effortless for everyone.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              From visual dashboards to AI-driven insights, our goal is to
              empower you to make smarter financial decisions, save more, and
              reach your financial goals faster.
            </p>

            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition transform hover:-translate-y-1">
              <NavLink to={"/Login"}>Start Your Financial Journey</NavLink>
            </button>
          </div>

      
          <div className="md:w-1/2 flex justify-center">
            <img
              src={aboutSVG}
              alt="Financial tracking illustration"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Section 2*/}
      <section className="py-16 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
            Our Mission & Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <div className="text-blue-400 text-2xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Security First</h3>
              <p className="text-gray-300">
                Your financial data is encrypted and secure. We never share your
                information with third parties without your explicit consent.
              </p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <div className="text-blue-400 text-2xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Clarity & Insight</h3>
              <p className="text-gray-300">
                We transform complex financial data into clear, actionable
                insights that help you understand your spending patterns and
                opportunities.
              </p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <div className="text-blue-400 text-2xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3">
                Financial Empowerment
              </h3>
              <p className="text-gray-300">
                We believe everyone deserves financial freedom. Our tools are
                designed to be accessible to people at all financial literacy
                levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*  Section 3*/}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
            Meet Our Team
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Ahmad Aamir"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Ahmad Aamir</h3>
              <p className="text-blue-400">Founder & CEO</p>
              <p className="text-gray-400 mt-2">
                Former financial analyst with 10+ years experience
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="Anna Smith"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Anna Smith</h3>
              <p className="text-blue-400">Lead Developer</p>
              <p className="text-gray-400 mt-2">
                Specialized in fintech applications and security
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="Mike Johnson"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Mike Johnson</h3>
              <p className="text-blue-400">Product Designer</p>
              <p className="text-gray-400 mt-2">
                Focused on creating intuitive user experiences
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://randomuser.me/api/portraits/women/29.jpg"
                alt="Sarah Rodriguez"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Sarah Rodriguez</h3>
              <p className="text-blue-400">Financial Advisor</p>
              <p className="text-gray-400 mt-2">
                Certified financial planner and budgeting expert
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*  Section 4 */}
      <section className="py-16 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
            Our Impact
          </h2>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">50K+</div>
              <p className="text-gray-300">Active Users</p>
            </div>

            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">
                $380M+
              </div>
              <p className="text-gray-300">Tracked Expenses</p>
            </div>

            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">97%</div>
              <p className="text-gray-300">User Satisfaction</p>
            </div>

            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">42%</div>
              <p className="text-gray-300">Average Savings Increase</p>
            </div>
          </div>
        </div>
      </section>

      {/*  Section 5*/}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-400">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of users who have already transformed their financial
            lives with FinTrack.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
              <NavLink to={"/Login"}>Get Started Today</NavLink>
            </button>

            <button className="px-8 py-3 bg-transparent border border-blue-400 text-blue-400 font-semibold rounded-lg shadow-md hover:bg-blue-400 hover:text-white transition">
              <NavLink to={"/price"}>View Pricing</NavLink>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
