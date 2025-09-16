// This page provides a financial overview of your income, spending, and budget progress.
// Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import SummaryCards from "../components/dashboard/overview/SummaryCards";
import RecentTransactions from "../components/dashboard/overview/RecentTransactions";
import Chart from "../components/dashboard/overview/Chart";
import BudgetProgress from "../components/dashboard/overview/BudgetProgress";
import CategoryBreakdown from "../components/dashboard/overview/CategoryBreakdown";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import {
  fetchMonthlyBudgets,
  fetchTransactions,
  fetchUser,
} from "@/utils/fetchData";

const Dashboard = () => {
  const [transformedBudgets, setTransformedBudgets] = useState([]);
  const [user, setUser] = useState("");

  // initial monthlyBudget fetch
  const { data: transaction, error: fetchError } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  if (fetchError)
    toast.error(fetchError?.message || "error fetching transactions");

  const { data: monthlyBudgets, error: budgetFetchError } = useQuery({
    queryKey: ["monthlyBudgets"],
    queryFn: fetchMonthlyBudgets,
  });

  if (budgetFetchError)
    toast.error(fetchError?.message || "error fetching budgets");

  //? storing in a variable
  //using usememo because of re renders
  const budgets = useMemo(
    () => monthlyBudgets?.monthlyBudgets || [],
    [monthlyBudgets]
  );

  const transactions = useMemo(
    () => transaction?.transactions || [],
    [transaction]
  );
  const currency = "PKR";

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpending = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const remaining = totalIncome - totalSpending;

  // Get recent transactions (last 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  //?effect
  useEffect(() => {
    if (budgets.length) {
      const result = budgets.map((budget) => {
        const spent = transactions
          .filter(
            (t) =>
              t.type.toLowerCase() === "expense" &&
              t.category.toLowerCase() === budget.category.toLowerCase()
          )
          .reduce((sum, t) => sum + t.amount, 0);

        return {
          title: budget.title,
          category: budget.category,
          limit: budget.limit,
          createdAt: budget.createdAt,
          spent,
        };
      });

      setTransformedBudgets(result);
    }
  }, [budgets, transactions]);

  //to get userName
  useEffect(() => {
    //to fetch user Details
    const fetchUserName = async () => {
      const res = await fetchUser();
      setUser(res);
      console.log(res);
    };

    fetchUserName();
  }, []);

  return (
    <div className="bg-gray-50 p-6">
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-md">
        <p className="font-bold">Your Financial Command Center</p>
        <p>
          This is your financial command center. Get a quick overview of your
          total income, expenses, and remaining balance. Track your recent
          transactions, visualize your spending habits with charts, and see how
          you're progressing against your budgets at a glance. Use this page to
          stay on top of your financial health.
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Financial Dashboard
          </h1>
          {user && (
            <p className="text-gray-600 mt-2">Welcome back, {user.name}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <SummaryCards
              totalIncome={totalIncome}
              totalSpending={totalSpending}
              remaining={remaining}
              currency={currency}
            />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Income vs Spending
              </h2>
              <Chart transactions={transactions} currency={currency} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Transactions
              </h2>
              <RecentTransactions
                transactions={recentTransactions}
                currency={currency}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Budget Progress
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Cumulative spending vs budget since you started
                </p>
              </div>
              <BudgetProgress
                budgets={transformedBudgets}
                transactions={transactions}
                currency={currency}
                currentUser={user}
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Spending by Category
              </h2>
              <CategoryBreakdown
                transactions={transactions}
                currency={currency}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
