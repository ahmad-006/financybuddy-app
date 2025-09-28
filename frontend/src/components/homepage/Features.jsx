// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import transactionSVG from "../../assets/images/home/transaction.svg";
import savingSVG from "../../assets/images/home/saving.svg";
import aiSVG from "../../assets/images/home/ai.svg";
import rtSVG from "../../assets/images/home/RT.svg";
import reportSVG from "../../assets/images/home/reports.svg";
import budgetSVG from "../../assets/images/home/budget.svg";

function Features() {
  const features = [
    {
      icon: transactionSVG,
      title: "Smart Tracking",
      description:
        "Automatically categorize and track every transaction with precision.",
      color: "bg-blue-500",
    },
    {
      icon: budgetSVG,
      title: "Intelligent Budgets",
      description:
        "Create budgets that adapt to your lifestyle and spending habits.",
      color: "bg-purple-500",
    },
    {
      icon: reportSVG,
      title: "Beautiful Reports",
      description:
        "Visual insights that make understanding your finances effortless.",
      color: "bg-green-500",
    },
    {
      icon: aiSVG,
      title: "AI Insights",
      description: "Get personalized recommendations powered by advanced AI.",
      color: "bg-amber-500",
    },
    {
      icon: rtSVG,
      title: "Auto Bill Pay",
      description: "Never miss a payment with automated bill tracking.",
      color: "bg-red-500",
    },
    {
      icon: savingSVG,
      title: "Goal Tracking",
      description:
        "Set and achieve financial goals with visual progress tracking.",
      color: "bg-teal-500",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50" id="features">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 mb-6">
            <span className="text-gray-600 text-sm font-medium">
              POWERFUL FEATURES
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Comprehensive tools designed for modern financial management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div
                className={`w-10 h-10 ${feature.color} rounded-lg flex items-center justify-center mb-3`}
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-5 h-5 filter brightness-0 invert"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium text-sm">
            Explore All Features
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
