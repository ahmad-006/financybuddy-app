import React from "react";
import html2pdf from "html2pdf.js";
import { CSVLink } from "react-csv";

const ReportActions = ({
  dateRange,
  setDateRange,
  reportType,
  setReportType,
  transactions,
}) => {
  const calculateDateRange = (type) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (type === "weekly") {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return {
        startDate: weekStart.toISOString().split("T")[0],
        endDate: weekEnd.toISOString().split("T")[0],
      };
    } else if (type === "monthly") {
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return {
        startDate: monthStart.toISOString().split("T")[0],
        endDate: monthEnd.toISOString().split("T")[0],
      };
    } else if (type === "quarterly") {
      const quarter = Math.floor(today.getMonth() / 3);
      const quarterStart = new Date(today.getFullYear(), quarter * 3, 1);
      const quarterEnd = new Date(today.getFullYear(), quarter * 3 + 3, 0);
      return {
        startDate: quarterStart.toISOString().split("T")[0],
        endDate: quarterEnd.toISOString().split("T")[0],
      };
    } else if (type === "yearly") {
      const yearStart = new Date(today.getFullYear(), 0, 1);
      const yearEnd = new Date(today.getFullYear(), 11, 31);
      return {
        startDate: yearStart.toISOString().split("T")[0],
        endDate: yearEnd.toISOString().split("T")[0],
      };
    } else {
      return dateRange;
    }
  };

  const handleReportTypeChange = (newType) => {
    setReportType(newType);
    if (newType !== "custom") {
      const newDateRange = calculateDateRange(newType);
      setDateRange(newDateRange);
    }
  };

  const handleDownloadPDF = () => {
    const reportElement = document.getElementById("report-content");

    const options = {
      margin: 10,
      filename: `financial-report-${
        new Date().toISOString().split("T")[0]
      }.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(reportElement).set(options).save();
  };

  const csvHeaders = [
    { label: "Title", key: "title" },
    { label: "Date", key: "date" },
    { label: "Type", key: "type" },
    { label: "Category", key: "category" },
    { label: "Amount", key: "amount" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 print:hidden">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* date selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <select
              className="w-full sm:w-48 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={reportType}
              onChange={(e) => handleReportTypeChange(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          {reportType === "custom" && (
            <div className="flex gap-2">
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) =>
                  setDateRange((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
                }
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <span>📄</span>
            Download PDF
          </button>

          <CSVLink
            data={transactions}
            headers={csvHeaders}
            filename={`transactions-report-${new Date().toISOString().split("T")[0]}.csv`}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <span>🧾</span>
            Export to CSV
          </CSVLink>
        </div>
      </div>
    </div>
  );
};

export default ReportActions;
