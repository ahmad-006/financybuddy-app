// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import aboutSVG from "../assets/images/home/aboutus.svg";

export default function About() {
  const [userCount, setUserCount] = useState(0);
  const [expenseCount, setExpenseCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);
  const [savingsCount, setSavingsCount] = useState(0);

  useEffect(() => {
    const duration = 3500;
    const steps = 90;

    const userIncrement = 50000 / steps;
    let currentUser = 0;

    const expenseIncrement = 380 / steps;
    let currentExpense = 0;

    const satisfactionIncrement = 97 / steps;
    let currentSatisfaction = 0;

    const savingsIncrement = 42 / steps;
    let currentSavings = 0;

    const timer = setInterval(() => {
      currentUser += userIncrement;
      if (currentUser >= 50000) {
        setUserCount(50000);
      } else {
        setUserCount(Math.floor(currentUser));
      }

      currentExpense += expenseIncrement;
      if (currentExpense >= 380) {
        setExpenseCount(380);
      } else {
        setExpenseCount(Math.floor(currentExpense));
      }

      currentSatisfaction += satisfactionIncrement;
      if (currentSatisfaction >= 97) {
        setSatisfactionCount(97);
      } else {
        setSatisfactionCount(Math.floor(currentSatisfaction));
      }

      currentSavings += savingsIncrement;
      if (currentSavings >= 42) {
        setSavingsCount(42);
      } else {
        setSavingsCount(Math.floor(currentSavings));
      }

      if (
        currentUser >= 50000 &&
        currentExpense >= 380 &&
        currentSatisfaction >= 97 &&
        currentSavings >= 42
      ) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white text-gray-800">
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto flex md:flex-row flex-col-reverse gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="text-blue-700 text-sm font-medium">
                OUR STORY
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              About
              <span className="text-blue-600"> FinancyBuddy</span>
            </h2>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              At FinancyBuddy, we're dedicated to revolutionizing how
              individuals manage their finances. Our mission is to provide
              simple, intelligent, and actionable tools that make budgeting and
              expense tracking effortless for everyone.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              From visual dashboards to AI-driven insights, our goal is to
              empower you to make smarter financial decisions, save more, and
              reach your financial goals faster.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              <NavLink to={"/Login"}>Start Your Financial Journey</NavLink>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 flex justify-center"
          >
            <img
              src={aboutSVG}
              alt="Financial tracking illustration"
              className="w-full max-w-md"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 mb-6">
              <span className="text-gray-600 text-sm font-medium">
                OUR VALUES
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Mission & Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔒",
                title: "Security First",
                description:
                  "Your financial data is encrypted and secure. We never share your information with third parties without your explicit consent.",
              },
              {
                icon: "📊",
                title: "Clarity & Insight",
                description:
                  "We transform complex financial data into clear, actionable insights that help you understand your spending patterns and opportunities.",
              },
              {
                icon: "🌍",
                title: "Financial Empowerment",
                description:
                  "We believe everyone deserves financial freedom. Our tools are designed to be accessible to people at all financial literacy levels.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg"
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-6">
              <span className="text-gray-600 text-sm font-medium">
                OUR TEAM
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                image:
                  "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                name: "Ahmad Aamir",
                role: "Founder & CEO",
                description:
                  "Former financial analyst with 10+ years experience",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                name: "Anna Smith",
                role: "Lead Developer",
                description: "Specialized in fintech applications and security",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                name: "Sarah Rodriguez",
                role: "Financial Advisor",
                description: "Certified financial planner and budgeting expert",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                name: "Alicia Yous",
                role: "Accounts Advisor",
                description:
                  "Certified Accounts planner and budgeting expert by World Bank",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
                />
                <h3 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
                <p className="text-gray-600 mt-2 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 mb-6">
              <span className="text-gray-600 text-sm font-medium">
                OUR IMPACT
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Impact
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <motion.span
                  key={userCount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {userCount.toLocaleString()}+
                </motion.span>
              </div>
              <p className="text-gray-600">Active Users</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <motion.span
                  key={expenseCount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  ${expenseCount}M+
                </motion.span>
              </div>
              <p className="text-gray-600">Tracked Expenses</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <motion.span
                  key={satisfactionCount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {satisfactionCount}%
                </motion.span>
              </div>
              <p className="text-gray-600">User Satisfaction</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <motion.span
                  key={savingsCount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {savingsCount}%
                </motion.span>
              </div>
              <p className="text-gray-600">Average Savings Increase</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-white p-8 rounded-2xl border border-gray-200 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Join thousands of users who have already transformed their financial
            lives with FinancyBuddy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              <NavLink to={"/Login"}>Get Started Today</NavLink>
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
