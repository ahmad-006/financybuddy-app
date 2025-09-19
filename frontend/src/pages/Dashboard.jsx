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

  // Filter transactions for the last 4 months for the chart
  const fourMonthsAgo = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 3); // Current month + 3 previous months = 4 months
    date.setDate(1); // Start from the first day of that month
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const chartTransactions = useMemo(() => {
    return transactions.filter((t) => new Date(t.date) >= fourMonthsAgo);
  }, [transactions, fourMonthsAgo]);

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

  useEffect(() => {
    //to fetch user Details
    const fetchUserName = async () => {
      const res = await fetchUser();
      setUser(res);
    };

    fetchUserName();
  }, []);

  return (
    <div className="bg-gray-50 p-4 sm:p-6 ">
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 sm:p-4 mb-6 rounded-md">
        <p className="font-bold">Your Financial Command Center</p>
        <p className="text-sm">
          Get a quick overview of your income, expenses, and budget progress.
          Track transactions, visualize spending, and stay on top of your
          financial health.
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Financial Dashboard
          </h1>
          {user && (
            <p className="text-gray-600 mt-2">Welcome back, {user.name}</p>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column*/}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            <SummaryCards
              totalIncome={totalIncome}
              totalSpending={totalSpending}
              remaining={remaining}
              currency={currency}
            />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
                Income vs Spending
              </h2>
              <div className="w-full h-72 sm:h-96">
                <Chart transactions={chartTransactions} currency={currency} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Transactions
              </h2>
              <RecentTransactions
                transactions={recentTransactions}
                currency={currency}
              />
            </div>
          </div>

          {/* Right Column - Takes 1/3 width */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
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

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Spending by Category
              </h2>
              <div className="w-full flex-grow">
                <CategoryBreakdown
                  transactions={transactions}
                  currency={currency}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
