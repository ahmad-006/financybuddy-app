import React from "react";

const ReportHeader = ({
  currentUser = {},
  dateRange = {},
  reportType = "monthly",
}) => {
  const formatDateRange = () => {
    if (reportType === "custom" && dateRange.startDate && dateRange.endDate) {
      return `${new Date(dateRange.startDate).toLocaleDateString()} - ${new Date(dateRange.endDate).toLocaleDateString()}`;
    }
    return new Date().toLocaleDateString("default", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
        Financial Report
      </h1>
      <p className="text-gray-600 mb-1">For {currentUser.name || "User"}</p>
      <p className="text-gray-500 text-sm">
        {formatDateRange()} •{" "}
        {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
      </p>
    </div>
  );
};

export default ReportHeader;
