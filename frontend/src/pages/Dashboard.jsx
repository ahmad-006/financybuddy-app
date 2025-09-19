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

  const {
    data: transaction,
    error: transactionsError,
    isLoading: isLoadingTransactions,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const {
    data: monthlyBudgets,
    error: monthlyBudgetsError,
    isLoading: isLoadingMonthlyBudgets,
  } = useQuery({
    queryKey: ["monthlyBudgets"],
    queryFn: fetchMonthlyBudgets,
  });

  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoadingUser(true);
        const res = await fetchUser();
        setUser(res);
      } catch (err) {
        toast.error(err?.message || "Error fetching user details");
      } finally {
        setIsLoadingUser(false);
      }
    };
    getUser();
  }, []);

  const isLoading =
    isLoadingTransactions || isLoadingMonthlyBudgets || isLoadingUser;

  useEffect(() => {
    if (transactionsError) {
      toast.error(transactionsError?.message || "Error fetching transactions");
    }
    if (monthlyBudgetsError) {
      toast.error(monthlyBudgetsError?.message || "Error fetching budgets");
    }
  }, [transactionsError, monthlyBudgetsError]);

  const budgets = useMemo(
    () => monthlyBudgets?.monthlyBudgets || [],
    [monthlyBudgets]
  );

  const transactions = useMemo(
    () => transaction?.transactions || [],
    [transaction]
  );

  const fourMonthsAgo = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 3);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const chartTransactions = useMemo(() => {
    return transactions.filter((t) => new Date(t.date) >= fourMonthsAgo);
  }, [transactions, fourMonthsAgo]);

  const currency = "PKR";

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpending = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const remaining = totalIncome - totalSpending;

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 text-black p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

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
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Financial Dashboard
          </h1>
          {user && (
            <p className="text-gray-600 mt-2">Welcome back, {user.name}</p>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            <SummaryCards
              totalIncome={totalIncome}
              totalSpending={totalSpending}
              remaining={remaining}
              currency={currency}
            />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
                Income vs Spending
              </h2>
              <div className="w-full flex-grow">
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

          {/* Right Column */}
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
