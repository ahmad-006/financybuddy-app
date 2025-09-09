import React, { useState, useEffect, useRef } from "react";

import ReportHeader from "../components/report/ReportHeader";
import FinancialSummary from "../components/report/FinancialSummary";
import CategoryBreakdown from "../components/report/CategoryBreakdown";
import TransactionDetails from "../components/report/TransactionDetails";
import BudgetProgressReport from "../components/report/BudgetProgressReport";
import ReportActions from "../components/report/ReportActions";
import { mockTransactions, mockBudgets, mockProfiles } from "../data/data";
import "../styles/print.css";

const ReportPage = () => {
  const reportContentRef = useRef();
  const getCurrentMonthRange = () => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return {
      startDate: monthStart.toISOString().split("T")[0],
      endDate: monthEnd.toISOString().split("T")[0],
    };
  };

  const [dateRange, setDateRange] = useState(getCurrentMonthRange());
  const [reportType, setReportType] = useState("monthly");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const transactions = mockTransactions;
  const budgets = mockBudgets;
  const currentUser = mockProfiles[0];
  const currency = currentUser.currency;

  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const start = new Date(dateRange.startDate);
      const end = new Date(dateRange.endDate);
      end.setHours(23, 59, 59, 999);
      return transactionDate >= start && transactionDate <= end;
    });
    setFilteredTransactions(filtered);
  }, [dateRange, transactions]);

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpending = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalSpending;

  return (
    <div className="bg-gray-50 px-4 py-6 sm:px-6 lg:px-8 text-black print-container">
      <div className="max-w-6xl mx-auto">
        <ReportActions
          dateRange={dateRange}
          setDateRange={setDateRange}
          reportType={reportType}
          setReportType={setReportType}
          currency={currency}
          reportContentRef={reportContentRef}
          transactions={filteredTransactions}
        />

        <div
          ref={reportContentRef}
          id="report-content"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 print:shadow-none print:border-0"
        >
          <ReportHeader
            currentUser={currentUser}
            dateRange={dateRange}
            reportType={reportType}
          />

          <FinancialSummary
            totalIncome={totalIncome}
            totalSpending={totalSpending}
            netBalance={netBalance}
            currency={currency}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="space-y-8">
              <CategoryBreakdown
                transactions={filteredTransactions}
                currency={currency}
              />

              <BudgetProgressReport
                budgets={budgets}
                transactions={filteredTransactions}
                currency={currency}
              />
            </div>

            <div className="space-y-8">
              <TransactionDetails
                transactions={filteredTransactions}
                currency={currency}
              />
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200 print:mt-8">
            <p className="text-sm text-gray-500 text-center">
              Generated on {new Date().toLocaleDateString()} •{" "}
              {currentUser?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
